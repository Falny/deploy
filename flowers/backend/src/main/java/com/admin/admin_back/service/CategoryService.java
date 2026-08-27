package com.admin.admin_back.service;

import com.admin.admin_back.dao.CategoryDAO;
import com.admin.admin_back.dto.CategoryDto;
import com.admin.admin_back.model.CategoryModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryService {
    private CategoryDAO categoryDao;

    @Autowired
    public CategoryService(CategoryDAO categoryDao) {
        this.categoryDao = categoryDao;
    }

    public String addCategory(String value) {
        String category = categoryDao.insertCategory(value);
        return category;
    }

    public List<CategoryModel> getCategory() {
        List<CategoryModel> categoryList = categoryDao.selectCategory();
        return categoryList;
    }

    public void deleteCategory(String id){
        Boolean result = categoryDao.deleteCategory(id);
        if (!result) throw new RuntimeException("Error delete category");
    }

    public CategoryModel updateCategory(String id, CategoryDto category) {
        CategoryModel model = categoryDao.updateCategory(id, category.getCategory());
        return model;
    }
}
