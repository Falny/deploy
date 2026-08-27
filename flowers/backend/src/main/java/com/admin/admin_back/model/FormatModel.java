package com.admin.admin_back.model;

import java.util.List;

public class FormatModel {
    private String id;
    private String format;

    public FormatModel(String format) {
        this.format = format;
    }

    public FormatModel() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }
}
