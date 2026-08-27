package actionDB;

import PersonTasks.Notification;

import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;

public class DBNotification {

    // id здесь того человека, которому пришло уведомление
    public boolean insertNotification(Notification notification, String id) {
        String sql = "INSERT INTO notifications (id_notification, id_user, text, time, status, statusFriend, fromUser) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            UUID uuid = UUID.randomUUID();

            pstmt.setString(1, uuid.toString());
            pstmt.setString(2, id);
            pstmt.setString(3, notification.getText());
            pstmt.setString(4, notification.getTime());
            pstmt.setBoolean(5, notification.getStatusNotification());
            pstmt.setBoolean(6, notification.getStatusFriendNotification());
            pstmt.setString(7, notification.getFrom());

            int result = pstmt.executeUpdate();

            if (result == 0) {
                return false;
            }

        } catch (SQLException error) {
            System.out.println("Error to insert data of notification " + error.getMessage());
        }

        return true;
    }

    public ArrayList<Notification> selectNotification(String id) {
        String sql = "SELECT * FROM notifications WHERE id_user = ?";

        ArrayList<Notification> NotificationArray = new ArrayList<>();

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            try(ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Notification notification = new Notification();
                    notification.setId_notification(rs.getString("id_notification"));
                    notification.setId_user(rs.getString("id_user"));
                    notification.setText(rs.getString("text"));
                    notification.setTime(rs.getString("time"));
                    notification.setStatusNotification(rs.getBoolean("status"));
                    notification.setStatusFriendNotification(rs.getBoolean("statusFriend"));
                    notification.setFrom(rs.getString("fromUser"));

                    NotificationArray.add(notification);
                }
            }

        }catch (SQLException error) {
            System.out.println("Error to select data from db notification " + error.getMessage());
        }

        return NotificationArray;
    }
    public boolean updateNotification(String id_note, String id_user, Boolean value, String column) {
        System.out.println(id_note+ " " + id_user+ " " +value+ " " +column);
        String sql = "UPDATE notifications SET " + column + " = ? WHERE id_notification = ? AND id_user = ?";
        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)){
            pstmt.setBoolean(1, value);
            pstmt.setString(2, id_note);
            pstmt.setString(3, id_user);

            int result = pstmt.executeUpdate();

            if (result == 0) {
                return false;
            }

        } catch (SQLException error) {
            System.out.println("Error to update data from db notification " + error.getMessage());
        }
        return true;
    }

    public Boolean deleteNotification(String id_note, String id_user) {
        String sql = "DELETE FROM notifications WHERE id_notification = ? AND id_user = ?";

        try (Connection conn = new DataConnection().connection(); PreparedStatement pstmt = conn.prepareStatement(sql)){
            pstmt.setString(1, id_note);
            pstmt.setString(2, id_user);

            int result = pstmt.executeUpdate();

            return result > 0;


        } catch (SQLException error) {
            System.out.println("Error to delete the note " + error.getMessage());
            return false;
        }
    }
}
