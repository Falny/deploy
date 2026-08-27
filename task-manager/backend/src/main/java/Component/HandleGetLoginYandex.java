package Component;

import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBStatus;
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
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.sql.SQLOutput;

public class HandleGetLoginYandex implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }
        if ("POST".equals(method)) {
            handleGetLoginYandex(exchange);
        }
    }

    public void handleGetLoginYandex(HttpExchange exchange) {
        try {
            InputStream io = exchange.getRequestBody();
            String code = new String(io.readAllBytes(), StandardCharsets.UTF_8);
             String uri = "https://https://portfollio-gab.ru/task-manager/tatipati";

            HttpClient httpClient = HttpClient.newHttpClient();

             String requestBody = "grant_type=authorization_code"
                    + "&client_secret=" + URLEncoder.encode(System.getenv("CLIENT_SECRET"), StandardCharsets.UTF_8)
                    + "&client_id=" + URLEncoder.encode(System.getenv("CLIENT_ID"), StandardCharsets.UTF_8)
                    + "&code=" + URLEncoder.encode(code, StandardCharsets.UTF_8)+ "&redirect_uri=" + URLEncoder.encode(uri, StandardCharsets.UTF_8);

            HttpRequest request = HttpRequest.newBuilder().uri(URI.create("https://oauth.yandex.ru/token")).header("Content-Type", "x-www-form-urlencoded").POST(HttpRequest.BodyPublishers.ofString(requestBody)).build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            JSONParser parser = new JSONParser();
            JSONObject bodyResponse = (JSONObject) parser.parse(response.body());
            System.out.println("bodyResponse " + bodyResponse);
            String access_token = (String) bodyResponse.get("access_token");
            String refresh_token = (String) bodyResponse.get("refresh_token"); // было бы славно сделать обновление токена


            HttpRequest requestData = HttpRequest.newBuilder().uri(URI.create("https://login.yandex.ru/info")).header("Authorization", "Bearer "+access_token).GET().build();

            HttpResponse<String> getDataUser = httpClient.send(requestData, HttpResponse.BodyHandlers.ofString());

            JSONObject dataJSON = (JSONObject) parser.parse(getDataUser.body());
            String login = (String) dataJSON.get("login");
            String id = (String) dataJSON.get("id");

            // добавляю данные в user_token
            DBTokenUser dbToken = new DBTokenUser();

            Boolean isExists = dbToken.selectIdUserToken(id);
            System.out.println("isExists + " + isExists);

            // проверяю есть ли уже такой пользователь
            if (isExists) {
                JSONObject json = new JSONObject();
                json.put("success", true);
                json.put("token", access_token);

                String data = json.toJSONString();

                new SendResponse().sendResponse(exchange, data, 200);
                return;
            }

            dbToken.insertTokenUser(id, access_token);

            //добавляю пользователя
            DBUsers db = new DBUsers();
            System.out.println("LOGIN & ID " + login + " " + id);
            Boolean result  = db.insertDataUserY(login, id);

            // инициализирую бд со статусами
            DBStatus dbStatus = new DBStatus();
            dbStatus.insertStatus(id);

            if (!result) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Произошла ошибка входа"), 200);
                return;
            }

            JSONObject json = new JSONObject();
            json.put("success", true);
            json.put("token", access_token);

            String data = json.toJSONString();

            System.out.println(data);

            new SendResponse().sendResponse(exchange, data, 200);

        } catch (IOException error) {
            System.out.println("Error to get code yandex " + error.getMessage());
        }catch (InterruptedException error) {
            System.out.println("Error to get response yandex " + error.getMessage());
        }catch (ParseException error) {
            System.out.println("Error to parse yandex " + error.getMessage());
        }
    }

}