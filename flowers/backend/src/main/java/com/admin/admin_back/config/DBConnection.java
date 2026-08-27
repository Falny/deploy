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
@PropertySource("db.properties")
public class DBConnection {
    @Value("${db.url}")
    private String url;
    @Value("${db.username}")
    private String username;
    @Value("${db.password}")
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
