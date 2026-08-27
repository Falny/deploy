package actionDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

// таблица user_token

// СОЗДАНИЕ ТАБЛИЦЫ USER_TOKEN

// создает

// id
// token

public class DBCreateTokenUser {

    String sql = "CREATE TABLE IF NOT EXISTS user_token (" +
            "id VARCHAR(100) PRIMARY KEY," +
            "token VARCHAR(255) UNIQUE NOT NULL" +
            ")";

    public void createTokenUser() {

        try (Connection conn = new DataConnection().connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException error) {
            System.out.println("ERROR create db token" + error.getMessage());
        }
    }
}
