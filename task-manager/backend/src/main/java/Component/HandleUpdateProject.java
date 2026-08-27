package Component;

import PersonTasks.Notification;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBNotification;
import actionDB.DBProject;
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
import java.time.LocalDate;
import java.util.ArrayList;

public class HandleUpdateProject implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
            exchange.close();
            return;
        }

        if ("POST".equals(method)) {
            handleUpdateProject(exchange);
        }
    }

    // здесь берем проекты из двух мест из самой бд и из поля activeProject, потому что там лежат те проекты, которые могут быть назначены другими людьми
    public void handleUpdateProject(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            System.out.println(bodyJson);
            String token = (String) bodyJson.get("token");
            JSONObject project = (JSONObject) bodyJson.get("project");
            String id_project = (String) project.get("id_project");
            ArrayList<String> adminOfProject = (ArrayList<String>) project.get("adminOfProject"); // нужно добавить idшник проекта в активные проекты пользователям
            ArrayList<String> deletePeopleOfProject = (ArrayList<String>) project.get("deletePeople"); // удалить этим людям idшник проекта из поля активных проектов

            LocalDate date = LocalDate.now();

            DBTokenUser dbToken = new DBTokenUser();
            String id = dbToken.selectTokenUserId(token);

            DBUsers dbUsers = new DBUsers();
            Users userMain = dbUsers.selectDataUsers(id, "id");
            String loginMainUser = userMain.getLogin();

            DBProject dbProject = new DBProject();
            Boolean resultUpdate = dbProject.updateProject(id, project);

            // надо обновить проекты у пользователей
            for (String login : adminOfProject) {
                if (!loginMainUser.equals(login)) {
                    DBUsers usersDB = new DBUsers();
                    Users user = usersDB.selectDataUsers(login, "login");
                    String id_user = user.getId();
                    ArrayList<String> activeProject = user.getActiveProject();

                    // проверка такая потому что, пользователь может удалить и снова добавить человека в админы, поэтому нужно проверять есть ли уже idшник у него в активных проектах
                    if (!activeProject.contains(id_project)) {
                        activeProject.add(id_project);
                        Boolean result = usersDB.updateDataUsers(id_user, "activeProject", activeProject);

                        if (!result) {
                            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления^("), 200);
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

                        Boolean resultAddNote = dbNote.insertNotification(note, id_user);

                        if (!resultAddNote) {
                            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления проекта ;("), 200);
                            return;
                        }

                    }
                }
            }

            //теперь нужно удалить id проекта из активных задач у пользователей, которых из него удалили
            if (deletePeopleOfProject.size() > 0 && deletePeopleOfProject != null){
                for (String login: deletePeopleOfProject) {
                    DBUsers userDB = new DBUsers();
                    Users user = userDB.selectDataUsers(login, "login");
                    String id_user = user.getId();
                    ArrayList<String> activeProject = user.getActiveProject();

                    if (activeProject.contains(id_project)) {
                        activeProject.remove(id_project);
                        Boolean result = userDB.updateDataUsers(id_user, "activeProject", activeProject);
                        if (!result) {
                            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления:("), 200);
                            return;
                        }
                    }
                }
            }


            if (!resultUpdate) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка обновления"), 200);
                return;
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Проект успешно обновлен!"), 200);


        } catch (IOException error) {
            System.out.println("Error to edit project " + error.getMessage());
        }catch (ParseException error) {
            System.out.println("Error to edit parse project " + error.getMessage());
        }catch (Exception error) {
            System.out.println("Error in common to edit parse project " + error.getMessage());
        }

    }
}
