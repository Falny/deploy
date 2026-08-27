package Component;

import PersonTasks.Project;
import PersonTasks.Tasks;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import Statistics.Statistics;
import actionDB.DBProject;
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

public class HandleDeleteProject implements HttpHandler {

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
            handleDeleteProject(exchange);
        }
    }

    // здесь берем проекты из двух мест из самой бд и из поля activeProject, потому что там лежат те проекты, которые могут быть назначены другими людьми
    public void handleDeleteProject(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJSON = (JSONObject) parser.parse(body);
            String token = (String) bodyJSON.get("token");
            String id_project = (String) bodyJSON.get("id_project");

            DBTokenUser dbTokenUser = new DBTokenUser();
            String id_user = dbTokenUser.selectTokenUserId(token);

            DBUsers dbUsers = new DBUsers();
            Users user = dbUsers.selectDataUsers(id_user, "id");
            String login = user.getLogin();

            DBProject dbProject = new DBProject();
            Project project = dbProject.selectProjectForIdProject(id_project);
            ArrayList<String> adminOfProject = project.getAdminOfProject();

            int countHowMuchDeleteTask = 0; // сколько удаленных задач в проекте, для дальнешйе приплюсовке к статистике
            int countHowMuchDeleteTaskAdmin = 0; // сколько удаленных задач в проекте, для дальнешйе приплюсовке к статистике

            // отфильтровываю логин главного пользователя от остальных
            if (adminOfProject.contains(login) && adminOfProject.size() != 0) {
                adminOfProject.remove(login);
            }

            DBTasks dbTask = new DBTasks();
            ArrayList<Tasks> tasks = dbTask.selectTaskArray(id_project);
            ArrayList<String> tasksIdToDelete = new ArrayList<>();


            if (tasks.size() > 0) {
                for (Tasks task : tasks) {
                    String id_task = task.getId_task();
                    String idUserWhoCreateTask = task.getId_user();
                    tasksIdToDelete.add(id_task);

                    // нужно добавить в статистику те задачи, что были созданы этим человеком, методом подбора
                    if (idUserWhoCreateTask.equals(id_user)) {
                        countHowMuchDeleteTask += 1;

                    }
                }
            }
            DBUsers dbUser = new DBUsers();

            // удаление проекта/задач из админов проекта
            if (adminOfProject != null && adminOfProject.size() > 0) {
                for (String login_ : adminOfProject) {
                    Users user_ = dbUser.selectDataUsers(login_, "login");
                    String id_userAdmin = user_.getId();

                    ArrayList<String> deleteTask = user_.getDeleteTask();
                    ArrayList<String> activeTask = user_.getActiveTask();
                    ArrayList<String> activeProject = user_.getActiveProject();


                    if (activeTask != null || deleteTask != null ) {
                        int sizeActiveTask = activeTask.size(); // необхожимо для расчета удаленных задач
                        int sizeDeleteTask = deleteTask.size();// необхожимо для расчета удаленных задач

                        if (activeTask.size() > 0) {

                            activeTask.removeAll(tasksIdToDelete); // удаляю все idшники из массива с активными задачами

                            // расчет статистики на удаление из активных задач
                            countHowMuchDeleteTaskAdmin += (sizeActiveTask - activeTask.size()); // рассчитываю сколько задач удалилось, в расчете с изначальной длиной и длиной после удаления задач

                            // обновляю сам список с активными задачами
                            Boolean resultActiveTask = dbUsers.updateDataUsers(id_userAdmin, "activeTask", activeTask);
                            if (!resultActiveTask) {
                                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления проекта ^("), 200);
                                return;
                            }

                        }

                        if (deleteTask.size() > 0) {
                            deleteTask.removeAll(tasksIdToDelete);

                            countHowMuchDeleteTaskAdmin += (sizeDeleteTask - deleteTask.size());

                            Boolean resultDeleteTask = dbUsers.updateDataUsers(id_userAdmin, "deleteTask", deleteTask);
                            if (!resultDeleteTask) {
                                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления проекта ;("), 200);
                                return;
                            }
                        }

                        new Statistics().statisctics(dbUsers, id_user, "countDeleteTask", user_.getStatisticsForMonth(), countHowMuchDeleteTaskAdmin);

                        int statisticsCountDeleteTask = user.getCountDeleteTask() + countHowMuchDeleteTaskAdmin;
                        Boolean resultUpdateCountDeleteTask = dbUsers.updateDataUsers(id_user, "countDeleteTask", statisticsCountDeleteTask);
                        if (!resultUpdateCountDeleteTask) {
                            System.out.println("Ошибка удаления задачи при удалении проекта у админа -> статистика");
                        }
                    }

                    if (activeProject != null) {
                        activeProject.remove(id_project);

                        Boolean resultDeleteProject = dbUsers.updateDataUsers(id_userAdmin, "activeProject", activeProject);
                        if (!resultDeleteProject) {
                            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления проекта ;("), 200);
                            return;
                        }

                        new Statistics().statisctics(dbUsers, id_user, "countDeleteProject", user_.getStatisticsForMonth(), 1);

                        int statisticsCountDeleteProject = user.getCountDeleteProject() + 1;
                        Boolean resultUpdateCountDeleteProject = dbUsers.updateDataUsers(id_user, "countDeleteProject", statisticsCountDeleteProject);
                        if (!resultUpdateCountDeleteProject) {
                            System.out.println("Ошибка удаления проекта при удалении проекта у админа -> статистика");
                        }
                    }

                }
            }

            // это логика самого человека, кто удалил задачу
            // удаляю из удаленных задачи связанные с этим проектом
            ArrayList<String> deleteTaskMainUser = user.getDeleteTask();
            ArrayList<String> activeTaskMainUser = user.getActiveTask();

            if (deleteTaskMainUser != null || activeTaskMainUser != null) {


                int sizeDeleteTaskMainUser = deleteTaskMainUser.size();
                int sizeActiveTaskMainUser = activeTaskMainUser.size();


                if (deleteTaskMainUser.size() > 0) {
                    deleteTaskMainUser.removeAll(tasksIdToDelete);
                    countHowMuchDeleteTask += (sizeDeleteTaskMainUser - deleteTaskMainUser.size());

                }

                if (activeTaskMainUser.size() > 0) {
                    activeTaskMainUser.removeAll(tasksIdToDelete);
                    countHowMuchDeleteTask += (sizeActiveTaskMainUser - activeTaskMainUser.size());
                }


                Boolean resultDeleteTaskMainUser = dbUsers.updateDataUsers(id_user, "deleteTask", deleteTaskMainUser);
                Boolean resultActiveTaskMainUser = dbUsers.updateDataUsers(id_user, "activeTask", activeTaskMainUser);
                if (!resultDeleteTaskMainUser || !resultActiveTaskMainUser) {
                    new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления проекта #("), 200);
                    return;
                }
            }

            // теперь удаляю сам проект
            Boolean deleteProject = dbProject.deleteProject(id_project, id_user);

            if (!deleteProject) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка удаления проекта (("), 200);
                return;
            }

            int statisticsCountDeleteProject = user.getCountDeleteProject() + 1;
            Boolean resultUpdateDeleteProject = dbUsers.updateDataUsers(id_user, "countDeleteProject", statisticsCountDeleteProject);
            if (!resultUpdateDeleteProject) {
                System.out.println("Ошибка удаления проекта у главного -> статистика");
            }


            new Statistics().statisctics(dbUsers, id_user, "countDeleteProject", user.getStatisticsForMonth(), 1);
            Users userNew = dbUsers.selectDataUsers(id_user, "id");
            new Statistics().statisctics(dbUsers, id_user, "countDeleteTask", userNew.getStatisticsForMonth(), countHowMuchDeleteTask);

            int statisticsCountDeleteTask = user.getCountDeleteTask() + countHowMuchDeleteTask;
                Boolean resultUpdateCountDeleteTask = dbUsers.updateDataUsers(id_user, "countDeleteTask", statisticsCountDeleteTask);
                if (!resultUpdateCountDeleteTask) {
                    System.out.println("Ошибка удаления задачи при удалении проекта у главного -> статистика");
                }


            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Проект успешно удален!"), 200);


        } catch (IOException error) {
            System.out.println("Error read to delete project " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error parse to delete project " + error.getMessage());
        }catch (Exception error) {
            System.out.println("Error common error to delete project " + error.getMessage());
        }
    }
}
