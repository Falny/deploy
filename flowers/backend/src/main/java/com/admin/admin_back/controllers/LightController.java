package com.admin.admin_back.controllers;

import com.admin.admin_back.dto.CategoryDto;
import com.admin.admin_back.dto.LightDto;
import com.admin.admin_back.model.FormatModel;
import com.admin.admin_back.model.LightModel;
import com.admin.admin_back.service.CategoryService;
import com.admin.admin_back.service.LightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Controller
@RequestMapping("/light")
public class LightController {
    private LightService service;

    @Autowired
    public LightController(LightService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> postLight(@RequestBody LightDto lightDto) {
        String request = service.addLight(lightDto);
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<LightModel>> getLight() {
        List<LightModel> light = service.getLight();
        return new ResponseEntity<>(light, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLight(@PathVariable String id) {
        service.deleteLight(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<LightModel> updateLight(@PathVariable String id, @RequestBody LightDto model){
        LightModel light = service.updateLight(id, model);
        return new ResponseEntity<>(light, HttpStatus.OK);
    }
}
