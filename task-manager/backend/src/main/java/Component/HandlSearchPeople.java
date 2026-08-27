package Component;

import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBTokenUser;
import actionDB.DBUsers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONArray;
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
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

public class HandlSearchPeople implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();


        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleSearchPeople(exchange);
        }

    }

    public void handleSearchPeople(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            JSONObject json = new JSONObject();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String name = (String) bodyJson.get("name");
            String token = (String) bodyJson.get("token");

            // сам пользователь, у которого есть список друзей и я буду отфильтровывать пользователей,
            // если они есть в этом списке
            DBTokenUser dbTokenUser = new DBTokenUser();
            String id = dbTokenUser.selectTokenUserId(token);
            DBUsers dbUsersSelf = new DBUsers();
            Users user = dbUsersSelf.selectDataUsers(id, "id");
            ArrayList<String> usersFriend = user.getFriends();


            // поиск любых пользователей, у которых в логине есть буквы из name
            DBUsers dbUsers = new DBUsers();
            ArrayList<Users> usersLogin = dbUsers.selectDataUsersSearch(name, "login");
            Set<Users> usersLoginHash = new HashSet<>(usersLogin);
            // если пользователей нет, то отправляю уведомление
            if (usersLoginHash.size() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Никого не найдено"), 200);
                return;
            }

            // пробегусь по каждому логину и проверю есть ли он в друзьях, если есть то не беру его в итоговый массив
            Set<Users> endedUserLogin = new HashSet<>();
            for (Users user_ : usersLoginHash) {
                if (!usersFriend.contains(user_.getId()) && !user_.getId().equals(id)) {
                    endedUserLogin.add(user_);
                }

            }

            System.out.println("endedUserLogin = " + endedUserLogin);

            JSONArray jsonArray = new JSONArray();

            // пробегаюсь по массиву логинов, и отбираю данные для отправки
            for (Users user_ : endedUserLogin) {

                JSONObject jsonObj = new JSONObject();

                if (user_.getAvatars() != null) {

                    String[] pathImages = user_.getAvatars().split("\\|");

                    StringBuilder strImages = new StringBuilder();
                    for (int i = 0; i < pathImages.length; i++) {
                        Path path = Paths.get(pathImages[i]);

                        if (Files.exists(path)) {
                            byte[] byteImg = Files.readAllBytes(path);
                            String strImgFromBytes = Base64.getEncoder().encodeToString(byteImg);
                            strImages.append(strImgFromBytes);
                        }
                    }
                    jsonObj.put("avatars", strImages.toString());
                }
                jsonObj.put("login", user_.getLogin());

                jsonArray.add(jsonObj);
            }

            JSONObject objJson = new JSONObject();
            objJson.put("success", true);
            objJson.put("search", jsonArray);


            String jsonStr = objJson.toJSONString();

            new SendResponse().sendResponse(exchange, jsonStr, 200);


        } catch (IOException error) {
            System.out.println("Error to get name to search people " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse name to search people " + error.getMessage());
        }

    }
}
