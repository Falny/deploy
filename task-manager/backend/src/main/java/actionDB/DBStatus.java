package actionDB;

import PersonTasks.Status;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBStatus {

    public void insertStatus(String id) {
        String sql = "INSERT INTO status (id_user) VALUES (?)";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            pstmt.executeUpdate();
        } catch (SQLException error) {
            System.out.println("Error create table status " + error.getMessage());
        }
    }


    public boolean updateStatus(String id, String status) {
        String sql = "UPDATE status SET status = ? WHERE id_user = ? ";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, status);
            pstmt.setString(2, id);
            int result = pstmt.executeUpdate();

            if (result == 0) {
                return false;
            }

        } catch (SQLException error) {
            System.out.println("Error to update status to db " + error.getMessage());
        }

        return true;
    }

    public Status selectStatus(String id) {
        String sql = "SELECT * FROM status WHERE id_user = ?";
        Status statusConstructor = new Status();
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    statusConstructor.setId_userOfOnlyStatus(rs.getString("id_user"));
                    statusConstructor.setStatusOfOnlyStatus(rs.getString("status"));
                }
            }

        } catch (SQLException error) {
            System.out.println("Error to select status " + error.getMessage());
        }
        return statusConstructor;
    }
}
