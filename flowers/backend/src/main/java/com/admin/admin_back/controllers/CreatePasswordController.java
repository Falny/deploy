package com.admin.admin_back.controllers;

import com.admin.admin_back.model.PasswordModel;
import com.admin.admin_back.service.PasswordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@RequestMapping("create-password")
public class CreatePasswordController {
    private PasswordService service;

    public CreatePasswordController(PasswordService service) {
        this.service = service;
    }


    @PostMapping
    public ResponseEntity insertPassword(@RequestBody PasswordModel model) {
        service.insert(model);
        return new ResponseEntity(HttpStatus.OK);
    }
}
