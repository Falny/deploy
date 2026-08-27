package actionDB;

import PersonTasks.Tasks;
import SendResponse.SendResponse;
import org.json.simple.JSONObject;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

public class DBTasks {
    public String insertTask(JSONObject json, String user_id) {
        String sql = "INSERT INTO tasks (id_task, id_project, id_user, name, description, dateStart, dateEnd, status, employee) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        String id_task = null;

        String name = (String) json.get("name");
        String status = (String) json.get("status");
        String dateEnd = (String) json.get("dateEnd");


        if (name.length() == 0 || status.length() == 0 || dateEnd.length() == 0) {
            return null;
        }


        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            UUID uuid = UUID.randomUUID();
            id_task = uuid.toString();

            ArrayList<String> adminTask = (ArrayList<String>) json.get("peopleInProject");
            String[] arrStrTask = adminTask.toArray(new String[0]);
            Array arrSql = conn.createArrayOf("text", arrStrTask);

            pstmt.setString(1, id_task);
            pstmt.setString(2, (String) json.get("id_project"));
            pstmt.setString(3, user_id);
            pstmt.setString(4, name);
            pstmt.setString(5, (String) json.get("description"));
            pstmt.setString(6, (String) json.get("dateStart"));
            pstmt.setString(7, dateEnd);
            pstmt.setString(8, status);
            pstmt.setArray(9, arrSql);

            pstmt.executeUpdate();


        } catch (SQLException error) {
            System.out.println("Error to add tasks " + error.getMessage());
        }
        return id_task;
    }

    public ArrayList<Tasks> selectTaskArray(String id_, String id_project) {
        String sql = "SELECT * FROM tasks WHERE id_user = ? AND id_project = ?";

        ArrayList<Tasks> arrayTask = new ArrayList();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_);
            pstmt.setString(2, id_project);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Tasks task = new Tasks();
                    task.setId_task(rs.getString("id_task"));
                    task.setId_project(rs.getString("id_project"));
                    task.setName(rs.getString("name"));
                    task.setDescription(rs.getString("description"));
                    task.setDateStart(rs.getString("dateStart"));
                    task.setDateEnd(rs.getString("dateEnd"));
                    task.setStatus(rs.getString("status"));
                    Array adminTask = rs.getArray("employee");

                    if (adminTask == null) {
                        ArrayList<String> newAdminOfTask = new ArrayList<>();
                        task.setEmployee(newAdminOfTask);
                    } else {
                        String[] strArr = (String[]) adminTask.getArray();
                        ArrayList<String> arrTask = new ArrayList<>(Arrays.asList(strArr));
                        task.setEmployee(arrTask);
                    }

                    arrayTask.add(task);
                }
            }

        } catch (SQLException error) {
            System.out.println("Error to get tasks from db " + error.getMessage());
        }
        return arrayTask;
    }

    public ArrayList<Tasks> selectTaskArray(String id_project) {
        String sql = "SELECT * FROM tasks WHERE id_project = ?";

        ArrayList<Tasks> arrayTask = new ArrayList();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_project);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Tasks task = new Tasks();
                    task.setId_task(rs.getString("id_task"));
                    task.setId_project(rs.getString("id_project"));
                    task.setId_user(rs.getString("id_user"));
                    task.setName(rs.getString("name"));
                    task.setDescription(rs.getString("description"));
                    task.setDateStart(rs.getString("dateStart"));
                    task.setDateEnd(rs.getString("dateEnd"));
                    task.setStatus(rs.getString("status"));
                    Array adminTask = rs.getArray("employee");

                    if (adminTask == null) {
                        ArrayList<String> newAdminOfTask = new ArrayList<>();
                        task.setEmployee(newAdminOfTask);
                    } else {
                        String[] strArr = (String[]) adminTask.getArray();
                        ArrayList<String> arrTask = new ArrayList<>(Arrays.asList(strArr));
                        task.setEmployee(arrTask);
                    }

                    arrayTask.add(task);
                }
            }

        } catch (SQLException error) {
            System.out.println("Error to get tasks from db " + error.getMessage());
        }
        return arrayTask;
    }

    // метод для выбора задач по полю активных задач из бд user
    public Tasks selectTask(String value1, String value2, String column1, String column2) {
        String sql = "SELECT * FROM tasks WHERE " + column1 + " = ? AND " + column2 + " = ?";

        Tasks task = null;

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, value1);
            pstmt.setString(2, value2);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    task = new Tasks();
                    task.setId_task(rs.getString("id_task"));
                    task.setId_user(rs.getString("id_user"));
                    task.setId_project(rs.getString("id_project"));
                    task.setName(rs.getString("name"));
                    task.setDescription(rs.getString("description"));
                    task.setDateStart(rs.getString("dateStart"));
                    task.setDateEnd(rs.getString("dateEnd"));
                    task.setStatus(rs.getString("status"));
                    Array adminTask = rs.getArray("employee");

                    if (adminTask == null) {
                        ArrayList<String> newAdminOfTask = new ArrayList<>();
                        task.setEmployee(newAdminOfTask);
                    } else {
                        String[] strArr = (String[]) adminTask.getArray();
                        ArrayList<String> arrTask = new ArrayList<>(Arrays.asList(strArr));
                        task.setEmployee(arrTask);
                    }

                }
            }

        } catch (SQLException error) {
            System.out.println("Error to get tasks from db " + error.getMessage());
        }
        return task;
    }


    public boolean UpdateTask(JSONObject task, String id_user) {
        String sql = "UPDATE tasks SET name = ?, description = ?, status = ?, employee = ? WHERE id_task = ? AND id_user = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            ArrayList<String> adminOfTaskArr = (ArrayList<String>) task.get("peopleInProject");
            String[] adminOfTask = adminOfTaskArr.toArray(new String[0]);

            Array arrSql = conn.createArrayOf("text", adminOfTask);

            pstmt.setString(1, (String) task.get("name"));
            pstmt.setString(2, (String) task.get("description"));
            pstmt.setString(3, (String) task.get("status"));
            pstmt.setArray(4, arrSql);
            pstmt.setString(5, (String) task.get("id_task"));
            pstmt.setString(6, id_user);

            int result = pstmt.executeUpdate();

            if (result == 0) {
                return false;
            }


        } catch (SQLException error) {
            System.out.println("Error to update task " + error.getMessage());
            return false;
        }
        return true;
    }

    // метод для обновлений полей бд имеющие тип массива
    public boolean updateTask(String id_, String column, ArrayList<String> value) {
        String sql = "UPDATE tasks SET " + column + " = ? WHERE id_task = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            String[] strArray = value.toArray(new String[0]);
            Array ArrayToSql = conn.createArrayOf("text", strArray);
            pstmt.setArray(1, ArrayToSql);
            pstmt.setString(2, id_);

            int result = pstmt.executeUpdate();

            if (result == 0) {
                return false;
            }

        } catch (SQLException error) {
            System.out.println("Error to update data tasks " + error.getMessage());
            return false;
        }
        return true;

    }

    public boolean deleteTask(String id_task, String id_user) {

        String sql = "DELETE FROM tasks WHERE id_task = ? AND id_user = ?";

        try (Connection conn = new DataConnection().connection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id_task);
            stmt.setString(2, id_user);


            return stmt.executeUpdate() > 0;

        } catch (SQLException error) {
            System.out.println("Error delete task " + error.getMessage());
            return false;

        }
    }
}
