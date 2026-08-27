package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.model.LightModel;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class LightDAO {
    private DBConnection dbConnection;

    public LightDAO() {
    }

    @Autowired
    public LightDAO(DBConnection connection) {
        this.dbConnection = connection;
    }

    @PostConstruct
    public void createLight() {
        String sql = "CREATE TABLE IF NOT EXISTS light (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "light TEXT NOT NULL" +
                ")";
        try (Connection conn = dbConnection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.out.println("Error to create light " + e.getMessage());
            throw new RuntimeException("Error to create light");

        }
    }

    public String insertLight(String value) {
        String sql = "INSERT INTO light (id, light) VALUES (?, ?)";
        UUID id = UUID.randomUUID();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id.toString());
            pstmt.setString(2, value);
            int result = pstmt.executeUpdate();

            if (result < 0) {
                throw new RuntimeException("Error to insert value in light.");
            }

        } catch (SQLException e) {
            System.out.println("Error to insert value in light " + e.getMessage());
            throw new RuntimeException("Error to insert value in light");

        }

        return value;
    }

    public LightModel updateLight(String id, String value) {
        String sql = "UPDATE light SET light = ? WHERE id = ?";

        LightModel model = new LightModel();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, value);
            pstmt.setString(2, id);
            int result = pstmt.executeUpdate();

            model.setId(id);
            model.setLight(value);

            if (result < 0) {
                throw new RuntimeException("Error to update value in light.");
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in light " + e.getMessage());
            throw new RuntimeException("Error to update value in light");

        }
        return model;
    }

    public List<LightModel> selectLight() {
        String sql = "SELECT * FROM light";

        List<LightModel> lightList = new ArrayList<>();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                LightModel model = new LightModel();
                model.setId(rs.getString("id"));
                model.setLight(rs.getString("light"));
                lightList.add(model);
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in light " + e.getMessage());
            throw new RuntimeException("Error to update value in light");

        }
        return lightList;
    }

    public Boolean deleteLight(String id) {
        String sql = "DELETE FROM light WHERE id = ?";

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException e) {
            System.out.println("Error to update value in light " + e.getMessage());
            throw new RuntimeException("Error to update value in light");
        }
    }
}
