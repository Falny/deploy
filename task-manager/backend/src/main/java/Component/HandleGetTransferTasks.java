package Component;

import PersonTasks.Tasks;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBTasks;
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
import java.util.ArrayList;

public class HandleGetTransferTasks implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        if ("POST".equals(method)) {
            handleGetTransferTasks(exchange);
        }
    }

    public void handleGetTransferTasks(HttpExchange exchange) {
        try{
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token");
            String id_project = (String) bodyJson.get("id_project");


            DBTokenUser dbToken = new DBTokenUser();
            String id_user = dbToken.selectTokenUserId(token);

            DBUsers dbUser = new DBUsers();
            Users user = dbUser.selectDataUsers(id_user, "id");
            ArrayList<String> deleteTask = user.getDeleteTask(); // idшники удаленных задач

            if (deleteTask.size() == 0 || deleteTask == null) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Удаленных задач нет"), 200);
                return;
            }

            JSONArray jsonArray = new JSONArray();

            for (String id_task : deleteTask) {
                DBTasks dbTask = new DBTasks();
                Tasks task = dbTask.selectTask(id_task, id_project, "id_task", "id_project");

                if (task == null){
                    continue;
                }

                JSONObject jsonObj = new JSONObject();
                jsonObj.put("id_task", task.getId_task());
                jsonObj.put("id_project", task.getId_project());
                jsonObj.put("name", task.getName());
                jsonObj.put("description", task.getDescription());
                jsonObj.put("dateStart", task.getDateStart());
                jsonObj.put("dateEnd", task.getDateEnd());
                jsonObj.put("status", task.getStatus());
                jsonObj.put("peopleInProject", task.getEmployee());
                if (task.getId_user().equals(id_user)) {
                    jsonObj.put("isCreator", true);
                } else {
                    jsonObj.put("isCreator", false);
                }
                jsonArray.add(jsonObj);
            }


            JSONObject json = new JSONObject();
            json.put("success", true);
            json.put("task", jsonArray);

            String data = json.toJSONString();

            new SendResponse().sendResponse(exchange, data, 200);

        } catch(IOException error) {
            System.out.println("Error to read to get to transfer task");
        }catch(ParseException error) {
            System.out.println("Error to read to parse to transfer task");
        }
    }
}
