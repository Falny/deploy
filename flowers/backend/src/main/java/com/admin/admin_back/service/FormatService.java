package com.admin.admin_back.service;

import com.admin.admin_back.dao.FormatDAO;
import com.admin.admin_back.dto.FormatDto;
import com.admin.admin_back.model.FormatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FormatService {
    private FormatDAO dao;

    public FormatService() {
    }

    @Autowired
    public FormatService(FormatDAO dao) {
        this.dao = dao;
    }

    public String addFormat(FormatDto value) {
        String format = dao.insertFormat(value.getFormat());
        return format;
    }

    public List<FormatModel> getFormat() {
        List<FormatModel> formatList = dao.selectFormat();
        return formatList;
    }

    public void deleteFormat(String id) {
        Boolean result = dao.deleteFormat(id);
        if (!result) throw new RuntimeException("Error delete format");
    }

    public FormatModel updateFormat(String id, FormatDto model) {
        FormatModel format = dao.updateFormat(id, model.getFormat());
        return format;
    }
}
