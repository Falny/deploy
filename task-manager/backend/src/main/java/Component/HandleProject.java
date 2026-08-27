package Component;

import PersonTasks.Notification;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import Statistics.Statistics;
import actionDB.*;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;

public class HandleProject implements HttpHandler {
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
            handleProject(exchange);
        }
    }

    public void handleProject(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);

            // парсю сам пришедший объект
            JSONObject jsonObjectParse = (JSONObject) parser.parse(body);

            LocalDate date = LocalDate.now();

            // достаю токен и задачу (задача это объект)
            String tokenUserToGetId = (String) jsonObjectParse.get("token");
            JSONObject projectJSON = (JSONObject) jsonObjectParse.get("project");

            DBTokenUser dbToken = new DBTokenUser(); // нужно получить id пользователя по токену
            String id_user = dbToken.selectTokenUserId(tokenUserToGetId);
            DBUsers userDB = new DBUsers();
            Users userMain = userDB.selectDataUsers(id_user, "id");
            String loginMainUser = userMain.getLogin();

            int statisticsCountCreateProjectMain = userMain.getCountCreateProject() + 1;
            Boolean resultUpdateCreateProjectMain = userDB.updateDataUsers(id_user, "countCreateProject", statisticsCountCreateProjectMain);
            if (!resultUpdateCreateProjectMain) {
                System.out.println("Ошибка добавления проекта -> статистика");
            }

            new Statistics().statisctics(userDB, id_user, "countCreateProject", userMain.getStatisticsForMonth(), 1);


            // нужно добавить проекты еще тем людям которые есть в админах
            // я меняю поле adminOfProject потому что мне нужно добавить логин создателя, но также нужно продублировать поле без создателя
            // потому что иначе будет задваиваться id проекта, а мне доавления в админы нужны для отображения на фронте
            ArrayList<String> adminOfProject = (ArrayList<String>) projectJSON.get("adminOfProject");


            DBProject dbProject = new DBProject();
            String idOfProject = dbProject.insertProject(projectJSON, adminOfProject, id_user); // id самого проекта

            // если нет idшника проекта, то отдаю ошибку
            if (idOfProject == null || idOfProject.length() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Вы ввели неполные данные"), 200);
                return;
            }

            // по логинам буду искать id потом добавляю им проект в бд
            if (adminOfProject.size() > 0) {
                for (String login : adminOfProject) {

                    // создание экземпляра
                    DBUsers usersDB = new DBUsers();
                    // достаю пользователя из бд по логину
                    Users user = usersDB.selectDataUsers(login, "login");
                    String id = user.getId();


                    if (id != null && id.equals(id_user)) {
                        continue;
                    }

                    int statisticsCountProjectWereYouAdd = user.getCountProjectWereYouAdd() + 1;
                    Boolean resultUpdateProjectWereYouAdd = usersDB.updateDataUsers(id, "countProjectWereYouAdd", statisticsCountProjectWereYouAdd);
                    if (!resultUpdateProjectWereYouAdd) {
                        System.out.println("Ошибка добавления в проект -> статистика");
                    }

                    new Statistics().statisctics(usersDB, id, "countProjectWereYouAdd", user.getStatisticsForMonth(), 1);


                    // достаю его поле с активными задачами
                    ArrayList<String> activeProjectField = user.getActiveProject();
                    // добавляю id в массив активных проектов
                    activeProjectField.add(idOfProject);
                    // обновляю бд с новым массивом активных задач
                    Boolean resultUpdateDB = usersDB.updateDataUsers(user.getId(), "activeProject", activeProjectField);

                    if (!resultUpdateDB) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка добавления участников"), 200);
                        return;
                    }


                    // создать уведомление для участников проекта
                    DBNotification dbNote = new DBNotification();
                    Notification note = new Notification();

                    note.setText("добавил вас в проект");
                    note.setTime(date.toString());
                    note.setStatusNotification(false);
                    note.setStatusFriendNotification(false);
                    note.setFrom(loginMainUser);

                    Boolean resultAddNote = dbNote.insertNotification(note, id);

                    if (!resultAddNote) {
                        new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка создания проекта ;("), 200);
                        return;
                    }
                }
            }


            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Проект успешно создан!"), 200);


        } catch (IOException error) {
            System.out.println("Error to create project " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse project create " + error.getMessage());
        }catch (Exception error) {
            System.out.println("Error to common error in project " + error.getMessage());
        }
    }
}
