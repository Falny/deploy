package com.admin.admin_back.service;

import com.admin.admin_back.dao.StructureDAO;
import com.admin.admin_back.dto.LightDto;
import com.admin.admin_back.dto.StructureDto;
import com.admin.admin_back.model.FormatModel;
import com.admin.admin_back.model.LightModel;
import com.admin.admin_back.model.StructureModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StructureService {
    private StructureDAO dao;

    public StructureService() {
    }

    @Autowired
    public StructureService(StructureDAO dao) {
        this.dao = dao;
    }

    public String addStructure(StructureDto value) {
        String structure = dao.insertStructure(value.getStructure());
        return structure;
    }

    public List<StructureModel> getStructure() {
        List<StructureModel> structureList = dao.selectStructure();
        return structureList;
    }

    public void deleteStructure(String id) {
        Boolean result = dao.deleteStructure(id);
        if (!result) throw new RuntimeException("Error delete structure");
    }

    public StructureModel updateStructure(String id, StructureDto model) {
        StructureModel structure = dao.updateStructure(id, model.getStructure());
        return structure;
    }
}
