package Component;

import LoginSignin.FuncCheckPassword;
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
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

public class HandleCreatePassword  implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        // класс для cors
        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleCreatePassword(exchange);
        }
    }


    public void handleCreatePassword(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            JSONObject bodyJson = (JSONObject) parser.parse(body);
            String token = (String) bodyJson.get("token");
            String password = (String) bodyJson.get("password");

            if (password.length() == 0 || password == null) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Необходим пароль"), 200);
                return;
            }

            new FuncCheckPassword().checkPassword(exchange, password);

            DBTokenUser dbToken = new DBTokenUser();
            String id = dbToken.selectTokenUserId(token);

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

            // переобразовать биты в строку для пароля
            String saltBae64 = Base64.getEncoder().encodeToString(salt);
            String hashBase64 = Base64.getEncoder().encodeToString(hash);

            // сторка с хешем, солью и количесвом итераций, добавляю ее в бд
            String newPasswordWithDataOfDecode = iteration + ":" + saltBae64 + ":" + hashBase64;

            DBUsers dbUser = new DBUsers();
            Boolean result = dbUser.updateDataUsers(id, "password", newPasswordWithDataOfDecode);
            Boolean resultIsCreated = dbUser.updateDataUsers(id, "isHowCreated", false);

            if (!result || !resultIsCreated) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Ошибка создания пароля"), 200);
                return;
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Пароль успешно установлен!"), 200);



        } catch (IOException error) {
            System.out.println("Error to CREATE PASSWORD " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to data in CREATE PASSWORD " + error.getMessage());
        } catch (NoSuchAlgorithmException error) {
            System.out.println("Error to generate password in CREATE PASSWORD " + error.getMessage());
        } catch (InvalidKeySpecException error) {
            System.out.println("Error to generate hash in CREATE PASSWORD " + error.getMessage());
        }
    }
}
