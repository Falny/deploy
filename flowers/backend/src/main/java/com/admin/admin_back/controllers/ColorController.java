package com.admin.admin_back.controllers;

import com.admin.admin_back.dto.ColorDto;
import com.admin.admin_back.model.ColorModel;
import com.admin.admin_back.model.FormatModel;
import com.admin.admin_back.service.ColorService;
import com.admin.admin_back.service.FormatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Controller
@RequestMapping("/color")
public class ColorController {
    private ColorService service;

    @Autowired
    public ColorController(ColorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> postColor(@RequestBody ColorDto colorDto) {
        String request = service.addColor(colorDto);
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ColorModel>> getColor() {
        List<ColorModel> color = service.getColor();
        return new ResponseEntity<>(color, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteColor(@PathVariable String id) {
        service.deleteColor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ColorModel> updateColor(@PathVariable String id, @RequestBody ColorDto model){
        ColorModel color = service.updateColor(id, model);
        return new ResponseEntity<>(color, HttpStatus.OK);
    }


}
