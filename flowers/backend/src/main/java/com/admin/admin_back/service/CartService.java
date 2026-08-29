package com.admin.admin_back.service;

import com.admin.admin_back.dao.CartDAO;
import com.admin.admin_back.dao.GoodsDAO;
import com.admin.admin_back.dto.CartDto;
import com.admin.admin_back.model.CartModel;
import com.admin.admin_back.model.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Component
public class CartService {
    private CartDAO db;
    private GoodsDAO dbGood;
    @Value("IMAGE_PATH_FLOWERS")
    private String path;

    @Autowired
    public CartService(CartDAO db, GoodsDAO dbGood) {
        this.db = db;
        this.dbGood = dbGood;
    }

    public CartModel addCart(String id) {
        Goods good = dbGood.selectOneGoods(id);
        CartDto cart = new CartDto();

        String mainImg = good.getMainImg();
        try {
            Path pathMain = Path.of(mainImg);
            if (Files.exists(pathMain)) {
                byte[] bytesImg = Files.readAllBytes(pathMain);
                String img = Base64.getEncoder().encodeToString(bytesImg);
                cart.setMainImg(img);
            }
        } catch (IOException error) {
            System.out.println("Error read mainImg cart");
        }

        cart.setName(good.getName());
        cart.setPrice(good.getPrice());
        cart.setCount(1);

        CartModel cartModel = db.insertCart(cart, id);
        return cartModel;
    }

    public List<CartModel> getCart() {
        List<CartModel> cart = db.getCart();

        for (int i = 0; i < cart.size(); i++) {

            String mainImg = cart.get(i).getMainImg();
            try {
                Path pathMain = Path.of(mainImg);
                if (Files.exists(pathMain)) {
                    byte[] bytesImg = Files.readAllBytes(pathMain);
                    String img = Base64.getEncoder().encodeToString(bytesImg);
                    cart.get(i).setMainImg(img);
                }
            } catch (IOException error) {
                System.out.println("Error read mainImg cart");
            }
        }
        return cart;
    }

    public void deleteItemCart(String id) {
        db.deleteCart(id);
    }

    public void updateCart(String id, int count) {
        db.updateCart(id, count);
    }

}
