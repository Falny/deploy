package actionDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class DBCreateNotification {
    String sql = "CREATE TABLE IF NOT EXISTS notifications (" +
            "id_notification VARCHAR(50) PRIMARY KEY," +
            "id_user VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE," + // тот кому отправили
            "text TEXT NOT NULL," +
            "time VARCHAR(50) NOT NULL," +
            "status BOOLEAN NOT NULL," + // это статус для прочитанного уведомления
            "statusFriend BOOLEAN NOT NULL," + // это статус для определения добавления в друзья
            "fromUser TEXT NOT NULL" +
            ")";

    String sqlIndex = "CREATE INDEX IF NOT EXISTS id_notificate on notifications(id_user)";

    public void createDBNotification() {
        try (Connection conn = new DataConnection().connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
            stmt.executeUpdate(sqlIndex);
        } catch (SQLException error) {
            System.out.println("Error create db of notification " + error.getMessage());
        }
    }
}
