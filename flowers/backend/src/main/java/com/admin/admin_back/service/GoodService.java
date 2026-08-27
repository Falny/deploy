package com.admin.admin_back.service;

import com.admin.admin_back.dao.GoodsDAO;
import com.admin.admin_back.dto.GoodsDto;
import com.admin.admin_back.model.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Component
@PropertySource("path-img.properties")
public class GoodService {
    private GoodsDAO goodsDB;
    @Value("${upload.path}")
    private String path;
    @Value("${upload.pathMainImg}")
    private String pathMainImg;

    public GoodService() {
    }

    @Autowired
    public GoodService(GoodsDAO goodsDB) {
        this.goodsDB = goodsDB;
    }

    public Goods addGood(GoodsDto goodsDto) {
        String id = UUID.randomUUID().toString();

        String mainImgBase64 = goodsDto.getMainImg();
        List<String> imagesList = goodsDto.getImages();

        try {
            if (mainImgBase64 != null && mainImgBase64.length() > 0) {
                String idImg = UUID.randomUUID().toString();
                String splitImgMain = mainImgBase64.split("base64,")[1];
                byte[] base64Convert = Base64.getDecoder().decode(splitImgMain);
                String nameImgMain = System.currentTimeMillis() + "_" + idImg;

                Path pathImgMain = Paths.get(pathMainImg, id);
                Path dir = pathImgMain.resolve(nameImgMain);

                if (Files.exists(dir)) {
                    Files.write(dir, base64Convert);
                } else {
                    Files.createDirectories(pathImgMain);
                    Files.write(dir, base64Convert);
                }

                goodsDto.setMainImg(dir.toString());
            }

            if (imagesList != null && imagesList.size() > 0) {
                List<String> imgPathList = new ArrayList<>();
                for (int i = 0; i < imagesList.size(); i++) {
                    String idImg = UUID.randomUUID().toString();
                    String nameImg = System.currentTimeMillis() + "_" + idImg;
                    String splitBase = imagesList.get(i).split("base64,")[1];
                    byte[] imgConvert = Base64.getDecoder().decode(splitBase);
                    Path pathImg = Paths.get(path, id);
                    Path dir = pathImg.resolve(nameImg);

                    if (Files.exists(dir)) {
                        Files.write(dir, imgConvert);
                    } else {
                        Files.createDirectories(pathImg);
                        Files.write(dir, imgConvert);
                    }
                    imgPathList.add(dir.toString());
                }
                goodsDto.setImages(imgPathList);
            }


        } catch (IOException e) {
            System.out.println("Error file read " + e.getMessage());
            throw new RuntimeException("Error file read");
        }

        Goods goods = goodsDB.insertGoods(goodsDto, id);

        if (goods.getId() == null) {
            throw new RuntimeException("Error service goods");
        }

        return goods;

    }

    public List<Goods> getGoods(String[] category, String[] light, String[] color, String[] format, String[] structure) {


        List<Goods> goods = goodsDB.selectAllGoods(category, light, color, format, structure);

        if (goods.size() > 0) {
            for (Goods item : goods) {
                Path mainImgPath = Path.of(item.getMainImg());
                List<String> imagesPathList = item.getImages();
                List<String> newImages = new ArrayList<>();

                try {
                    if (Files.exists(mainImgPath)) {
                        byte[] file = Files.readAllBytes(mainImgPath);
                        String imgMain = Base64.getEncoder().encodeToString(file);
                        item.setMainImg(imgMain);
                    }

                    for (int i = 0; i < imagesPathList.size(); i++) {
                        Path imagePath = Path.of(imagesPathList.get(i));

                        if (Files.exists(imagePath)) {
                            byte[] file = Files.readAllBytes(imagePath);
                            String images = Base64.getEncoder().encodeToString(file);
                            newImages.add(images);
                        }
                    }
                    item.setImages(newImages);

                } catch (IOException e) {
                    System.out.println("Error get path mainImg " + e.getMessage());
                    throw new RuntimeException("Error get path mainImg");
                }

            }
        }
        return goods;
    }

    public Goods getOneGoods(String id) {
        Goods goods = goodsDB.selectOneGoods(id);

        Path mainImgPath = Path.of(goods.getMainImg());
        List<String> imagesPathList = goods.getImages();
        List<String> newImages = new ArrayList<>();

        try {
            if (Files.exists(mainImgPath)) {
                byte[] file = Files.readAllBytes(mainImgPath);
                String imgMain = Base64.getEncoder().encodeToString(file);
                goods.setMainImg(imgMain);
            }

            for (int i = 0; i < imagesPathList.size(); i++) {
                Path imagePath = Path.of(imagesPathList.get(i));

                if (Files.exists(imagePath)) {
                    byte[] file = Files.readAllBytes(imagePath);
                    String images = Base64.getEncoder().encodeToString(file);
                    newImages.add(images);
                }
            }
            goods.setImages(newImages);

        } catch (IOException e) {
            System.out.println("Error get path mainImg " + e.getMessage());
            throw new RuntimeException("Error get path mainImg");
        }

        return goods;
    }

    public Goods updateGood(String id, GoodsDto goodsModel) {

        String mainImgBase64 = goodsModel.getMainImg();
        List<String> imagesList = goodsModel.getImages();

        try {
            if (mainImgBase64 != null && mainImgBase64.length() > 0) {
                String idImg = UUID.randomUUID().toString();
                String splitImgMain = mainImgBase64.split("base64,")[1];
                byte[] base64Convert = Base64.getDecoder().decode(splitImgMain);
                String nameImgMain = System.currentTimeMillis() + "_" + idImg;

                Path pathImgMain = Paths.get(pathMainImg, id);
                Path dir = pathImgMain.resolve(nameImgMain);

                if (Files.exists(dir)) {
                    Files.write(dir, base64Convert);
                } else {
                    Files.createDirectories(pathImgMain);
                    Files.write(dir, base64Convert);
                }

                goodsModel.setMainImg(dir.toString());
            }

            if (imagesList != null || imagesList.size() > 0) {
                List<String> imgPathList = new ArrayList<>();
                for (int i = 0; i < imagesList.size(); i++) {
                    String idImg = UUID.randomUUID().toString();
                    String nameImg = System.currentTimeMillis() + "_" + idImg;
                    String splitBase = imagesList.get(i).split("base64,")[1];
                    byte[] imgConvert = Base64.getDecoder().decode(splitBase);
                    Path pathImg = Paths.get(path, id);
                    Path dir = pathImg.resolve(nameImg);

                    if (Files.exists(dir)) {
                        Files.write(dir, imgConvert);
                    } else {
                        Files.createDirectories(pathImg);
                        Files.write(dir, imgConvert);
                    }
                    imgPathList.add(dir.toString());
                }
                goodsModel.setImages(imgPathList);
            }


        } catch (IOException e) {
            System.out.println("Error file read " + e.getMessage());
            throw new RuntimeException("Error file read");
        }

        Goods goods = goodsDB.updateGoods(id, goodsModel);
        return goods;
    }

    public void deleteGoods(String id) {
        goodsDB.deleteGoods(id);
    }

}
