package Component;

import PersonTasks.Notification;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBNotification;
import actionDB.DBTokenUser;
import actionDB.DBUsers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class HandleCreateNotification implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }
        if ("POST".equals(method)) {
            handleCreateNotification(exchange);
        }
    }

    public void handleCreateNotification(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token"); // токен того кто отправил запрос в друзья
            String loginAnotherUser = (String) bodyJson.get("loginAnotherUser"); // логин того кому отправили запрос
            String text = (String) bodyJson.get("text");
            String time = (String) bodyJson.get("time");

            DBUsers dbUsers = new DBUsers();

            // id пользователя, который отправил запрос уведомления
            DBTokenUser dbTokenUser = new DBTokenUser();
            String idUser = dbTokenUser.selectTokenUserId(token);
            Users users = dbUsers.selectDataUsers(idUser, "id");
            String login = users.getLogin();
            ArrayList<String> friends = users.getFriends();


            // id пользователя, которому пришло уведомление
            Users anotherUser = dbUsers.selectDataUsers(loginAnotherUser, "login");
            String idAnotherUser = anotherUser.getId();


            // проверить на существования запроса на дружбу
            DBNotification dbNote = new DBNotification();
            ArrayList<Notification> existNoteArray = dbNote.selectNotification(idAnotherUser); // выбираю все уведомления, которые есть у пользователя, который отправил запрос
            // циклом пробегаюсь по имеющимся уведомлений у отправившего уведомления человека, и проверяю, что id_user будет равен idAnotherUser(потому что это idшник пользователя, которому отправили запрос),
            // так же проверяю наличия совпадения текста в виде "друзья"
            for (Notification note : existNoteArray) {
                // проверку я делаю из необработанных уведомлений, а именно у тех, где status = false
                if (!note.getStatusNotification()) {

                    if ((note.getId_user().equals(idAnotherUser)) && (note.getFrom().equals(login)) && (note.getText().contains("друзья"))) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Запрос в друзья уже был отправлен"), 200);
                        return;
                    }
                }

                if (friends.contains(idAnotherUser)) {
                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Уже у вас в друзьях"), 200);
                    return;
                }
            }


            // создаю объект Notification и добавляю в него все элементы пришедших данных для добавления в бд вместе с idAnotherUser
            Notification notification = new Notification();
            notification.setText(text);
            notification.setTime(time);
            notification.setStatusNotification(false);
            notification.setStatusFriendNotification(false);
            notification.setFrom(login);


            DBNotification dbNotification = new DBNotification();
            boolean result = dbNotification.insertNotification(notification, idAnotherUser);

            if (!result) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка отправки запроса"), 200);
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Успешно отправлено!"), 200);


        } catch (IOException error) {
            System.out.println("Error to create notification " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse to create notification " + error.getMessage());
        }
    }
}
