package com.admin.admin_back.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;


@Component
public class DBConnection {
    @Value("${DB_URL_FLOWERS}")
    private String url;
    @Value("${DB_USERNAME_FLOWERS}")
    private String username;
    @Value("${DB_PASSWORD_FLOWERS}")
    private String password;

    @PostConstruct
    public Connection connection(){
        try{
            return DriverManager.getConnection(url, username, password);
        } catch(SQLException e) {
            System.out.println("Error to connect to db "+ e);
            throw new RuntimeException("Error to connect to db");
        }
    }


}
