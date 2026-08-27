package actionDB;

import PersonTasks.Users;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

// взаимодействие с бд токеном и логином
// таблица user_token

// user_token содержаит поля
// id
// token

// необходима для назачения токена (сессии пользователю)

public class DBTokenUser {

    // добавление записей в таблицу user_token
    // принимает id и login для добавления
    public void insertTokenUser(String id_, String token_) {
        String sql = "INSERT INTO user_token (id, token) VALUES (?, ?)";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_);
            pstmt.setString(2, token_);
            pstmt.executeUpdate();
        } catch (SQLException error) {
            System.out.println("Error to insert data token " + error.getMessage());
        }
    }

    // удаление записей из таблицы user_token
    // принимает id для удаления
    public void deleteTokenUser(String id_) {
        String sql = "DELETE FROM user_token WHERE id = ?";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_);
            pstmt.executeUpdate();
        } catch (SQLException error) {
            System.out.println("Error to delete data token " + error.getMessage());
        }
    }

    // вытаскаиваю токен из бд по id
    public Users selectTokenUser(String id_) {
        String sql = "SELECT * FROM user_token WHERE id = ?";
        Users user = new Users();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_);

            try (ResultSet rs = pstmt.executeQuery()) {

                while (rs.next()) {
                    user.setToken(rs.getString("token"));
                }

            }

        } catch (SQLException error) {
            System.out.println("Error to delete data token " + error.getMessage());
        }

        return user;
    }

    public String selectTokenUserId(String token_) {
        String sql = "SElECT id FROM user_token WHERE token = ?";
        String id = null;

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, token_);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    id = rs.getString("id");
                }
            }

        } catch (SQLException error) {
            System.out.println("Error to get id " + error.getMessage());
        }

        return id;
    }

    // для поиска idшника по входу через другие приложения
    public Boolean selectIdUserToken(String id_) {
        String sql = "SELECT EXISTS(SELECT 1 FROM user_token WHERE id = ?)";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id_);
            try (ResultSet rs = pstmt.executeQuery()) {

                if (rs.next()) {
                    return rs.getBoolean(1);
                };
            }
            return false;

        } catch (SQLException error) {
            System.out.println("Error to get id " + error.getMessage());
            return false;
        }

    }
}
