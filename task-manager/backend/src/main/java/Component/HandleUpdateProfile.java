package Component;

import LoginSignin.FuncCheckPassword;
import SendResponse.SendResponse;
import actionDB.DBTokenUser;
import actionDB.DBUsers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.UUID;

public class HandleUpdateProfile implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("PUT".equals(method)) {
            handleUpdateProfile(exchange);
        }
    }

    public void handleUpdateProfile(HttpExchange exchange) {

        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String str = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject jsonBody = (JSONObject) parser.parse(str);

            ArrayList<String> avatar = (ArrayList<String>) jsonBody.get("avatars");

//            String login = (String) jsonBody.get("login");
            String name = (String) jsonBody.get("name");
            String token = (String) jsonBody.get("token");
            String password = (String) jsonBody.get("password");

            DBTokenUser dbToken = new DBTokenUser();
            String id_ = dbToken.selectTokenUserId(token);

            DBUsers users = new DBUsers();

            //смена пароля
            if (password != null && password.length() > 0) {

                new FuncCheckPassword().checkPassword(exchange, password);

                // генерация хеша для ключа
                SecureRandom random = new SecureRandom();
                byte[] salt = new byte[16];
                random.nextBytes(salt);

                // вывод в переменные значения для добавления в пароль для дальнейшего декодирования
                int iteration = 65536;
                int lengthHash = 128;
                String algorithm = "PBKDF2WithHmacSHA1";

                // генерация хеша для ключа
                KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iteration, lengthHash);
                SecretKeyFactory factory = SecretKeyFactory.getInstance(algorithm);
                byte[] hash = factory.generateSecret(spec).getEncoded();

                // генерация токена для сессии

                // переобразовать биты в строку для пароля
                String saltBae64 = Base64.getEncoder().encodeToString(salt);
                String hashBase64 = Base64.getEncoder().encodeToString(hash);

                // сторка с хешем, солью и количесвом итераций, добавляю ее в бд
                String newPasswordWithDataOfDecode = iteration + ":" + saltBae64 + ":" + hashBase64;
                boolean passwordUpdate = users.updateDataUsers(id_, "password", newPasswordWithDataOfDecode);
                if (!passwordUpdate) {
                    new SendResponse().sendResponse(exchange, "Произошла ошибка обновления", 400);
                }
            }


            if (avatar != null) {
                StringBuilder str_images = new StringBuilder();

                for (int i = 0; i < avatar.toArray().length; i++) {
                    UUID uuidImg = UUID.randomUUID();
                    String imgWithoutPrefix = avatar.get(i).split("base64,")[1];
                    byte[] base64cConvert = Base64.getDecoder().decode(imgWithoutPrefix); // байтовое изображение
                    String nameImg = System.currentTimeMillis() + "_" + uuidImg;// название к изобраению
                    // создание папки для аватарок
                    Path pathToAvatars = Paths.get(System.getenv("IMAGE_PATH"), id_);
                    Path dir = pathToAvatars.resolve(nameImg);
                    str_images.append(dir + "|");

                    if (Files.exists(dir)) {
                        Files.write(dir, base64cConvert);
                    } else {
                        Files.createDirectories(pathToAvatars);
                        Files.write(dir, base64cConvert);
                    }

                }

                boolean avatarsUpdate = users.updateDataUsers(id_, "avatars", str_images.toString());
                if (!avatarsUpdate) {
                    new SendResponse().sendResponse(exchange, "Произошла ошибка обновления", 400);
                }
            }

//            boolean loginUpdate = users.updateDataUsers(id_, "login", login);
            boolean nameUpdate = users.updateDataUsers(id_, "username", name);

            if (!nameUpdate) {
                JSONObject jsonObj = new JSONObject();
                jsonObj.put("success", "false");
                String data = jsonObj.toJSONString();

                new SendResponse().sendResponse(exchange, data, 200);
            }

            new SendResponse().sendResponse(exchange, "Данные успешно обновлены", 200);


        } catch (IOException error) {
            System.out.println("Error to get data profile-update " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse data profile-update " + error.getMessage());
        }catch (NoSuchAlgorithmException error) {
            System.out.println("Error to generate algorithm data profile-update " + error.getMessage());
        }catch (InvalidKeySpecException error) {
            System.out.println("Error to invalid key in profile-update " + error.getMessage());
        }
    }
}
