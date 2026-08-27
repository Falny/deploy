package com.admin.admin_back.controllers;

import com.admin.admin_back.dto.GoodsDto;
import com.admin.admin_back.model.Goods;
import com.admin.admin_back.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Controller
@RequestMapping("/cards")
public class GoodController {
    private GoodService service;

    @Autowired
    public GoodController(GoodService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Goods> addGood(@RequestBody GoodsDto goodsDto){
        Goods good = service.addGood(goodsDto);
        return new ResponseEntity<>(good, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Goods>> getGoods(
            @RequestParam(name="category", required = false) String[] category,
            @RequestParam(name="light", required = false) String[] light,
            @RequestParam(name="color", required = false) String[] color,
            @RequestParam(name="format", required = false) String[] format,
            @RequestParam(name="structure", required = false) String[] structure
    ) {
        List<Goods> goods = service.getGoods(category, light, color, format, structure);
        return new ResponseEntity<>(goods, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Goods> getOneGood(@PathVariable String id) {
        Goods goods = service.getOneGoods(id);
        return new ResponseEntity<>(goods, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Goods> updateGood(@PathVariable String id, @RequestBody GoodsDto goodsModel) {
        Goods goods = service.updateGood(id, goodsModel);
        return new ResponseEntity<>(goods, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteGood(@PathVariable String id) {
        service.deleteGoods(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
