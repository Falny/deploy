package com.admin.admin_back.service;

import com.admin.admin_back.dao.ColorDAO;
import com.admin.admin_back.dto.ColorDto;
import com.admin.admin_back.model.ColorModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ColorService {
    private ColorDAO dao;

    public ColorService() {
    }

    @Autowired
    public ColorService(ColorDAO dao) {
        this.dao = dao;
    }

    public String addColor(ColorDto value) {
        String color = dao.insertColor(value.getColor());
        return color;
    }

    public List<ColorModel> getColor() {
        List<ColorModel> colorList = dao.selectColor();
        return colorList;
    }

    public void deleteColor(String id) {
        Boolean result = dao.deleteColor(id);
        if (!result) throw new RuntimeException("Error delete color");
    }

    public ColorModel updateColor(String id, ColorDto model) {
        ColorModel color = dao.updateColor(id, model.getColor());
        return color;
    }
}
