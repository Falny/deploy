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
import org.xml.sax.InputSource;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Base64;

public class HandleCheckPassword implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();


        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleCheckPassword(exchange);
        }
    }

    public void handleCheckPassword(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJSON = (JSONObject) parser.parse(body);
            String password = (String) bodyJSON.get("password");
            String token = (String) bodyJSON.get("token");

            // проверка пароля
            boolean checkPass = new FuncCheckPassword().checkPassword(exchange, password);
            if (!checkPass) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Произошла ошибка проверки"), 200);
                return;
            }

            DBTokenUser tokenUserDB = new DBTokenUser();
            String id_user = tokenUserDB.selectTokenUserId(token);
            DBUsers userDB = new DBUsers();
            Users users = userDB.selectDataUsers(id_user, "id");

            String algorithm = "PBKDF2WithHmacSHA1";

            // метод для обработки пароля из бд и генерации хеша из существующего пароля
            String[] passwordFromDB = users.getPassword().split(":"); // достаю пароль и сразу разделяю его
            int iteration = Integer.parseInt(passwordFromDB[0]);  // присваиваю каждой переменной ее значение преобразовывая в байты
            byte[] salt = Base64.getDecoder().decode(passwordFromDB[1]);
            byte[] hash = Base64.getDecoder().decode(passwordFromDB[2]);

            // генерирую значение хеша пароля на пришедем пароле при логине
            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iteration, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance(algorithm);
            byte[] newHash = factory.generateSecret(spec).getEncoded();

            // если хеш не совпадает
            if (!Arrays.equals(hash, newHash)) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Неправильный логин или пароль"), 200);
                return;
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Вводите новый пароль"), 200);


        } catch (IOException error) {
            System.out.println("Error to read data password " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to parse data password " + error.getMessage());
        } catch (NoSuchAlgorithmException error) {
            System.out.println("Error to convert algorithm data password " + error.getMessage());
        } catch (InvalidKeySpecException error) {
            System.out.println("Error to generate data password " + error.getMessage());
        }
    }
}
