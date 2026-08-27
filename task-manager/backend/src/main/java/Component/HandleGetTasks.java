package Component;

import PersonTasks.Notification;
import PersonTasks.Tasks;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import Statistics.Statistics;
import actionDB.DBNotification;
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
import java.time.LocalDate;
import java.util.ArrayList;

public class HandleGetTasks implements HttpHandler {

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
            handleGetTasks(exchange);
        }
    }

    public void handleGetTasks(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token");
            String id_project = (String) bodyJson.get("id_project");


            DBTokenUser dbTokenUser = new DBTokenUser();
            String id_user = dbTokenUser.selectTokenUserId(token);

            // достаю активные задачи из поля activeTask из бд users
            DBUsers userDB = new DBUsers();
            Users user = userDB.selectDataUsers(id_user, "id");
            ArrayList<String> ListActiveTaskFromField = user.getActiveTask();
            ArrayList<String> deleteTaskUser = user.getDeleteTask();
            JSONArray jsonArray = new JSONArray();

            // логика обработки задач из activeTask
            if (ListActiveTaskFromField != null && ListActiveTaskFromField.size() > 0) {
                for (String id_taskOfActiveTask : ListActiveTaskFromField) {
                    DBTasks tasksDB = new DBTasks();
                    JSONObject jsonObj = new JSONObject();

                    Tasks task = tasksDB.selectTask(id_taskOfActiveTask, id_project, "id_task", "id_project");

                    if (task.id_task != null) {

                        // проверяю дату на просрочку, если она уже прошла, то перемещаю в ее в deleteTask, а в activeTask удаляю, также добавляю уведомление новое о том, что задача была перенесена в коризну
                        LocalDate date = LocalDate.now();
                        ArrayList<String> deleteTask = user.getDeleteTask();
                        String id_task = task.getId_task();

                        if (!date.isBefore(LocalDate.parse(task.getDateEnd())) && !deleteTask.contains(id_task)) {
                            ArrayList<String> activeTask = user.getActiveTask();


                            // удаляю из активных задач и переношу в удаленные и обновляю цикл на пропуск этого момента
                            if (activeTask.contains(id_task)) {
                                activeTask.remove(id_task);
                                deleteTask.add(id_task);

                                Boolean resultActiveTask = userDB.updateDataUsers(id_user, "activeTask", activeTask);
                                Boolean resultDeleteTask = userDB.updateDataUsers(id_user, "deleteTask", deleteTask);

                                if (!resultDeleteTask || !resultActiveTask) {
                                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка переноса в корзину"), 200);
                                    return;

                                }

                                DBNotification DBNote = new DBNotification();

                                Notification note = new Notification();
                                note.setText("просроченные задачи были добавлены в корзину");
                                note.setTime(date.toString());
                                note.setStatusNotification(false);
                                note.setStatusFriendNotification(false);
                                note.setFrom("От системы");

                                Boolean resultInsertNote = DBNote.insertNotification(note, user.getId());

                                if (!resultInsertNote) {
                                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка получения задач :("), 200);
                                    return;
                                }

                            }
                            continue;
                        }


                        jsonObj.put("id_task", task.getId_task());
                        jsonObj.put("id_project", task.getId_project());
                        jsonObj.put("name", task.getName());
                        jsonObj.put("description", task.getDescription());
                        jsonObj.put("dateStart", task.getDateStart());
                        jsonObj.put("dateEnd", task.getDateEnd());
                        jsonObj.put("status", task.getStatus());
                        jsonObj.put("peopleInProject", task.getEmployee());
                        jsonObj.put("isCreator", false); // поле для определения создателя задачи для последующего временного удаления

                        jsonArray.add(jsonObj);
                    }
                }
            }

            // логика обработки самого пользователя
            DBTasks dbTasks = new DBTasks();
            ArrayList<Tasks> tasks = dbTasks.selectTaskArray(id_user, id_project);

            // беру задачи из бд, те что создавал сам человек
            if (tasks.size() > 0) {
                for (Tasks task : tasks) {
                    JSONObject obj = new JSONObject();

                    LocalDate date = LocalDate.now();

                    ArrayList<String> deleteTask = user.getDeleteTask(); // получаю удаленные задачи пользователя
                    String id_task = task.getId_task();

                    // проверяю, что дата окончания равна или нет текущей дате, если не равно, то idшник задачи добавляю в удаленные задачи
                    if (!date.isBefore(LocalDate.parse(task.getDateEnd())) && !deleteTask.contains(id_task)) {
                        deleteTask.add(id_task); // добавляю туда idшник просроченной задачи

                        int statisticsCountExpiredTask = user.getCountExpiredTask() + 1;
                        Boolean resultUpdateCountExpiredTask = userDB.updateDataUsers(id_user, "countExpiredTask", statisticsCountExpiredTask);
                        if (!resultUpdateCountExpiredTask) {
                            System.out.println("Ошибка добавления просроченной задачи -> статистика");
                        }

                        new Statistics().statisctics(userDB, id_user, "countExpiredTask", user.getStatisticsForMonth(), 1);



                        Boolean resultDeleteTask = userDB.updateDataUsers(id_user, "deleteTask", deleteTask);

                        if (!resultDeleteTask) {
                            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка переноса в корзину"), 200);
                            return;
                        }

                        // так как перенесли задачу нужно оповестить пользователя, поэтому создаю уведомление от системы
                        DBNotification DBNote = new DBNotification();

                        Notification note = new Notification();
                        note.setText("просроченные задачи были добавлены в корзину");
                        note.setTime(date.toString());
                        note.setStatusNotification(false);
                        note.setStatusFriendNotification(false);
                        note.setFrom("От системы");


                        Boolean resultInsertNote = DBNote.insertNotification(note, user.getId());

                        if (!resultInsertNote) {
                            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка получения задач ;("), 200);
                            return;
                        }
                        continue;
                    }

                    // проверяю если idшник задачи есть в поле deleteTask то сбрасываю цикл и не добавляю в отправленные задачи
                    if (deleteTaskUser.contains(task.getId_task())) {
                        continue;
                    }

                    obj.put("id_task", task.getId_task());
                    obj.put("id_project", task.getId_project());
                    obj.put("name", task.getName());
                    obj.put("description", task.getDescription());
                    obj.put("dateStart", task.getDateStart());
                    obj.put("dateEnd", task.getDateEnd());
                    obj.put("status", task.getStatus());
                    obj.put("peopleInProject", task.getEmployee());
                    obj.put("isCreator", true); // поле для определения создателя задачи для последующего временного удаления


                    jsonArray.add(obj);
                }
            }

            if (tasks.size() == 0 && ListActiveTaskFromField.size() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Задач пока нет"), 200);
                return;
            }


            JSONObject response = new JSONObject();
            response.put("success", true);
            response.put("tasks", jsonArray);

            String data = response.toJSONString();
            new SendResponse().sendResponse(exchange, data, 200);


        } catch (IOException error) {
            System.out.println("Error to send tasks " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to send tasks " + error.getMessage());
        }
    }
}
