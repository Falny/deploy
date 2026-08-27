package com.admin.admin_back.controllers;

import com.admin.admin_back.model.SortModel;
import com.admin.admin_back.service.SortService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin("*")
@RequestMapping("/sort")
public class SortController {
    private SortService service;

    public SortController(SortService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<SortModel> getSort(){
        SortModel sort = service.getSort();
        return new ResponseEntity<>(sort, HttpStatus.OK);
    }
}
