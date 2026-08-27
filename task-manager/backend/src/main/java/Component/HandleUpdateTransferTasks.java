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
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class HandleUpdateTransferTasks implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleUpdateTransferTasks(exchange);
        }
    }

    public void handleUpdateTransferTasks(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token");
            String id_task = (String) bodyJson.get("id_task");

            DBTokenUser dbTokenUser = new DBTokenUser();
            String id_user = dbTokenUser.selectTokenUserId(token);

            DBUsers dbUser = new DBUsers();
            Users user = dbUser.selectDataUsers(id_user, "id");
            String login = user.getLogin();

            DBTasks dbTask = new DBTasks();
            Tasks task = dbTask.selectTask(id_task, id_user, "id_task", "id_user");

            ArrayList<String> adminOfTask = task.getEmployee();

            // удаляю логин создателя задачи из админов, потому что в поле activeTask хранятся только idшники тех задачи, которые назначали другие люди
            if (adminOfTask.contains(login)){
                adminOfTask.remove(login);
            }

            for (String login_: adminOfTask) {
                DBUsers dbUsers = new DBUsers();
                Users userEmployee = dbUsers.selectDataUsers(login_, "login");
                String id_userEmployee = userEmployee.getId();
                ArrayList<String> deleteTask = userEmployee.getDeleteTask();
                ArrayList<String> activeTask = userEmployee.getActiveTask();

                if (deleteTask.contains(id_task)){
                    deleteTask.remove(id_task);
                    activeTask.add(id_task);

                    Boolean resultDelete = dbUsers.updateDataUsers(id_userEmployee, "deleteTask", deleteTask);
                    Boolean resultActive = dbUsers.updateDataUsers(id_userEmployee, "activeTask", activeTask);

                    if (!resultDelete || !resultActive) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка восстановления задачи :("), 200);

                    }
                }
            }

            ArrayList<String> deleteTaskMainUser = user.getDeleteTask();
            if (deleteTaskMainUser.contains(id_task)){
                deleteTaskMainUser.remove(id_task);
                Boolean resultUpdateMainUserDeleteTask = dbUser.updateDataUsers(id_user, "deleteTask", deleteTaskMainUser);
                if (!resultUpdateMainUserDeleteTask) {
                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка восстановления задачи ^("), 200);

                }
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Задача успешно восстановлена"), 200);






        } catch (IOException e) {
            System.out.println("Error read to update save task " + e.getMessage());
        }catch (ParseException e) {
            System.out.println("Error parse to update save task " + e.getMessage());
        }
}}
