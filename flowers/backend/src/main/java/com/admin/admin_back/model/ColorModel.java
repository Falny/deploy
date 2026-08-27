package com.admin.admin_back.model;

import java.util.List;

public class ColorModel {
    private String id;
    private String color;

    public ColorModel() {
    }

    public ColorModel(String color) {
        this.color = color;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
