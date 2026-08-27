package Component;

import PersonTasks.Tasks;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import Statistics.Statistics;
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
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class HandleDeleteTransferTasks implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleDeleteTransferTasks(exchange);
        }
    }

    public void handleDeleteTransferTasks(HttpExchange exchange) {
        try{
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token");
            String id_task = (String) bodyJson.get("id_task");

            DBTokenUser dbToken = new DBTokenUser();
            String id_user = dbToken.selectTokenUserId(token);
            DBUsers userDB = new DBUsers();
            Users userMain = userDB.selectDataUsers(id_user, "id");

            int statisticsCountDeleteTaskMain = userMain.getCountDeleteTask() + 1;
            Boolean resultUpdateDeleteTaskMain = userDB.updateDataUsers(id_user, "countDeleteTask", statisticsCountDeleteTaskMain);
            if (!resultUpdateDeleteTaskMain) {
                System.out.println("Ошибка удаления задачи -> статистика");
            }
            new Statistics().statisctics(userDB, id_user, "countDeleteTask", userMain.getStatisticsForMonth(), 1);



            DBTasks dbTask = new DBTasks();
            Tasks task = dbTask.selectTask(id_task, id_user, "id_task", "id_user");

            // нужно пройтись по участникам проекта и удалить у них задачу из поля deleteTask
            ArrayList<String> adminofProject = task.getEmployee();

            for (String login: adminofProject){
                DBUsers dbUsers = new DBUsers();
                Users user = dbUsers.selectDataUsers(login, "login");
                String id = user.getId();

                int statisticsCountDeleteTask = userMain.getCountDeleteTask() + 1;
                Boolean resultUpdateDeleteTask = userDB.updateDataUsers(id_user, "countDeleteTask", statisticsCountDeleteTask);
                if (!resultUpdateDeleteTask) {
                    System.out.println("Ошибка удаления задачи у других -> статистика");
                }
                new Statistics().statisctics(dbUsers, id, "countDeleteTask", user.getStatisticsForMonth(), 1);



                ArrayList<String> deleteTask = user.getDeleteTask();
                if (deleteTask.contains(id_task)){
                    deleteTask.remove(id_task);
                    Boolean result = dbUsers.updateDataUsers(id, "deleteTask", deleteTask);
                    if (!result) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления задачи :("), 200);
                        return;
                    }
                }
            }

            // удаляю теперь саму задачу
            Boolean result = dbTask.deleteTask(id_task, id_user);

            if (!result) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления задачи"), 200);
                return;
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Задача удалена успешно"), 200);


        } catch (IOException error) {
            System.out.println("Error to delete task transfer");
        }catch (ParseException error) {
            System.out.println("Error to parse to delete task transfer");
        }
    }
}
