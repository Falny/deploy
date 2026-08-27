package com.admin.admin_back.controllers;

import com.admin.admin_back.dto.CartDto;
import com.admin.admin_back.model.CartModel;
import com.admin.admin_back.model.Goods;
import com.admin.admin_back.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartController {
    private CartService service;

    @Autowired
    public CartController(CartService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CartModel> addItemCart(@RequestBody Map<String, String> idJson){
        String id = idJson.get("id");
        CartModel cartItem = service.addCart(id);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CartModel>> getCart(){
        List<CartModel> cart = service.getCart();
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItemCart(@PathVariable String id){
        service.deleteItemCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity updateItemCart(@PathVariable Map<String, String> idJson, @RequestBody Map<String, Integer> countJson){
        String id = idJson.get("id");
        int count = countJson.get("count");
        service.updateCart(id, count);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
