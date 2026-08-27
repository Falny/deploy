package com.admin.admin_back.controllers;

import com.admin.admin_back.dto.CategoryDto;
import com.admin.admin_back.model.CategoryModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.admin.admin_back.service.CategoryService;

import java.util.List;

@CrossOrigin("*")
@Controller
@RequestMapping("/category")
public class CategoryControllers {
    private CategoryService service;


    @Autowired
    public CategoryControllers(CategoryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> postCategory(@RequestBody CategoryDto value) {
        String request = service.addCategory(value.getCategory());
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CategoryModel>> getCategory() {
        List<CategoryModel> category = service.getCategory();
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCategory(@PathVariable String id) {
        service.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CategoryModel> updateCategory(@PathVariable String id, @RequestBody CategoryDto model) {
        CategoryModel category = service.updateCategory(id, model);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
}
