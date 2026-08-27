package com.admin.admin_back.dto;

public class FormatDto {
    private String format;

    public FormatDto() {
    }

    public FormatDto(String format) {
        this.format = format;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String toString() {
        return "format = " + format;
    }
}
