package LoginSignin;

import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
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
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;

public class HandleLogin implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleLogin(exchange);
        }
    }

    public void handleLogin(HttpExchange exchange) {
        try {
            InputStream body = exchange.getRequestBody();
            JSONParser parser = new JSONParser();
            String str = new String(body.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject json = (JSONObject) parser.parse(str);

            String login = (String) json.get("login");
            String password = (String) json.get("password");

            // так как есть вход без пароля нужно сделать чтобы пароль мог принимать значение null, следовательно мне нужно сделать проверку на его наличие
            if (password.length() == 0 || password == null) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Необходим пароль"), 200);
                return;
            }


            DBUsers db = new DBUsers();
            Users users = db.selectDataUsers(login, "login");
            if (users.getLogin() == null) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Неправильный логин или пароль"), 200);
                return;
            }

            String algorithm = "PBKDF2WithHmacSHA1";

            // метод для обработки пароля из бд и генерации хеша из существующего пароля
            String[] passwordFromDB = users.getPassword().split(":"); // достаю пароль и сразу разделяю его
            int iteration = Integer.parseInt(passwordFromDB[0]);  // присваиваю каждой переменной ее значение преобразовывая в байты
            byte[] salt = Base64.getDecoder().decode(passwordFromDB[1]);
            byte[] hash = Base64.getDecoder().decode(passwordFromDB[2]);

            // генерирую значение хеша пароля на пришедшем пароле при логине
            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iteration, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance(algorithm);
            byte[] newHash = factory.generateSecret(spec).getEncoded();

            // если хеш не совпадает
            if (!Arrays.equals(hash, newHash)) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Неправильный логин или пароль"), 200);
                return;
            }

            // вытаскиваю токен из бд по id
            String getIdForDbToken = users.getId();


            DBTokenUser dbToken = new DBTokenUser();
            String token = dbToken.selectTokenUser(getIdForDbToken).getToken();

            // токен переправляю в json и отправляю на фронт
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("success", true);
            jsonObj.put("token", token);
            String jsonToken = jsonObj.toJSONString();
            new SendResponse().sendResponse(exchange, jsonToken, 200);


        } catch (IOException error) {
            System.out.println("Error to get data login " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse data login " + error.getMessage());
        } catch (NoSuchAlgorithmException error) {
            System.out.println("Error to generate hash in login " + error.getMessage());
        } catch (InvalidKeySpecException error) {
            System.out.println("Error spec in login " + error.getMessage());
        }

    }


}
