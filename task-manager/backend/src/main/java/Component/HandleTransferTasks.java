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

// перенос задачи во временную корзину
public class HandleTransferTasks  implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleTransferTask(exchange);
        }
    }

    public void handleTransferTask(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String id_task = (String) bodyJson.get("id_task");
            String token = (String) bodyJson.get("token");

            DBTokenUser dbToken = new DBTokenUser();
            String id_userMain = dbToken.selectTokenUserId(token);

            // выбираю задачу из таблицы tasks выбираю поле с employee
            DBTasks dbTasks = new DBTasks();
            Tasks task = dbTasks.selectTask(id_task, id_userMain, "id_task", "id_user");
            System.out.println("task = " + task);
            ArrayList<String> employee = task.getEmployee();
            System.out.println("employee = " + employee);


            // теперь нужно пройтись по логинам участников, взять перенести id_task из activeTask в deleteTask, и удалить в activeTask
            for (String login: employee){
                DBUsers dbUser = new DBUsers();
                Users user = dbUser.selectDataUsers(login, "login");
                String id_user = user.getId();
                ArrayList<String> activeTask = user.getActiveTask();
                ArrayList<String> deleteTask = user.getDeleteTask();

                System.out.println("activeTask = " + activeTask +"; id_task =" + id_task);
                if (activeTask.contains(id_task)) {
                    System.out.println("11212");
                    activeTask.remove(id_task);
                    deleteTask.add(id_task);
                    Boolean resultActiveTask = dbUser.updateDataUsers(id_user, "activeTask", activeTask);
                    Boolean resultDeleteTask = dbUser.updateDataUsers(id_user, "deleteTask", deleteTask);
                    System.out.println("activeTask = " + activeTask + "; deleteTask = " + deleteTask);
                    if (!resultDeleteTask || !resultActiveTask) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка переноса в корзину"), 200);

                    }
                }
                System.out.println("user = "+user);
            }

            // добавляю у самого пользователя задачу в поле deleteTask
            DBUsers dbUser = new DBUsers();
            Users user = dbUser.selectDataUsers(id_userMain, "id");

            ArrayList<String> deleteTask = user.getDeleteTask();
            deleteTask.add(id_task);
            Boolean resultUpdate = dbUser.updateDataUsers(id_userMain, "deleteTask", deleteTask);

            if (!resultUpdate) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка переноса в корзину ^("), 200);

            }


            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Задача перенесена в корзину"), 200);

        } catch (IOException error) {
            System.out.println("Error to read a transfer task " + error.getMessage());
        }catch (ParseException error) {
            System.out.println("Error to read a transfer parse " + error.getMessage());
        }
    }
}
