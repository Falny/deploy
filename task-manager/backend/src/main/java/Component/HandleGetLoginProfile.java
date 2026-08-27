package Component;

import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBTokenUser;
import actionDB.DBUsers;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;

import java.io.IOException;

public class HandleGetLoginProfile  implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        if ("GET".equals(method)) {
            handleGetLoginProfile(exchange);
        }
    }

    public void handleGetLoginProfile(HttpExchange exchange) {
        try {
            Headers header = exchange.getRequestHeaders();
            String token = header.getFirst("Authorization");

            DBTokenUser dbToken = new DBTokenUser();
            String id_user = dbToken.selectTokenUserId(token);

            DBUsers userDB = new DBUsers();
            Users user = userDB.selectDataUsers(id_user, "id");
            if (user == null) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Такого пользователя нет"), 200);
                return;
            }
            String login = user.getLogin();

            JSONObject jsonObj = new JSONObject();
            jsonObj.put("success", true);
            jsonObj.put("login", login);

            String data = jsonObj.toJSONString();
            new SendResponse().sendResponse(exchange, data, 200);



        } catch (Exception error) {
            System.out.println("Error get login profile " + error.getMessage());
        }
    }
}
