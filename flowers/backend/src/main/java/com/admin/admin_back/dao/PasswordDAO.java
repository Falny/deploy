package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.model.PasswordModel;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.UUID;

@Component
public class PasswordDAO {
    private DBConnection connection;

    public PasswordDAO() {}

    @Autowired
    public PasswordDAO(DBConnection connection) {
        this.connection = connection;
    }

    @PostConstruct
    public void createTable() {
        String sql = "CREATE TABLE IF NOT EXISTS admin (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "password TEXT" +
                ")";

        try(Connection conn = connection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException error) {
            System.out.println("Error create table " + error.getMessage());
        }
    }

    public void insertPassword(String password) {
        String sql = "INSERT INTO admin (id, password) VALUES (?, ?)";
        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            String uuid = UUID.randomUUID().toString();
            pstmt.setString(1, uuid);
            pstmt.setString(2, password);
            pstmt.executeUpdate();
        } catch (SQLException error) {
            System.out.println("Error to insert admin " + error.getMessage());
        }
    }

    public PasswordModel selectPassword(){
        String sql = "SELECT * FROM admin";
        PasswordModel passwordModel = new PasswordModel();

        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                passwordModel.setPassword(rs.getString("password"));
            }


        } catch (SQLException error) {
            System.out.println("Error to select admin");
        }
        return passwordModel;
    }
}
