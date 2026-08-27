package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.model.CategoryModel;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class CategoryDAO {
    private DBConnection dbConnection;

    public CategoryDAO() {
    }

    @Autowired
    public CategoryDAO(DBConnection connection) {
        this.dbConnection = connection;
    }

    @PostConstruct
    public void createCategory() {
        String sql = "CREATE TABLE IF NOT EXISTS category (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "category TEXT NOT NULL" +
                ")";
        try (Connection conn = dbConnection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.out.println("Error to create category " + e.getMessage());
            throw new RuntimeException("Error to create category");

        }
    }

    public String insertCategory(String value) {
        String sql = "INSERT INTO category (id, category) VALUES (?, ?)";
        UUID id = UUID.randomUUID();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id.toString());
            pstmt.setString(2, value);
            int result = pstmt.executeUpdate();

            if (result < 0) {
                throw new RuntimeException("Error to insert value in category.");
            }

        } catch (SQLException e) {
            System.out.println("Error to insert value in category " + e.getMessage());
            throw new RuntimeException("Error to insert value in category");

        }

        return value;
    }

    public CategoryModel updateCategory(String id, String value) {
        String sql = "UPDATE category SET category = ? WHERE id = ?";

        CategoryModel model = new CategoryModel();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, value);
            pstmt.setString(2, id);
            int result = pstmt.executeUpdate();

            model.setId(id);
            model.setCategory(value);

            if (result < 0) {
                throw new RuntimeException("Error to update value in category.");
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in category " + e.getMessage());
            throw new RuntimeException("Error to update value in category");

        }
        return model;
    }

    public List<CategoryModel> selectCategory() {
        String sql = "SELECT * FROM category";

        List<CategoryModel> categoryList = new ArrayList<>();

        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                CategoryModel model = new CategoryModel();
                model.setId(rs.getString("id"));
                model.setCategory(rs.getString("category"));
                categoryList.add(model);
            }

        } catch (SQLException e) {
            System.out.println("Error to update value in category " + e.getMessage());
            throw new RuntimeException("Error to update value in category");

        }
        return categoryList;
    }

    public Boolean deleteCategory(String id) {
        String sql = "DELETE FROM category WHERE id = ?";
        try (Connection conn = dbConnection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            int result = pstmt.executeUpdate();

            return result > 0;

        } catch (SQLException e) {
            System.out.println("Error to delete value in category " + e.getMessage());
            throw new RuntimeException("Error to delete value in category");
        }
    }
}
