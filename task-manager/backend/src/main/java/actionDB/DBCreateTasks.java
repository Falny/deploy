package actionDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

// Создание таблицы с задачами

// создание индекса к id пользователям
// связь с таблицей users



public class DBCreateTasks {
    String sql = "CREATE TABLE IF NOT EXISTS tasks (" +
            "id_task VARCHAR(50) PRIMARY KEY," +
            "id_project VARCHAR(50) REFERENCES project(id_project) ON DELETE CASCADE," +
            "id_user VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE," +
            "name VARCHAR(50) NOT NULL," +
            "description TEXT NULL," +
            "dateStart VARCHAR(50) NOT NULL," +
            "dateEnd VARCHAR(50) NOT NULL," +
            "status VARCHAR(50) NOT NULL," +
            "employee TEXT[] NOT NULL" + // люди исполняющие с adminOfProject они могут дублироваться
            ")";

    String sqlIndex = "CREATE INDEX IF NOT EXISTS id_tasks_users ON tasks(id_user, id_project)";
    String sqlOnlyIdUser = "CREATE INDEX IF NOT EXISTS id_tasks_users ON tasks(id_user)";
    String sqlOnlyInProject = "CREATE INDEX IF NOT EXISTS id_tasks_users ON tasks(id_project)";

    public void createDBTasks() {
        try (Connection conn = new DataConnection().connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
            stmt.executeUpdate(sqlIndex);
            stmt.executeUpdate(sqlOnlyIdUser);
            stmt.executeUpdate(sqlOnlyInProject);
        } catch (SQLException error) {
            System.out.println("Error to create db tasks " + error.getMessage());
        }
    }
}
