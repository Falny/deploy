package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.model.StructureModel;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class StructureDAO {
    private DBConnection dbConnection;

    public StructureDAO() {
    }

    @Autowired
    public StructureDAO(DBConnection connection) {
        this.dbConnection = connection;
    }

    @PostConstruct
    public void createStructure() {
        String sql = "CREATE TABLE IF NOT EXISTS structure (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "structure TEXT NOT NULL" +
                ")";
        try (Connection conn = dbConnection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.out.println("Error to create structure " + e.getMessage());
            throw new RuntimeException("Error to create structure");

        }
    }

    public String insertStructure(String value) {
        String sql = "INSERT INTO structure (id, structure) VALUES (?, ?)";
        UUID id = UUID.randomUUID();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id.toString());
            pstmt.setString(2, value);
            int result = pstmt.executeUpdate();

            if (result < 0) {
                throw new RuntimeException("Error to insert value in structure.");
            }

        } catch (SQLException e) {
            System.out.println("Error to insert value in structure " + e.getMessage());
            throw new RuntimeException("Error to insert value in structure");

        }

        return value;
    }

    public StructureModel updateStructure(String id, String value) {
        String sql = "UPDATE structure SET structure = ? WHERE id = ?";

        StructureModel model = new StructureModel();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, value);
            pstmt.setString(2, id);
            int result = pstmt.executeUpdate();

            model.setId(id);
            model.setStructure(value);

            if (result < 0) {
                throw new RuntimeException("Error to update value in structure.");
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in structure " + e.getMessage());
            throw new RuntimeException("Error to update value in structure");

        }
        return model;
    }

    public List<StructureModel> selectStructure() {
        String sql = "SELECT * FROM structure";

        List<StructureModel> structureList = new ArrayList<>();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                StructureModel model = new StructureModel();
                model.setId(rs.getString("id"));
                model.setStructure(rs.getString("structure"));
                structureList.add(model);
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in structure " + e.getMessage());
            throw new RuntimeException("Error to update value in structure");

        }
        return structureList;
    }

    public Boolean deleteStructure(String id) {
        String sql = "DELETE FROM structure WHERE id = ?";

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException e) {
            System.out.println("Error to update value in structure " + e.getMessage());
            throw new RuntimeException("Error to update value in structure");
        }
    }
}
