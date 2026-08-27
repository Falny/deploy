package actionDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class DBCreateStatus {
    private String sql = "CREATE TABLE IF NOT EXISTS status (" +
            "id_user VARCHAR(50) UNIQUE PRIMARY KEY," +
            "status TEXT DEFAULT 'В работе:#01da10,Отложено:#e6ea0b' " +
            ")";

    public void createDBStatus() {
        try (Connection conn = new DataConnection().connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException error) {
            System.out.println("Error to create db of status " + error.getMessage());
        }
    }
}
