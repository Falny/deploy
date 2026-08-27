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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Objects;

public class HandleDashboard implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if (method.equals("OPTIONS")) {
            exchange.sendResponseHeaders(200, -1);
        }

        if (method.equals("GET")) {
            handleDashBoard(exchange);
        }
    }

    public void handleDashBoard(HttpExchange exchange) {
        try {
            Headers headers = exchange.getRequestHeaders();
            String token = headers.getFirst("Authorization");

            DBTokenUser dbToken = new DBTokenUser();
            String id = dbToken.selectTokenUserId(token);

            DBUsers userDB = new DBUsers();
            Users user = userDB.selectDataUsers(id, "id");

            JSONArray statistics = user.getStatisticsForMonth();
            int countCreateTask = user.getCountCreateTask();
            int countDeleteTask = user.getCountDeleteTask();
            int countExpiredTask = user.getCountExpiredTask();
            int countAddFriend = user.getCountAddFriend();
            int countCreateProject = user.getCountCreateProject();
            int countDeleteProject = user.getCountDeleteProject();
            int countTaskWereYouAdd = user.getCountTaskWereYouAdd();
            int countProjectWereYouAdd = user.getCountProjectWereYouAdd();

            if (statistics.size() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Пока статистики нет"), 200);
            }

            JSONObject json = new JSONObject();


            json.put("success", true);
            json.put("statistics", statistics);
            json.put("countCreateTask", countCreateTask);
            json.put("countDeleteTask", countDeleteTask);
            json.put("countExpiredTask", countExpiredTask);
            json.put("countAddFriend", countAddFriend);
            json.put("countCreateProject", countCreateProject);
            json.put("countDeleteProject", countDeleteProject);
            json.put("countTaskWereYouAdd", countTaskWereYouAdd);
            json.put("countProjectWereYouAdd", countProjectWereYouAdd);

            String data = json.toJSONString();

            new SendResponse().sendResponse(exchange, data, 200);


        } catch (Exception error) {
            System.out.println("Error get a dashboard " + error.getMessage());
        }
    }
}
