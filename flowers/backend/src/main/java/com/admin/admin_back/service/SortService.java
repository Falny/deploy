package com.admin.admin_back.service;

import com.admin.admin_back.dao.*;
import com.admin.admin_back.model.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SortService {
    private CategoryDAO categoryDao;
    private LightDAO lightDao;
    private ColorDAO colorDao;
    private FormatDAO formatDao;
    private StructureDAO structureDao;

    public SortService(CategoryDAO categoryDao, LightDAO lightDao, ColorDAO colorDao, FormatDAO formatDao, StructureDAO structureDao) {
        this.categoryDao = categoryDao;
        this.lightDao = lightDao;
        this.colorDao = colorDao;
        this.formatDao = formatDao;
        this.structureDao = structureDao;
    }

    public SortModel getSort() {
        SortModel sortModel = new SortModel();

        List<CategoryModel> category = categoryDao.selectCategory();
        sortModel.setCategory(category);

        List<LightModel> light = lightDao.selectLight();
        sortModel.setLight(light);

        List<ColorModel> color = colorDao.selectColor();
        sortModel.setColor(color);

        List<FormatModel> format = formatDao.selectFormat();
        sortModel.setFormat(format);

        List<StructureModel> structure = structureDao.selectStructure();
        sortModel.setStructure(structure);

        return sortModel;
    }
}
