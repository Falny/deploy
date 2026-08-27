package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.dto.CartDto;
import com.admin.admin_back.mapper.CartMapper;
import com.admin.admin_back.model.CartModel;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class CartDAO {
    private DBConnection connection;

    public CartDAO(DBConnection connection) {
        this.connection = connection;
    }

    @PostConstruct
    public void createCart() {
        String sql = "CREATE TABLE IF NOT EXISTS cart (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "idGood VARCHAR(50) NOT NULL," +
                "mainImg TEXT NOT NULL," +
                "name VARCHAR(50) NOT NULL," +
                "price INTEGER NOT NULL," +
                "count INTEGER NOT NULL" +
                ")";

        try (Connection conn = connection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException error) {
            System.out.println("Error create cart " + error.getMessage());
        }
    }

    public CartModel insertCart(CartDto model, String idGood) {
        String sql = "INSERT INTO cart (id, idGood, mainImg, name, price, count) VALUES (?, ?, ?, ?, ?, ?)";
        CartModel cart = new CartModel();
        String id = UUID.randomUUID().toString();

        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            pstmt.setString(2, idGood);
            pstmt.setString(3, model.getMainImg());
            pstmt.setString(4, model.getName());
            pstmt.setInt(5, model.getPrice());
            pstmt.setInt(6, model.getCount());
            pstmt.executeUpdate();


            cart = new CartMapper().mapperCart(model, id, idGood);


        }catch (SQLException error) {
            System.out.println("Error insert cart " + error.getMessage());
        }
        return cart;
    }

    public List<CartModel> getCart() {
        String sql = "SELECT * FROM cart";

        List<CartModel> cartList = new ArrayList<>();

        try(Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                CartModel cart = new CartModel();
                cart.setId(rs.getString("id"));
                cart.setIdGood(rs.getString("idGood"));
                cart.setMainImg(rs.getString("mainImg"));
                cart.setName(rs.getString("name"));
                cart.setPrice(rs.getInt("price"));
                cart.setCount(rs.getInt("count"));

                cartList.add(cart);
            }
        }catch (SQLException error) {
            System.out.println("Error select cart " + error.getMessage());
        }

        return cartList;
    }

    public void deleteCart(String id) {
        String sql = "DELETE FROM cart WHERE id = ?";
        try(Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            pstmt.executeUpdate();
        }catch (SQLException error) {
            System.out.println("Error delete cart " + error.getMessage());
        }
    }

    public CartModel updateCart(String id, int count) {
        String sql = "UPDATE cart SET count = ? WHERE id = ?";

        CartModel cart = new CartModel();

        try(Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, count);
            pstmt.setString(2, id);
            pstmt.executeUpdate();
        }catch (SQLException error) {
            System.out.println("Error update cart " + error.getMessage());
        }

        return cart;
    }
}
