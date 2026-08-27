package Component;

import PersonTasks.Users;
import SendResponse.SendResponse;
import actionDB.DBTokenUser;
import actionDB.DBUsers;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;

public class HandleProfile implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("GET".equals(method)) {
            handleSendProfile(exchange);
        }
    }

    public void handleSendProfile(HttpExchange exchange) {
        try {
            Headers headers = exchange.getRequestHeaders();
            String token = headers.getFirst("Authorization");

            DBTokenUser dbToken = new DBTokenUser();
            String id = dbToken.selectTokenUserId(token);


            DBUsers usersDB = new DBUsers();
            Users users = usersDB.selectDataUsers(id, "id");
            JSONObject objJSON = new JSONObject();
            objJSON.put("login", users.getLogin());
            objJSON.put("name", users.getUsername());
            objJSON.put("isHowCreated", users.getIsHowCreated());

            // нахождение логинов друзей через idшники и отправка на фронт
            ArrayList<String> friendListOfLogin = new ArrayList<>();
            if (users.getFriends() != null) {
                for (String id_ : users.getFriends()) {
                    DBUsers dbUsers = new DBUsers();
                    Users user = dbUsers.selectDataUsers(id_, "id");
                    friendListOfLogin.add(user.getLogin());
                }
            }
            objJSON.put("friends", friendListOfLogin);


            // вытаскивание фоток из папок для аватарок
            if (users.getAvatars() != null && users.getAvatars().length() != 0) {
                String[] pathAvatars = users.getAvatars().split("\\|");

                StringBuilder strImg = new StringBuilder();
                for (int i = 0; i < pathAvatars.length; i++) {
                    Path path = Paths.get(pathAvatars[i]);

                    if (Files.exists(path)) {
                        byte[] file = Files.readAllBytes(path);
                        String strFromByte = Base64.getEncoder().encodeToString(file);
                        strImg.append(strFromByte + "|");
                    }
                }
                objJSON.put("avatars", strImg.toString());
            }

            String jsonString = objJSON.toJSONString();

            new SendResponse().sendResponse(exchange, jsonString, 200);


        } catch (IOException error) {
            System.out.println("Error to send profile " + error.getMessage());
            new SendResponse().sendResponse(exchange, "Ошибка получения данных, повторите попытку позже", 404);
        }
    }

}
