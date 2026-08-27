package actionDB;

import PersonTasks.Project;
import PersonTasks.Tasks;
import org.json.simple.JSONObject;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;


public class DBProject {
    public String insertProject(JSONObject json, ArrayList<String> changeAdminOfProject, String user_id) {
        String sql = "INSERT INTO project (id_project, id_user, name, description, dateStart, adminOfProject) VALUES (?, ?, ?, ?, ?, ?)";

        String returnIdProject = null;

        String name = (String) json.get("name");

        if (name.length() == 0) {
            return null;
        }

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            UUID uuid = UUID.randomUUID();

            String[] arrStr = changeAdminOfProject.toArray(new String[0]);
            Array arr = conn.createArrayOf("text", arrStr);

            returnIdProject = uuid.toString(); // id проекта для добавления в бд другим людям

            pstmt.setString(1, uuid.toString());
            pstmt.setString(2, user_id);
            pstmt.setString(3, (String) json.get("name"));
            pstmt.setString(4, (String) json.get("description"));
            pstmt.setString(5, (String) json.get("dateStart"));
            pstmt.setArray(6, arr);

            int result = pstmt.executeUpdate();
            if (result == 0) {
                return "";
            }

        } catch (SQLException error) {
            System.out.println("Error to add project " + error.getMessage());
        }
        return returnIdProject;
    }


    public ArrayList<Project> selectProjectForIdUser(String id_) {
        String sql = "SELECT * FROM project WHERE id_user = ?";

        ArrayList<Project> arrayProject = new ArrayList();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Project project = new Project();
                    project.setId_project(rs.getString("id_project"));
                    project.setName(rs.getString("name"));
                    project.setDescription(rs.getString("description"));
                    project.setDateStart(rs.getString("dateStart"));
                    Array adminOfProjectArray = rs.getArray("adminOfProject");

                    if (adminOfProjectArray == null) {
                        ArrayList<String> newArrayAdminOfProject = new ArrayList<>();
                        project.setAdminOfProject(newArrayAdminOfProject);
                    } else {
                        String[] strArr = (String[]) adminOfProjectArray.getArray();
                        ArrayList arrAdmin = new ArrayList<>(Arrays.asList(strArr));
                        project.setAdminOfProject(arrAdmin);
                    }

                    arrayProject.add(project);
                }
            }

        } catch (SQLException error) {
            System.out.println("Error to get project from db " + error.getMessage());
        }
        return arrayProject;


    }

    public Project selectProjectForIdProject(String id_project) {
        String sql = "SELECT * FROM project WHERE id_project = ?";

        Project project = new Project();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_project);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {

                    project.setId_project(rs.getString("id_project"));
                    project.setName(rs.getString("name"));
                    project.setDescription(rs.getString("description"));
                    project.setDateStart(rs.getString("dateStart"));
                    Array sqlArrAdminOfProject = rs.getArray("adminOfProject");

                    if (sqlArrAdminOfProject == null) {
                        ArrayList<String> adminArr = new ArrayList<>();
                        project.setAdminOfProject(adminArr);
                    } else {
                        String[] strArr = (String[]) sqlArrAdminOfProject.getArray();
                        ArrayList<String> arrAdmin = new ArrayList<>(Arrays.asList(strArr));
                        project.setAdminOfProject(arrAdmin);
                    }

                }
            }

        } catch (SQLException error) {
            System.out.println("Error to get tasks from db " + error.getMessage());
        }
        return project;
    }

    public Boolean deleteProject(String id_project, String id_user) {
        String sql = "DELETE FROM project WHERE id_project = ? AND id_user = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_project);
            pstmt.setString(2, id_user);

            return pstmt.executeUpdate() > 0;

        } catch (SQLException error) {
            System.out.println("Error to delete project sql");
            return false;
        }
    }

    public Boolean updateProject(String id_user, JSONObject project) {
        String sql = "UPDATE project SET name = ?, description = ?, adminOfProject = ? WHERE id_user = ? AND id_project = ?";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            String id_project = (String) project.get("id_project");
            String name = (String) project.get("name");
            if (name.length() == 0 || id_project.equals(null)) {
                return false;
            }
            String description = (String) project.get("description");
            ArrayList<String> adminOfProject = (ArrayList<String>) project.get("adminOfProject");
            String[] strArr = adminOfProject.toArray(new String[0]);
            Array arr = conn.createArrayOf("text", strArr);

            pstmt.setString(1, name);
            pstmt.setString(2, description);
            pstmt.setArray(3, arr);
            pstmt.setString(4, id_user);
            pstmt.setString(5, id_project);

            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException error) {
            System.out.println("Error to update project " + error.getMessage());
            return false;
        }
    }

}
