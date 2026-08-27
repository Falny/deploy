package Component;

import PersonTasks.Users;
import SendResponse.SendResponse;
import actionDB.DBTokenUser;
import actionDB.DBUsers;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;

public class HandleGetFriend implements HttpHandler {
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
            handleGetFriend(exchange);
        }

    }

    public void handleGetFriend(HttpExchange exchange) {
        try {
            Headers headers = exchange.getRequestHeaders();
            String token = headers.getFirst("Authorization");
            DBTokenUser dbTokenUser = new DBTokenUser();
            String id = dbTokenUser.selectTokenUserId(token);

            DBUsers dbUsers = new DBUsers();
            Users user = dbUsers.selectDataUsers(id, "id");

            ArrayList<String> friends = user.getFriends();
            JSONArray jsonArray = new JSONArray();

            if (friends.size() > 0) {

                for (int i = 0; i < friends.size(); i++) {
                    DBUsers DBUserForFriends = new DBUsers();
                    JSONObject jsonObj = new JSONObject();
                    Users usersFriend = DBUserForFriends.selectDataUsers(friends.get(i), "id");

                    StringBuilder strImages = new StringBuilder();
                    if (usersFriend.getAvatars() != null && usersFriend.getAvatars().length() != 0) {
                        String[] images = usersFriend.getAvatars().split("\\|");

                        for (String img : images) {
                            Path imgPath = Paths.get(img);
                            if (Files.exists(imgPath)) {
                                byte[] byteImg = Files.readAllBytes(imgPath);
                                String strBase64 = Base64.getEncoder().encodeToString(byteImg);
                                strImages.append(strBase64);
                            }
                        }
                    }
                    jsonObj.put("avatars", strImages.toString());
                    jsonObj.put("login", usersFriend.getLogin());

                    jsonArray.add(jsonObj);
                }
            }

            JSONObject json = new JSONObject();
            json.put("success", true);
            json.put("friend", jsonArray);

            String data = json.toJSONString();

            new SendResponse().sendResponse(exchange, data, 200);

        } catch (IOException error) {
            System.out.println("Error get friend " + error.getMessage());
        }
    }
}
