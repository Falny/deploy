package Component;

import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBNotification;
import actionDB.DBTokenUser;
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

public class HandleDeleteNotification implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }
        if ("POST".equals(method)) {
            handleDeleteNotification(exchange);
        }
    }

    public void handleDeleteNotification(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token"); // токен того кто отправил запрос в друзья
            String id_note = (String) bodyJson.get("id_note");

            // id пользователя, который отправил запрос уведомления
            DBTokenUser dbTokenUser = new DBTokenUser();
            String idUser = dbTokenUser.selectTokenUserId(token);

            DBNotification dbNotification = new DBNotification();
            Boolean resultDelete = dbNotification.deleteNotification(id_note, idUser);

            if (!resultDelete){
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления"), 200);
                return;
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Успешно удалено"), 200);


        } catch (IOException error) {
            System.out.println("Error to create notification " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse to create notification " + error.getMessage());
        }
    }
}
