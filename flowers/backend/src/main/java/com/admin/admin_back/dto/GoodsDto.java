package com.admin.admin_back.dto;

import java.util.List;

public class GoodsDto {
    private String mainImg;
    private String name;
    private int price;
    private int oldPrice;
    private Boolean sale;
    private Boolean newGood;
    private List<String> images;
    private List<String> structure;
    private List<String> format;
    private List<String> color;
    private List<String> light;
    private List<String> category;


    public GoodsDto() {
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

    public void setOldPrice(int oldPrice) {
        this.oldPrice = oldPrice;
    }

    public void setSale(Boolean sale) {
        this.sale = sale;
    }

    public void setNewGood(Boolean newGood) {
        this.newGood = newGood;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public void setStructure(List<String> structure) {
        this.structure = structure;
    }

    public void setFormat(List<String> format) {
        this.format = format;
    }

    public void setColor(List<String> color) {
        this.color = color;
    }

    public void setLight(List<String> light) {
        this.light = light;
    }

    public void setCategory(List<String> category) {
        this.category = category;
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

    public int getOldPrice() {
        return oldPrice;
    }

    public Boolean getSale() {
        return sale;
    }

    public Boolean getNewGood() {
        return newGood;
    }

    public List<String> getImages() {
        return images;
    }

    public List<String> getStructure() {
        return structure;
    }

    public List<String> getFormat() {
        return format;
    }

    public List<String> getColor() {
        return color;
    }

    public List<String> getLight() {
        return light;
    }

    public List<String> getCategory() {
        return category;
    }

    public String toString(){
        return name + " " + price + "; structure" + structure;
    }
}
