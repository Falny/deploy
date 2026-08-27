package com.admin.admin_back.controllers;

import com.admin.admin_back.model.PasswordModel;
import com.admin.admin_back.service.PasswordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@RequestMapping("/password")
public class PasswordController {
    private PasswordService service;

    public PasswordController(PasswordService service) {
        this.service = service;
    }


    @PostMapping
    public ResponseEntity<Boolean> checkPassword(@RequestBody PasswordModel model){
        Boolean result = service.checkPassword(model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

