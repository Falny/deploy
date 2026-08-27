package LoginSignin;

import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBUsers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class HandlerCheckLogin implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();


        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleCheckLogin(exchange);
        }

    }

    public void handleCheckLogin(HttpExchange exchange) {
        try {

            InputStream io = exchange.getRequestBody();
            String login = new String(io.readAllBytes(), StandardCharsets.UTF_8);

            DBUsers userDB = new DBUsers();
            Users user = userDB.selectDataUsers(login, "login");

            if (user.getLogin() != null) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Этот логин занят("), 200);

            }
            else {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Такой логин свободен!"), 200);


            }


        }catch (IOException error) {
            System.out.println("Error to get login tp registration " + error.getMessage());
        }
    }
}
