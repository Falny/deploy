package Component;

import PersonTasks.Project;
import PersonTasks.Users;
import SendResponse.SendResponse;
import actionDB.DBProject;
import actionDB.DBTokenUser;
import actionDB.DBUsers;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class HandleGetProject implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        if ("GET".equals(method)) {
            handleGetProject(exchange);
        }
    }

    // здесь берем проекты из двух мест из самой бд и из поля activeProject, потому что там лежат те проекты, которые могут быть назначены другими людьми
    public void handleGetProject(HttpExchange exchange) {
        try {
            Headers headers = exchange.getRequestHeaders();
            String token = headers.getFirst("Authorization");

            DBTokenUser dbTokenUser = new DBTokenUser();
            String id = dbTokenUser.selectTokenUserId(token);

            // достану сначала поле activeProject, чтобы сразу искать в бд
            DBUsers userDB = new DBUsers();
            Users user = userDB.selectDataUsers(id, "id");

            ArrayList<String> activeProject = user.getActiveProject();

            JSONArray jsonArrayForProject = new JSONArray();

            if (activeProject != null || activeProject.size() != 0) {
                for (String id_project : activeProject) {
                    DBProject dbProject = new DBProject();
                    JSONObject jsonObj = new JSONObject();

                    Project project = dbProject.selectProjectForIdProject(id_project);

                    jsonObj.put("id_project", project.getId_project());
                    jsonObj.put("name", project.getName());
                    jsonObj.put("description", project.getDescription());
                    jsonObj.put("dateStart", project.getDateStart());
                    jsonObj.put("adminOfProject", project.getAdminOfProject());
                    jsonObj.put("isCreator", false);

                    jsonArrayForProject.add(jsonObj);

                }
            }

            // теперь достану те проекты, что есть у самого этого idшника
            DBProject dbProject = new DBProject();
            ArrayList<Project> projects = dbProject.selectProjectForIdUser(id);


            if (projects.size() > 0) {
                for (Project project : projects) {
                    JSONObject jsonObj = new JSONObject();

                    jsonObj.put("id_project", project.getId_project());
                    jsonObj.put("name", project.getName());
                    jsonObj.put("description", project.getDescription());
                    jsonObj.put("dateStart", project.getDateStart());
                    jsonObj.put("adminOfProject", project.getAdminOfProject());
                    jsonObj.put("isCreator", true);
                    jsonArrayForProject.add(jsonObj);
                }
            }


            JSONObject jsonObj = new JSONObject();
            jsonObj.put("success", true);
            jsonObj.put("projects", jsonArrayForProject);

            String data = jsonObj.toJSONString();

            new SendResponse().sendResponse(exchange, data, 200);


        } catch (Exception error) {
            System.out.println("Error to get project " + error.getMessage());
        }
    }
}
