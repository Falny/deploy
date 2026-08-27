package actionDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class DBCreateProject {
    String sql = "CREATE TABLE IF NOT EXISTS project (" +
            "id_project VARCHAR(50) PRIMARY KEY," +
            "id_user VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE," +
            "name TEXT NOT NULL," +
            "description TEXT NULL," +
            "dateStart TEXT NOT NULL," +
            "adminOfProject TEXT[] DEFAULT '{}'" + // люди, которые могут менять сам проект, удалять задачи; они не повторяются с теми что были созданы самим пользователем, то есть в этом поле только те idшники проектов, что назначили другие люди
            ")";

    String index = "CREATE INDEX IF NOT EXISTS id_projectIndex ON project(id_user)";

    public void dbCreateProject() {
        try (Connection conn = new DataConnection().connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
            stmt.executeUpdate(index);
        } catch (SQLException error) {
            System.out.println("Error to create db project " + error.getMessage());
        }
    }
}
