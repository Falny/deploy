package Component;

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

public class HandlUpdateTask implements HttpHandler {
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
            handleUpdateTask(exchange);
        }
    }

    public void handleUpdateTask(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJSON = (JSONObject) parser.parse(body);

            JSONObject task = (JSONObject) bodyJSON.get("task");
            String token = (String) bodyJSON.get("token");

            ArrayList<String> adminOfProject = (ArrayList<String>) task.get("peopleInProject");
            ArrayList<String> deletePeopleFromTask = (ArrayList<String>) task.get("deletePeopleFromTask");
            String id_task = (String) task.get("id_task");

            // нужно удалить логин создателя из админов
            DBTokenUser dbToken = new DBTokenUser();
            String id_userMain = dbToken.selectTokenUserId(token);
            DBUsers mainUserDB = new DBUsers();
            Users userMain = mainUserDB.selectDataUsers(id_userMain, "id");
            if (userMain.getLogin() != null && adminOfProject != null) {
                adminOfProject.remove(userMain.getLogin());
            }


            // нужно удалить активные задачи из поля activeTask бывшим участникам
            if (deletePeopleFromTask != null && deletePeopleFromTask.size() > 0) {
                DBUsers usersDB = new DBUsers();
                for (String login : deletePeopleFromTask) {
                    // нужно достать пользователя
                    Users user = usersDB.selectDataUsers(login, "login");
                    String id_user = user.getId();
                    ArrayList<String> activeTask = user.getActiveTask();
                    activeTask.remove(id_task);
                    Boolean resultOnUpdate = usersDB.updateDataUsers(id_user, "activeTask", activeTask);
                    if (!resultOnUpdate) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления задачи ^("), 200);
                        return;
                    }

                }
            }


            // добавить задачу в поле activeTask участникам из peopleInProject
            if (adminOfProject != null && adminOfProject.size() > 0) {
                DBUsers usersDB = new DBUsers();
                for (String login : adminOfProject) {
                    Users user = usersDB.selectDataUsers(login, "login");
                    String id_user = user.getId();
                    ArrayList<String> activeTask = user.getActiveTask();
                    if (!activeTask.contains(id_task)) {
                        activeTask.add(id_task);
                        Boolean resultOnUpdate = usersDB.updateDataUsers(id_user, "activeTask", activeTask);

                        if (!resultOnUpdate) {
                            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления задачи :("), 200);
                            return;
                        }
                    }
                }
            }


            DBTasks dbTask = new DBTasks();
            boolean resultToUpdate = dbTask.UpdateTask(task, id_userMain);
            if (!resultToUpdate) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления задачи"), 200);
                return;
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Задача обновлена успешно"), 200);

        } catch (IOException error) {
            System.out.println("Error read to update task " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error parse to update task " + error.getMessage());
        } catch (Exception error) {
            System.out.println("Error in common to update task " + error.getMessage());
        }
    }
}
