package com.admin.admin_back.controllers;

import com.admin.admin_back.dto.StructureDto;
import com.admin.admin_back.model.LightModel;
import com.admin.admin_back.model.StructureModel;
import com.admin.admin_back.service.StructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Controller
@RequestMapping("/structure")
public class StructureController {
    private StructureService service;

    @Autowired
    public StructureController(StructureService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> postStructure(@RequestBody StructureDto structureDto) {
        String request = service.addStructure(structureDto);
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<StructureModel>> getStructure() {
        List<StructureModel> structure = service.getStructure();
        return new ResponseEntity<>(structure, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteStructure(@PathVariable String id) {
        service.deleteStructure(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StructureModel> updateStructure(@PathVariable String id, @RequestBody StructureDto model){
        StructureModel structure = service.updateStructure(id, model);
        return new ResponseEntity<>(structure, HttpStatus.OK);
    }

}
