package actionDB;

import PersonTasks.Notification;
import PersonTasks.Users;
import SendResponse.SendResponse;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;
import java.time.LocalDate;

// таблица users

// необходима для взаимодействия с самим пользователем, и его данными

public class DBUsers {

    // добавление записей в таблицу, приходит login, password
    // создаюется uuid для id
    public String insertDataUser(String login, String password) {
        String sql = "INSERT INTO users (id, login, username, password, isHowCreated) VALUES (?, ?, ?, ?, ?)";
        String id = null;

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            // сделать логику id уникальной

            UUID uuid = UUID.randomUUID();
            id = uuid.toString();

            String username = UUID.randomUUID().toString() + "_" + LocalDate.now();

            pstmt.setString(1, uuid.toString());
            pstmt.setString(2, login);
            pstmt.setString(3, username);
            pstmt.setString(4, password);
            pstmt.setBoolean(5, false);

            pstmt.executeUpdate();

        } catch (SQLException error) {
            System.out.println("Error to insert data " + error.getMessage());
        }
        return id;
    }


    // добавление пользователей по яндексу
    public Boolean insertDataUserY(String login, String yandex_id) {
        String sql = "INSERT INTO users (id, login, username, password, isHowCreated) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            String username = UUID.randomUUID().toString() + "_" + LocalDate.now();

            pstmt.setString(1, yandex_id);
            pstmt.setString(2, login);
            pstmt.setString(3, username);
            pstmt.setString(4, null);
            pstmt.setBoolean(5, true);

            int result = pstmt.executeUpdate();
            return result > 0;

        } catch (SQLException error) {
            System.out.println("Error to insert data " + error.getMessage());
            return false;
        }
    }

    // обновление данных, приходит объект user
    // данные обновляются по id из объекта, пароль приходит уже хешированный
    public boolean updateDataUsers(String id_, String column, String value) {
        String sql = "UPDATE users SET " + column + " = ? WHERE id = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, value);
            pstmt.setString(2, id_);

            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException error) {
            System.out.println("Error to update data user" + error.getMessage());
            return false;
        }

    }

    public boolean updateDataUserStat(String id_, String value) {
        String sql = "UPDATE users SET statisticsForMonth = ?::jsonb WHERE id = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, value);
            pstmt.setString(2, id_);

            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException error) {
            System.out.println("Error to update data user" + error.getMessage());
            return false;
        }

    }
    public boolean updateDataUsers(String id_, String column, Boolean value) {
        String sql = "UPDATE users SET " + column + " = ? WHERE id = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setBoolean(1, value);
            pstmt.setString(2, id_);

            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException error) {
            System.out.println("Error to update data user" + error.getMessage());
            return false;
        }

    }
    public boolean updateDataUsers(String id_, String column, int value) {
        String sql = "UPDATE users SET " + column + " = ? WHERE id = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, value);
            pstmt.setString(2, id_);

            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException error) {
            System.out.println("Error to update data user" + error.getMessage());
            return false;
        }

    }

    // метод для обновлений полей бд имеющие тип массива
    public boolean updateDataUsers(String id_, String column, ArrayList<String> value) {
        String sql = "UPDATE users SET " + column + " = ? WHERE id = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            String[] strArray = value.toArray(new String[0]);
            Array ArrayToSql = conn.createArrayOf("text", strArray);
            pstmt.setArray(1, ArrayToSql);
            pstmt.setString(2, id_);

            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException error) {
            System.out.println("Error to update data user " + error.getMessage());
            return false;
        }

    }


    public void deleteDataUsers(String id_) {
        String sql = "DELETE FROM users WHERE id = ?";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_);
            pstmt.executeUpdate();
        } catch (SQLException error) {
            System.out.println("Error to delete data " + error.getMessage());
        }
    }

    // разъединила два метода, потому что запуталась в их использовании в разных местах, один для логина, другой для профиля
    public Users selectDataUsers(String value, String column) {

        String sql = "SELECT * FROM users WHERE " + column + " = ?";
        Users user = new Users();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql);) {

            pstmt.setString(1, value);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {

                    user.setId(rs.getString("id"));
                    user.setLogin(rs.getString("login"));
                    user.setUsername(rs.getString("username"));
                    user.setPassword(rs.getString("password"));
                    user.setAvatars(rs.getString("avatars"));
                    user.setIsHowCreated(rs.getBoolean("isHowCreated"));
                    user.setCountCreateTask(rs.getInt("countCreateTask"));
                    user.setCountDeleteTask(rs.getInt("countDeleteTask"));
                    user.setCountExpiredTask(rs.getInt("countExpiredTask"));
                    user.setCountAddFriend(rs.getInt("countAddFriend"));
                    user.setCountCreateProject(rs.getInt("countCreateProject"));
                    user.setCountDeleteProject(rs.getInt("countDeleteProject"));
                    user.setCountTaskWereYouAdd(rs.getInt("countTaskWereYouAdd"));
                    user.setCountProjectWereYouAdd(rs.getInt("countProjectWereYouAdd"));
                    Array friendArray = rs.getArray("friends");
                    Array activeProject = rs.getArray("activeProject");
                    Array activeTask = rs.getArray("activeTask");
                    Array deleteTask = rs.getArray("deleteTask");
                    Array deleteProject = rs.getArray("deleteProject");
                    String statistics = rs.getString("statisticsForMonth");

                    if (statistics == null || statistics.length() == 0){
                        JSONArray statisticsList = new JSONArray();
                        user.setStatisticsForMonth(statisticsList);
                    } else {
                        JSONParser parser = new JSONParser();
                        JSONArray stat = (JSONArray) parser.parse(statistics);
                        user.setStatisticsForMonth(stat);
                    }

                    if (deleteProject == null) {
                        ArrayList<String> deleteArrTask = new ArrayList<>();
                        user.setDeleteProject(deleteArrTask);
                    } else {
                        String[] arrString = (String[]) deleteProject.getArray();
                        ArrayList<String> arrTask = new ArrayList<>(Arrays.asList(arrString));
                        user.setDeleteProject(arrTask);
                    }

                    if (deleteTask == null) {
                        ArrayList<String> deleteArrTask = new ArrayList<>();
                        user.setDeleteTask(deleteArrTask);
                    } else {
                        String[] arrString = (String[]) deleteTask.getArray();
                        ArrayList<String> arrTask = new ArrayList<>(Arrays.asList(arrString));
                        user.setDeleteTask(arrTask);
                    }

                    if (activeTask == null) {
                        ArrayList<String> activeTaskArray = new ArrayList<>();
                        user.setActiveTask(activeTaskArray);
                    } else {
                        String[] strArr = (String[]) activeTask.getArray();
                        ArrayList<String> activeTaskArray = new ArrayList<>(Arrays.asList(strArr));
                        user.setActiveTask(activeTaskArray);
                    }

                    if (friendArray == null) {
                        ArrayList<String> friends = new ArrayList<>();
                        user.setFriends(friends);
                    } else {
                        String[] stringArr = (String[]) friendArray.getArray();
                        ArrayList<String> friends = new ArrayList<>(Arrays.asList(stringArr));
                        user.setFriends(friends);
                    }

                    if (activeProject == null) {
                        ArrayList<String> activeProj = new ArrayList<>();
                        user.setActiveProject(activeProj);
                    } else {
                        String[] stringArr = (String[]) activeProject.getArray();
                        ArrayList<String> activeProj = new ArrayList<>(Arrays.asList(stringArr));
                        user.setActiveProject(activeProj);
                    }
                }
            }

        } catch (SQLException error) {
            System.out.println("Error to select data users " + error.getMessage());
        }catch (ParseException error) {
            System.out.println("Error to parse statistics in db " + error.getMessage());
        }

        return user;

    }

    public ArrayList<Users> selectDataUsersSearch(String value, String column) {
        String sql = "SELECT * FROM users WHERE " + column + " ILIKE ?";

        ArrayList<Users> usersList = new ArrayList<>();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, "%" + value + "%");


            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Users users = new Users();

                    users.setId(rs.getString("id"));
                    users.setLogin(rs.getString("login"));
                    users.setUsername(rs.getString("username"));
                    users.setAvatars(rs.getString("avatars"));

                    usersList.add(users);
                }
            }

        } catch (SQLException error) {
            System.out.println("Error to select data users " + error.getMessage());
        }

        return usersList;
    }


}
