package com.admin.admin_back.service;

import com.admin.admin_back.dao.LightDAO;
import com.admin.admin_back.dto.FormatDto;
import com.admin.admin_back.dto.LightDto;
import com.admin.admin_back.model.FormatModel;
import com.admin.admin_back.model.LightModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LightService {
    private LightDAO dao;

    public LightService() {
    }

    @Autowired
    public LightService(LightDAO dao) {
        this.dao = dao;
    }

    public String addLight(LightDto value) {
        String light = dao.insertLight(value.getLight());
        return light;
    }

    public List<LightModel> getLight() {
        List<LightModel> lightList = dao.selectLight();
        return lightList;
    }

    public void deleteLight(String id) {
        Boolean result = dao.deleteLight(id);
        if (!result) throw new RuntimeException("Error delete light");
    }

    public LightModel updateLight(String id, LightDto model) {
        LightModel light = dao.updateLight(id, model.getLight());
        return light;
    }
}
