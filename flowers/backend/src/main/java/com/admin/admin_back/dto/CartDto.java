package com.admin.admin_back.dto;

public class CartDto {
    private String mainImg;
    private String name;
    private int price;
    private int count;

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

    public String getMainImg() {
        return mainImg;
    }

    public String getName() {
        return name;
    }

    public int getCount() {
        return count;
    }

    public int getPrice() {
        return price;
    }
}
