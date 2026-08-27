package com.admin.admin_back.dao;

import com.admin.admin_back.config.DBConnection;
import com.admin.admin_back.dto.GoodsDto;
import com.admin.admin_back.mapper.GoodsMapper;
import com.admin.admin_back.model.Goods;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class GoodsDAO {
    private DBConnection connection;

    public GoodsDAO() {
    }

    @Autowired
    public GoodsDAO(DBConnection connection) {
        this.connection = connection;
    }

    @PostConstruct
    public void createGoods() {
        String sql = "CREATE TABLE IF NOT EXISTS goods (" +
                "id VARCHAR(50) PRIMARY KEY," +
                "mainImg TEXT NOT NULL," +
                "name VARCHAR(50) NOT NULL," +
                "price INTEGER NOT NULL," +
                "oldPrice INTEGER NULL," +
                "sale BOOLEAN DEFAULT false," +
                "newGood BOOLEAN DEFAULT false," +
                "images TEXT[] NOT NULL," +
                "structure TEXT[] NULL," +
                "format TEXT[] NULL," +
                "color TEXT[] NULL," +
                "light TEXT[] NULL," +
                "category TEXT[] NULL" +
                ")";
        try (Connection conn = connection.connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            System.out.println("Error to create db goods " + e.getMessage());
            throw new RuntimeException("Error to create db goods");
        }
    }

    public Goods insertGoods(GoodsDto goods, String id) {
        String sql = "INSERT INTO goods (id, mainImg, name, price, oldPrice, sale, newGood, images, structure, format, color, light, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        Goods newGoods = new Goods();

        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            List<String> imagesList = goods.getImages();
            String[] imagesSimpleList = imagesList.toArray(new String[0]);
            Array images = conn.createArrayOf("text", imagesSimpleList);

            List<String> structureList = goods.getStructure();
            String[] structureSimpleList = structureList.toArray(new String[0]);
            Array structure = conn.createArrayOf("text", structureSimpleList);

            List<String> formatList = goods.getFormat();
            String[] formatSimpleList = formatList.toArray(new String[0]);
            Array format = conn.createArrayOf("text", formatSimpleList);

            List<String> colorList = goods.getColor();
            String[] colorSimpleList = colorList.toArray(new String[0]);
            Array color = conn.createArrayOf("text", colorSimpleList);

            List<String> lightList = goods.getLight();
            String[] lightSimpleList = lightList.toArray(new String[0]);
            Array light = conn.createArrayOf("text", lightSimpleList);

            List<String> categoryList = goods.getCategory();
            String[] categorySimpleList = categoryList.toArray(new String[0]);
            Array category = conn.createArrayOf("text", categorySimpleList);


            pstmt.setString(1, id);
            pstmt.setString(2, goods.getMainImg());
            pstmt.setString(3, goods.getName());
            pstmt.setInt(4, goods.getPrice());
            pstmt.setInt(5, goods.getOldPrice());
            pstmt.setBoolean(6, goods.getSale());
            pstmt.setBoolean(7, goods.getNewGood());
            pstmt.setArray(8, images);
            pstmt.setArray(9, structure);
            pstmt.setArray(10, format);
            pstmt.setArray(11, color);
            pstmt.setArray(12, light);
            pstmt.setArray(13, category);

            int result = pstmt.executeUpdate();

            if (result < 0) throw new RuntimeException("Error to insert goods.");

            GoodsMapper goodsMapper = new GoodsMapper();
            newGoods = goodsMapper.toModel(goods, id.toString());


        } catch (SQLException e) {
            System.out.println("Error to insert goods " + e.getMessage());
            throw new RuntimeException("Error to insert goods");
        }

        return newGoods;
    }

    public List<Goods> selectAllGoods(String[] categoryParam, String[] lightParam, String[] colorParam, String[] formatParam, String[] structureParam) {
        StringBuilder sql = new StringBuilder("SELECT * FROM goods WHERE 1=1");

        if (categoryParam != null && categoryParam.length > 0) {
            sql.append(" AND category && ARRAY[?]");
        }
        if (lightParam != null && lightParam.length > 0) {
            sql.append(" AND light && ARRAY[?]");
        }
        if (colorParam != null && colorParam.length > 0) {
            sql.append(" AND color && ARRAY[?]");
        }
        if (formatParam != null && formatParam.length > 0) {
            sql.append(" AND format && ARRAY[?]");
        }
        if (structureParam != null && structureParam.length > 0) {
            sql.append(" AND structure && ARRAY[?]");
        }

        List<Goods> goodsList = new ArrayList<>();

        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {

           int index = 1;

            if (categoryParam != null && categoryParam.length > 0) {
                Array categorySqlArray = conn.createArrayOf("text", categoryParam);
                pstmt.setArray(index++, categorySqlArray);
            }

            if (lightParam != null && lightParam.length > 0) {
                Array lightSqlArray = conn.createArrayOf("text", lightParam);
                pstmt.setArray(index++, lightSqlArray);
            }

            if (colorParam != null && colorParam.length > 0) {
                Array colorSqlArray = conn.createArrayOf("text", colorParam);
                pstmt.setArray(index++, colorSqlArray);
            }

            if (formatParam != null && formatParam.length > 0) {
                Array formatSqlArray = conn.createArrayOf("text", formatParam);
               pstmt.setArray(index++, formatSqlArray);
            }

            if (structureParam != null && structureParam.length > 0) {
                Array structureSqlArray = conn.createArrayOf("text", structureParam);
                pstmt.setArray(index++, structureSqlArray);
            }

            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                Goods goods = new Goods();
                goods.setId(rs.getString("id"));
                goods.setMainImg(rs.getString("mainImg"));
                goods.setName(rs.getString("name"));
                goods.setPrice(rs.getInt("price"));
                goods.setOldPrice(rs.getInt("oldPrice"));
                goods.setSale(rs.getBoolean("sale"));
                goods.setNewGood(rs.getBoolean("newGood"));
                Array images = rs.getArray("images");
                Array structure = rs.getArray("structure");
                Array format = rs.getArray("format");
                Array color = rs.getArray("color");
                Array light = rs.getArray("light");
                Array category = rs.getArray("category");

                if (images == null) {
                    List<String> imagesList = new ArrayList<>();
                    goods.setImages(imagesList);
                } else {
                    String[] imagesSimpleList = (String[]) images.getArray();
                    List<String> imagesList = Arrays.asList(imagesSimpleList);
                    goods.setImages(imagesList);
                }

                if (structure == null) {
                    List<String> structureList = new ArrayList<>();
                    goods.setStructure(structureList);
                } else {
                    String[] structureSimpleList = (String[]) structure.getArray();
                    List<String> structureList = Arrays.asList(structureSimpleList);
                    goods.setStructure(structureList);
                }

                if (format == null) {
                    List<String> formatList = new ArrayList<>();
                    goods.setFormat(formatList);
                } else {
                    String[] formatSimpleList = (String[]) format.getArray();
                    List<String> formatList = Arrays.asList(formatSimpleList);
                    goods.setFormat(formatList);
                }

                if (color == null) {
                    List<String> colorList = new ArrayList<>();
                    goods.setColor(colorList);
                } else {
                    String[] colorSimpleList = (String[]) color.getArray();
                    List<String> colorList = Arrays.asList(colorSimpleList);
                    goods.setColor(colorList);
                }

                if (light == null) {
                    List<String> lightList = new ArrayList<>();
                    goods.setLight(lightList);
                } else {
                    String[] lightSimpleList = (String[]) light.getArray();
                    List<String> lightList = Arrays.asList(lightSimpleList);
                    goods.setLight(lightList);
                }

                if (category == null) {
                    List<String> categoryList = new ArrayList<>();
                    goods.setCategory(categoryList);
                } else {
                    String[] categorySimpleList = (String[]) category.getArray();
                    List<String> categoryList = Arrays.asList(categorySimpleList);
                    goods.setCategory(categoryList);
                }

                goodsList.add(goods);

            }

        } catch (SQLException e) {
            System.out.println("Error select goods " + e.getMessage());
            throw new RuntimeException("Error select goods");
        }
        return goodsList;
    }

    public Goods selectOneGoods(String id) {
        String sql = "SELECT * FROM goods WHERE id = ?";
        String sqlCart = "SELECT * FROM cart WHERE idGood = ?";

        Goods goods = new Goods();

        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql); PreparedStatement pstmt1 = conn.prepareStatement(sqlCart)) {
            pstmt.setString(1, id);
            pstmt1.setString(1, id);
            ResultSet rs = pstmt.executeQuery();
            ResultSet rs1 = pstmt1.executeQuery();

            while (rs1.next()) {
                goods.setCount(rs1.getInt("count"));
            }

            while (rs.next()) {

                goods.setId(rs.getString("id"));
                goods.setMainImg(rs.getString("mainImg"));
                goods.setName(rs.getString("name"));
                goods.setPrice(rs.getInt("price"));
                goods.setOldPrice(rs.getInt("oldPrice"));
                goods.setSale(rs.getBoolean("sale"));
                goods.setNewGood(rs.getBoolean("newGood"));
                Array images = rs.getArray("images");
                Array structure = rs.getArray("structure");
                Array format = rs.getArray("format");
                Array color = rs.getArray("color");
                Array light = rs.getArray("light");
                Array category = rs.getArray("category");

                if (images == null) {
                    List<String> imagesList = new ArrayList<>();
                    goods.setImages(imagesList);
                } else {
                    String[] imagesSimpleList = (String[]) images.getArray();
                    List<String> imagesList = Arrays.asList(imagesSimpleList);
                    goods.setImages(imagesList);
                }

                if (structure == null) {
                    List<String> structureList = new ArrayList<>();
                    goods.setStructure(structureList);
                } else {
                    String[] structureSimpleList = (String[]) structure.getArray();
                    List<String> structureList = Arrays.asList(structureSimpleList);
                    goods.setStructure(structureList);
                }

                if (format == null) {
                    List<String> formatList = new ArrayList<>();
                    goods.setFormat(formatList);
                } else {
                    String[] formatSimpleList = (String[]) format.getArray();
                    List<String> formatList = Arrays.asList(formatSimpleList);
                    goods.setFormat(formatList);
                }

                if (color == null) {
                    List<String> colorList = new ArrayList<>();
                    goods.setColor(colorList);
                } else {
                    String[] colorSimpleList = (String[]) color.getArray();
                    List<String> colorList = Arrays.asList(colorSimpleList);
                    goods.setColor(colorList);
                }

                if (light == null) {
                    List<String> lightList = new ArrayList<>();
                    goods.setLight(lightList);
                } else {
                    String[] lightSimpleList = (String[]) light.getArray();
                    List<String> lightList = Arrays.asList(lightSimpleList);
                    goods.setLight(lightList);
                }
                if (category == null) {
                    List<String> categoryList = new ArrayList<>();
                    goods.setCategory(categoryList);
                } else {
                    String[] categorySimpleList = (String[]) category.getArray();
                    List<String> categoryList = Arrays.asList(categorySimpleList);
                    goods.setCategory(categoryList);
                }
            }

        } catch (SQLException e) {
            System.out.println("Error select goods " + e.getMessage());
            throw new RuntimeException("Error select goods");
        }
        return goods;
    }

    public Boolean deleteGoods(String id) {
        String sql = "DELETE FROM goods WHERE id = ?";
        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, id);
            int result = pstmt.executeUpdate();
            return result > 0;

        } catch (SQLException e) {
            System.out.println("Error to delete goods " + e.getMessage());
            throw new RuntimeException("Error to delete goods");
        }
    }

    public Goods updateGoods(String id, GoodsDto goodsModel) {
        String sql = "UPDATE goods SET mainImg=?, name = ?, price = ?, oldPrice = ?, sale = ?, newGood = ?, structure = ?, format = ?, color = ?, light = ?, category = ?, images = ? WHERE id = ?";

        Goods goods = new Goods();

        try (Connection conn = connection.connection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {

            String[] imagesList = goodsModel.getImages().toArray(new String[0]);
            Array images = conn.createArrayOf("text", imagesList);

            String[] structureList = goodsModel.getStructure().toArray(new String[0]);
            Array structure = conn.createArrayOf("text", structureList);

            String[] formatList = goodsModel.getFormat().toArray(new String[0]);
            Array format = conn.createArrayOf("text", formatList);

            String[] colorList = goodsModel.getColor().toArray(new String[0]);
            Array color = conn.createArrayOf("text", colorList);

            String[] lightList = goodsModel.getLight().toArray(new String[0]);
            Array light = conn.createArrayOf("text", lightList);

            String[] categoryList = goodsModel.getCategory().toArray(new String[0]);
            Array category = conn.createArrayOf("text", categoryList);

            pstmt.setString(1, goodsModel.getMainImg());
            pstmt.setString(2, goodsModel.getName());
            pstmt.setInt(3, goodsModel.getPrice());
            pstmt.setInt(4, goodsModel.getOldPrice());
            pstmt.setBoolean(5, goodsModel.getSale());
            pstmt.setBoolean(6, goodsModel.getNewGood());
            pstmt.setArray(7, structure);
            pstmt.setArray(8, format);
            pstmt.setArray(9, color);
            pstmt.setArray(10, light);
            pstmt.setArray(11, category);
            pstmt.setArray(12, images);
            pstmt.setString(13, id);

            pstmt.executeUpdate();

            GoodsMapper GoodsMapper = new GoodsMapper();
            goods = GoodsMapper.toModel(goodsModel, id);

        } catch (SQLException e) {
            System.out.println("Error to update goods " + e.getMessage());
            throw new RuntimeException("Error to update goods");
        }

        return goods;
    }
}
