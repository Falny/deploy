package com.admin.admin_back.mapper;

import com.admin.admin_back.dto.CartDto;
import com.admin.admin_back.model.CartModel;

public class CartMapper {
    public CartModel mapperCart(CartDto model, String id, String idGood){
        CartModel cart = new CartModel();
            cart.setId(id);
            cart.setIdGood(idGood);
            cart.setMainImg(model.getMainImg());
            cart.setName(model.getName());
            cart.setPrice(model.getPrice());
            cart.setCount(model.getCount());

        return cart;
    }
}
