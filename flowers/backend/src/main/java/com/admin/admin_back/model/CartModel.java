package com.admin.admin_back.model;

public class CartModel {
    private String id;
    private String idGood;
    private String mainImg;
    private String name;
    private int price;
    private int count;

    public void setIdGood(String idGood) {
        this.idGood = idGood;
    }

    public String getIdGood() {
        return idGood;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setMainImg(String mainImg) {
        this.mainImg = mainImg;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getId() {
        return id;
    }

    public String getMainImg() {
        return mainImg;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getCount() {
        return count;
    }

    public String toString() {
        return mainImg + " " + name + " " + price + " " + count;
    }
}
