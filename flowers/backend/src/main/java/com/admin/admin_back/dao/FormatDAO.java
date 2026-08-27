package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.model.FormatModel;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FormatDAO {
    private DBConnection dbConnection;

    public FormatDAO() {
    }

    @Autowired
    public FormatDAO(DBConnection connection) {
        this.dbConnection = connection;
    }

    @PostConstruct
    public void createFormat() {
        String sql = "CREATE TABLE IF NOT EXISTS format (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "format TEXT NOT NULL" +
                ")";
        try (Connection conn = dbConnection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.out.println("Error to create format " + e.getMessage());
            throw new RuntimeException("Error to create format");

        }
    }

    public String insertFormat(String value) {
        String sql = "INSERT INTO format (id, format) VALUES (?, ?)";
        UUID id = UUID.randomUUID();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id.toString());
            pstmt.setString(2, value);
            int result = pstmt.executeUpdate();

            if (result < 0) {
                throw new RuntimeException("Error to insert value in format.");
            }

        } catch (SQLException e) {
            System.out.println("Error to insert value in format " + e.getMessage());
            throw new RuntimeException("Error to insert value in format");

        }

        return value;
    }

    public FormatModel updateFormat(String id, String value) {
        String sql = "UPDATE format SET format = ? WHERE id = ?";

        FormatModel model = new FormatModel();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, value);
            pstmt.setString(2, id);
            int result = pstmt.executeUpdate();

            model.setId(id);
            model.setFormat(value);

            if (result < 0) {
                throw new RuntimeException("Error to update value in format.");
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in format " + e.getMessage());
            throw new RuntimeException("Error to update value in format");

        }
        return model;
    }

    public List<FormatModel> selectFormat() {
        String sql = "SELECT * FROM format";

        List<FormatModel> formatList = new ArrayList<>();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                FormatModel model = new FormatModel();
                model.setId(rs.getString("id"));
                model.setFormat(rs.getString("format"));
                formatList.add(model);
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in format " + e.getMessage());
            throw new RuntimeException("Error to update value in format");

        }
        return formatList;
    }

    public Boolean deleteFormat(String id) {
        String sql = "DELETE FROM format WHERE id = ?";

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException e) {
            System.out.println("Error to update value in format " + e.getMessage());
            throw new RuntimeException("Error to update value in format");
        }
    }
}
