package Component;

import PersonTasks.Status;
import actionDB.DBStatus;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBTokenUser;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class HandleGetStatus  implements HttpHandler {
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
            handleGetStatus(exchange);
        }

    }

    public void handleGetStatus(HttpExchange exchange) {
        try {
            Headers headers = exchange.getRequestHeaders();
            String token = headers.getFirst("Authorization");

            DBTokenUser dbToken = new DBTokenUser();
            String id_user = dbToken.selectTokenUserId(token);

            DBStatus dbStatus = new DBStatus();
            Status statusOfUser = dbStatus.selectStatus(id_user);

            JSONObject objJson = new JSONObject();
            objJson.put("status", statusOfUser.getStatusOfOnlyStatus());
            objJson.put("success", true);

            String data = objJson.toJSONString();
            System.out.println("Status data " + data);

            new SendResponse().sendResponse(exchange, data,200);
        }catch (Exception error) {
            System.out.println("Error common to get status " + error.getMessage());
        }
    }
}
