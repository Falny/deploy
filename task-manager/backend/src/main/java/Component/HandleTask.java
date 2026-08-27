package Component;

import PersonTasks.Notification;
import PersonTasks.Project;
import PersonTasks.Tasks;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import Statistics.Statistics;
import actionDB.*;
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
import java.util.List;
import java.util.Locale;

public class HandleTask implements HttpHandler {
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
            handleTasks(exchange);
        }
    }

    public void handleTasks(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);

            // парсю сам пришедший объект
            JSONObject jsonObjectParse = (JSONObject) parser.parse(body);

            // достаю токен и задачу (задача это объект)
            String tokenUserToGetId = (String) jsonObjectParse.get("token");
            JSONObject taskJSON = (JSONObject) jsonObjectParse.get("task");

            ArrayList<String> adminOfTask = (ArrayList<String>) taskJSON.get("peopleInProject"); // участники задачи им надо тоже добавить в поле activeTask idшник задачи новой
            String id_project = (String) taskJSON.get("id_project");  // нужно добавить уведомления участникам задачи

            // достаю имя проекта для отправки в уведомления
            DBProject dbProject = new DBProject();
            Project project = dbProject.selectProjectForIdProject(id_project);
            String nameProject = project.getName();
            LocalDate date = LocalDate.now(); // для времени в уведомлении

            DBTokenUser dbToken = new DBTokenUser(); // нужно получить id пользователя по токену
            String id_user = dbToken.selectTokenUserId(tokenUserToGetId);

            DBTasks dbTask = new DBTasks();
            String id_task = dbTask.insertTask(taskJSON, id_user); // при добавлении задачи возвращаю idник задачи

            // нужно добавить в участники(employee) самого пользователя
            DBUsers usersDB = new DBUsers();
            Users userMain = usersDB.selectDataUsers(id_user, "id");
            String login = userMain.getLogin();

            int statisticsCountCreateTask = userMain.getCountCreateTask() + 1;

            Boolean resultUpdateStatistics = usersDB.updateDataUsers(id_user, "countCreateTask", statisticsCountCreateTask);
            if (!resultUpdateStatistics) {
                System.out.println("Ошибка добавления задачи -> статистика");
            }

            // обновление статистики за год, если меняется месяц, то сохраняю все переменные в бд и обнуляю их
            JSONArray statistics = userMain.getStatisticsForMonth();
            new Statistics().statisctics(usersDB, id_user, "countCreateTask", statistics, 1);


            if (id_task == null || id_task.length() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Вы ввели неполные данные"), 200);
            }

            for (String login_: adminOfTask) {
                DBUsers DBusers = new DBUsers();
                Users user =  DBusers.selectDataUsers(login_, "login");
                String id_userOfAdmin = user.getId();

                int statisticsCountTaskWereYouAdd = user.getCountTaskWereYouAdd() + 1;
                Boolean resultUpdateTaskWereYouAdd  = usersDB.updateDataUsers(id_user, "countTaskWereYouAdd", statisticsCountTaskWereYouAdd);
                if (!resultUpdateTaskWereYouAdd) {
                    System.out.println("Ошибка добавления в задачу -> статистика");
                }
                new Statistics().statisctics(DBusers, id_userOfAdmin, "countTaskWereYouAdd", user.getStatisticsForMonth(), 1);


                ArrayList<String> fieldActiveTaskOfUser = user.getActiveTask();
                fieldActiveTaskOfUser.add(id_task);
                boolean result = DBusers.updateDataUsers(id_userOfAdmin, "activeTask", fieldActiveTaskOfUser);

                if (!result) {
                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка добавления задачи другу"), 200);
                }

                // создать уведомление для участников задачи
                DBNotification dbNote = new DBNotification();
                Notification note = new Notification();

                note.setText("назначил вам задачу в проекте "+ nameProject);
                note.setTime(date.toString());
                note.setStatusNotification(false);
                note.setStatusFriendNotification(false);
                note.setFrom(login);

                Boolean resultAddNote = dbNote.insertNotification(note, id_userOfAdmin);

                if (!resultAddNote) {
                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка создания задачи ("), 200);
                    return;
                }


            }

            // нужно добавить в участники(employee) самого пользователя
            Tasks task = dbTask.selectTask(id_task, id_user, "id_task", "id_user");
            ArrayList<String> employee = task.getEmployee();
            employee.add(login);
            Boolean result = dbTask.updateTask(id_task, "employee", employee);

            if (!result) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка добавления задачи ^("), 200);
            }


            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Задача успешно добавлена"), 200);

        } catch (IOException error) {
            System.out.println("Error to get task " + error.getMessage());
            new SendResponse().sendResponse(exchange, "Произошла ошибка добавления, попробуйте еще раз", 404);
        } catch (ParseException error) {
            System.out.println("Error to parse task " + error.getMessage());
        }catch (Exception error) {
            System.out.println("Error common to create task " + error.getMessage());
        }
    }
}
