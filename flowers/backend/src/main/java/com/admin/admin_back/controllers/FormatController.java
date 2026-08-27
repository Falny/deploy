package com.admin.admin_back.controllers;

import com.admin.admin_back.dto.ColorDto;
import com.admin.admin_back.dto.FormatDto;
import com.admin.admin_back.model.CategoryModel;
import com.admin.admin_back.model.ColorModel;
import com.admin.admin_back.model.FormatModel;
import com.admin.admin_back.service.FormatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Controller
@RequestMapping("/format")
public class FormatController {
    private FormatService service;


    @Autowired
    public FormatController(FormatService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> postFormat(@RequestBody FormatDto formatDto) {
        String request = service.addFormat(formatDto);
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<FormatModel>> getFormat() {
        List<FormatModel> format = service.getFormat();
        return new ResponseEntity<>(format, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteFormat(@PathVariable String id) {
        service.deleteFormat(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<FormatModel> updateFormat(@PathVariable String id, @RequestBody FormatDto model){
        FormatModel format = service.updateFormat(id, model);
        return new ResponseEntity<>(format, HttpStatus.OK);
    }
}
