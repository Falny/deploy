package com.admin.admin_back.model;

import java.util.List;

public class CategoryModel {
    private String id;
    private String category;

    public CategoryModel(String category) {
        this.category = category;
    }

    public CategoryModel() {
    }

    public String getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String toString() {
        return id + " " + category;
    }
}
