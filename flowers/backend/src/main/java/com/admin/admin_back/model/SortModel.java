package com.admin.admin_back.model;

import java.util.List;

public class SortModel {
    private List<CategoryModel> category;
    private List<LightModel> light;
    private List<ColorModel> color;
    private List<FormatModel> format;
    private List<StructureModel> structure;

    public void setCategory(List<CategoryModel> category) {
        this.category = category;
    }

    public void setLight(List<LightModel> light) {
        this.light = light;
    }

    public void setColor(List<ColorModel> color) {
        this.color = color;
    }

    public void setFormat(List<FormatModel> format) {
        this.format = format;
    }

    public void setStructure(List<StructureModel> structure) {
        this.structure = structure;
    }

    public List<CategoryModel> getCategory() {
        return category;
    }

    public List<LightModel> getLight() {
        return light;
    }

    public List<ColorModel> getColor() {
        return color;
    }

    public List<FormatModel> getFormat() {
        return format;
    }

    public List<StructureModel> getStructure() {
        return structure;
    }
}
