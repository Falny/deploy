package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.model.ColorModel;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class ColorDAO {
    private DBConnection dbConnection;

    public ColorDAO() {
    }

    @Autowired
    public ColorDAO(DBConnection connection) {
        this.dbConnection = connection;
    }

    @PostConstruct
    public void createColor() {
        String sql = "CREATE TABLE IF NOT EXISTS color (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "color TEXT NOT NULL" +
                ")";
        try (Connection conn = dbConnection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.out.println("Error to create color " + e.getMessage());
            throw new RuntimeException("Error to create color");

        }
    }

    public String insertColor(String value) {
        String sql = "INSERT INTO color (id, color) VALUES (?, ?)";
        UUID id = UUID.randomUUID();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id.toString());
            pstmt.setString(2, value);
            int result = pstmt.executeUpdate();

            if (result < 0) {
                throw new RuntimeException("Error to insert value in color.");
            }

        } catch (SQLException e) {
            System.out.println("Error to insert value in color " + e.getMessage());
            throw new RuntimeException("Error to insert value in color");

        }

        return value;
    }

    public ColorModel updateColor(String id, String value) {
        String sql = "UPDATE color SET color = ? WHERE id = ?";

        ColorModel model = new ColorModel();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, value);
            pstmt.setString(2, id);
            int result = pstmt.executeUpdate();

            model.setId(id);
            model.setColor(value);

            if (result < 0) {
                throw new RuntimeException("Error to update value in color.");
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in color " + e.getMessage());
            throw new RuntimeException("Error to update value in color");

        }
        return model;
    }

    public List<ColorModel> selectColor() {
        String sql = "SELECT * FROM color";

        List<ColorModel> colorList = new ArrayList<>();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                ColorModel model = new ColorModel();
                model.setId(rs.getString("id"));
                model.setColor(rs.getString("color"));
                colorList.add(model);
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in color " + e.getMessage());
            throw new RuntimeException("Error to update value in color");

        }
        return colorList;
    }

    public Boolean deleteColor(String id) {
        String sql = "DELETE FROM color WHERE id = ?";

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException e) {
            System.out.println("Error to update value in color " + e.getMessage());
            throw new RuntimeException("Error to update value in color");
        }
    }
}
