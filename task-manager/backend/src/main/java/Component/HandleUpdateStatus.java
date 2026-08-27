package Component;

import PersonTasks.Status;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBStatus;
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

public class HandleUpdateStatus implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();


        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }
        if ("POST".equals(method)) {
            handleUpdateStatus(exchange);
        }

    }

    public void handleUpdateStatus(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String status = (String) bodyJson.get("status");
            String token = (String) bodyJson.get("token");
            String color = (String) bodyJson.get("color");

            if (status.length() == 0 || color.length() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Вы ввели неполные данные"), 200);
                return;
            }

            DBTokenUser dbToken = new DBTokenUser();
            String id_user = dbToken.selectTokenUserId(token);

            DBStatus dbStatus = new DBStatus();
            Status statusConstructor = dbStatus.selectStatus(id_user);

            StringBuilder strBuild = new StringBuilder(statusConstructor.getStatusOfOnlyStatus());
            strBuild.append("," + status+":"+color);

            boolean success = dbStatus.updateStatus(id_user, strBuild.toString());

            if (!success) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка создания статуса"), 200);
                return;
            }
            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Статус успешно добавлен"), 200);


        } catch (IOException error) {
            System.out.println("Error to read status " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to read status " + error.getMessage());
        }
    }
}
