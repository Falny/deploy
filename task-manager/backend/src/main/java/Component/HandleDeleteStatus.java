package Component;

import PersonTasks.Status;
import actionDB.DBStatus;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
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
import java.util.Arrays;
import java.util.StringJoiner;

public class HandleDeleteStatus implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();


        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }
        if ("POST".equals(method)) {
            handleDeleteStatus(exchange);
        }

    }

    public void handleDeleteStatus(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String status = (String) bodyJson.get("status");
            String token = (String) bodyJson.get("token");

            DBTokenUser dbToken = new DBTokenUser();
            String id_user = dbToken.selectTokenUserId(token);

            DBStatus dbStatus = new DBStatus();
            Status statusConstructor = dbStatus.selectStatus(id_user);

            ArrayList<String> arrOfStatus = new ArrayList<>(Arrays.asList(statusConstructor.getStatusOfOnlyStatus().split(",")));
            System.out.println("arrOfStatus " + arrOfStatus);
            StringJoiner joiner = new StringJoiner(",");

            for (String st : arrOfStatus) {
                if (!st.equals(status)) {
                    joiner.add(st);
                }
            }

            System.out.println("newStringBuilderForStatus " + joiner);


            boolean success = dbStatus.updateStatus(id_user, joiner.toString());

            if (!success) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления статуса"), 200);
                return;
            }
            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Статус успешно удален"), 200);


        } catch (IOException error) {
            System.out.println("Error to read status " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to read status " + error.getMessage());
        }
    }
}

