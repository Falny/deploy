package Component;

import LoginSignin.FuncCheckPassword;
import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import Token.GenerateToken;
import actionDB.DBTasks;
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
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Base64;

public class HandleUpdatePassword implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();


        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleUpdatePassword(exchange);
        }
    }

    public void handleUpdatePassword(HttpExchange exchange) {
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


            DBTokenUser dbToken = new DBTokenUser();
            String id = dbToken.selectTokenUserId(token);

            DBUsers dbUSers = new DBUsers();
            Boolean resultUpdatePassword = dbUSers.updateDataUsers(id, "password", newPasswordWithDataOfDecode);

            if (!resultUpdatePassword) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Произошла ошибка обновления пароля"), 200);
                return;
            }

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Пароль обновлен"), 200);


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
