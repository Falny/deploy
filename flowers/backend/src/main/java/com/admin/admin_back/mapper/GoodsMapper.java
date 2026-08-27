package com.admin.admin_back.mapper;

import com.admin.admin_back.dto.GoodsDto;
import com.admin.admin_back.model.Goods;

public class GoodsMapper {

    public Goods toModel(GoodsDto goodDto, String id) {
        Goods goods = new Goods();
        goods.setId(id);
        goods.setMainImg(goodDto.getMainImg());
        goods.setName(goodDto.getName());
        goods.setPrice(goodDto.getPrice());
        goods.setOldPrice(goodDto.getOldPrice());
        goods.setSale(goodDto.getSale());
        goods.setNewGood(goodDto.getNewGood());
        goods.setImages(goodDto.getImages());
        goods.setStructure(goodDto.getStructure());
        goods.setFormat(goodDto.getFormat());
        goods.setColor(goodDto.getColor());
        goods.setLight(goodDto.getLight());
        goods.setCategory(goodDto.getCategory());
        return goods;
    }
}
