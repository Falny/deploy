package Component;

import PersonTasks.Notification;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBNotification;
import actionDB.DBTokenUser;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class HandleGetNotification implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }
        if ("GET".equals(method)) {
            handleGetNotification(exchange);
        }
    }

    public void handleGetNotification(HttpExchange exchange) {
        try {
            Headers headers = exchange.getRequestHeaders();
            String token = headers.getFirst("Authorization");

            DBTokenUser dbTokenUser = new DBTokenUser();
            String id = dbTokenUser.selectTokenUserId(token);

            DBNotification dbNotification = new DBNotification();
            ArrayList<Notification> notifications = dbNotification.selectNotification(id);

            if (notifications.size() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Уведомлений нет"), 200);
                return;
            }

            JSONArray jsonArray = new JSONArray();

            for (Notification note: notifications) {
                JSONObject objJson = new JSONObject();
                objJson.put("id_notification", note.getId_notification());
                objJson.put("text", note.getText());
                objJson.put("time", note.getTime());
                objJson.put("status", note.getStatusNotification());
                objJson.put("statusFriend", note.getStatusFriendNotification());
                objJson.put("fromUser", note.getFrom());
                jsonArray.add(objJson);
            }

            JSONObject json = new JSONObject();
            json.put("success", true);
            json.put("notification", jsonArray);


            String data = json.toJSONString();

            new SendResponse().sendResponse(exchange, data, 200);
            
        } catch (Exception error) {
            System.out.println("Error to get notification " + error.getMessage());
        }
    }

}
