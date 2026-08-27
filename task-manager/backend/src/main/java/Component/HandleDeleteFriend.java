package Component;

import PersonTasks.Status;
import PersonTasks.Users;
import actionDB.DBStatus;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
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
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.StringJoiner;

public class HandleDeleteFriend implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();


        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }
        if ("POST".equals(method)) {
            handleDeleteFriend(exchange);
        }

    }

    public void handleDeleteFriend(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String login = (String) bodyJson.get("login");
            String token = (String) bodyJson.get("token");

            DBTokenUser dbToken = new DBTokenUser();
            String id_user = dbToken.selectTokenUserId(token);

            // удалаяю со стороны того кого хотят удалить
            DBUsers userDB = new DBUsers();

            Users user = userDB.selectDataUsers(login, "login");
            ArrayList<String> friendUser = user.getFriends();
            if (friendUser.contains(id_user)) {
                friendUser.remove(id_user);
                Boolean resultDelete = userDB.updateDataUsers(user.getId(), "friends", friendUser);

                if (!resultDelete) {
                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Произошла ошибка удаления"), 200);
                    return;
                }
            }

            // удалаяю со стороны того кто хочет удалить
            DBUsers dbUser = new DBUsers();

            Users userMain = dbUser.selectDataUsers(id_user, "id");
            ArrayList<String> friendUserMain = userMain.getFriends();
            if (friendUserMain.contains(user.getId())) {
                friendUserMain.remove(user.getId());
                Boolean resultDelete = userDB.updateDataUsers(id_user, "friends", friendUserMain);

                if (!resultDelete) {
                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Произошла ошибка удаления:("), 200);
                    return;
                }
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Успешно"), 200);


        } catch (IOException error) {
            System.out.println("Error to read friend delete " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to read friend delete " + error.getMessage());
        }
    }
}

