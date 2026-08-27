package com.admin.admin_back.model;

import java.util.List;

public class LightModel {
    private String id;
    private String light;

    public LightModel(String light) {
        this.light = light;
    }

    public LightModel() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getLight() {
        return light;
    }

    public void setLight(String light) {
        this.light = light;
    }
}
