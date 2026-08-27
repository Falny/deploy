package Component;

import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import Statistics.Statistics;
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

public class HandleUpdateNotification implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        if ("PUT".equals(method)) {
            handleUpdateNotification(exchange);
        }
    }

    public void handleUpdateNotification(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);

            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token");
            JSONObject note = (JSONObject) bodyJson.get("note"); // здесь будет логин пользователя от кого пришел запрос
            String purpose = (String) bodyJson.get("purpose");


            // токен и id самого пользователя, что принимает запрос
            DBTokenUser dbTokenUser = new DBTokenUser();
            String id = dbTokenUser.selectTokenUserId(token); // id которому отправили запрос (который принимает ответ принять в друзья или нет)

            DBNotification DBNote = new DBNotification();

            Boolean result = null;

            if (purpose.contains("friend")) {
                result = DBNote.updateNotification((String) note.get("id_notification"), id, true, "statusFriend");

                // если приняли в друзья, то обновляю список друзей
                if (result) {
                    // обязательно обновляю статус прочитанного, потому что нужно для защиты от спама и в целом круто не помню какие там еще причины, но в общем надо
                    DBNote.updateNotification((String) note.get("id_notification"), id, true, "status");
                    // нахожу пользователя, который отправил запрос на дружбу
                    String login_anotherUser = (String) note.get("fromUser");

                    DBUsers DBusers = new DBUsers();
                    Users user = DBusers.selectDataUsers(login_anotherUser, "login");
                    String id_anotherUser = user.getId(); // id другого пользователя


                    // выбираю поле друзей каждого из idшников, тот кто принимает ответ
                    DBUsers DBUsersTakes = new DBUsers();
                    Users userTake = DBUsersTakes.selectDataUsers(id_anotherUser, "id");
                    ArrayList<String> friendsTake = userTake.getFriends();
                    friendsTake.add(id);
                    boolean result1 = DBUsersTakes.updateDataUsers(id_anotherUser, "friends", friendsTake);

                    int statisticsCountAddFriendTake = userTake.getCountAddFriend() + 1;
                    Boolean resultUpdateCountAddFriendTake = DBUsersTakes.updateDataUsers(id, "countAddFriend", statisticsCountAddFriendTake);
                    if (!resultUpdateCountAddFriendTake) {
                        System.out.println("Ошибка добавления друга take -> статистика");
                    }
                    new Statistics().statisctics(DBUsersTakes, id_anotherUser, "countAddFriend", userTake.getStatisticsForMonth(), 1);


                    // выбираю поле друзей каждого из idшников, тот кто отправил запрос
                    DBUsers DBUsersSend = new DBUsers();
                    Users userSend = DBUsersSend.selectDataUsers(id, "id");
                    ArrayList<String> friendsGet = userSend.getFriends();
                    friendsGet.add(id_anotherUser);

                    boolean result2 = DBUsersSend.updateDataUsers(id, "friends", friendsGet);
                    int statisticsCountAddFriendSend = userSend.getCountAddFriend() + 1;
                    Boolean resultUpdateCountAddFriendSend = DBUsersSend.updateDataUsers(id, "countAddFriend", statisticsCountAddFriendSend);
                    if (!resultUpdateCountAddFriendSend) {
                        System.out.println("Ошибка добавления друга send -> статистика");
                    }
                    new Statistics().statisctics(DBUsersSend, id, "countAddFriend", userSend.getStatisticsForMonth(), 1);

                    System.out.println(result1 + " " + result2);

                    if (!result1 && !result2) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления друзей"), 200);
                        return;
                    }

                }
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Друг добавлен"), 200);
                return;
            }
            // логика обычных уведомлений, как назначение задачи, например
            if (purpose.contains("status")) {
                result = DBNote.updateNotification((String) note.get("id_notification"), id, true, "status");
            }


            // если ошибка обновления
            if (result != null && !result) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления"), 200);
                return;
            }


        } catch (IOException error) {
            System.out.println("Error to update of notification " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse in update of notification " + error.getMessage());
        } catch (Exception error) {
            System.out.println("Error common in update of notification " + error.getMessage());
        }
    }
}
