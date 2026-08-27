package LoginSignin;

import PersonTasks.Users;
import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import actionDB.DBStatus;
import actionDB.DBTokenUser;
import actionDB.DBUsers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import cors.CreateCors;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import Token.GenerateToken;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;


// класс для обработки регистрации


public class HandlerRegistration implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        // класс для cors
        new CreateCors().cors(exchange);

        if ("OPTIONS".equals(method)) {
            exchange.sendResponseHeaders(200, -1);
        }

        if ("POST".equals(method)) {
            handleRegistration(exchange);
        }
    }


    public void handleRegistration(HttpExchange exchange) {
        try {
            JSONParser parser = new JSONParser();
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);


            // парсинг данных тела запроса
            JSONObject json = (JSONObject) parser.parse(body);

            // вытаскивание данных из json
            String login = (String) json.get("login");
            String password = (String) json.get("password");

            // проверка есть ли такой пользователь уже в бд по логину, если есть, то ошибку отправляю
            DBUsers userDB = new DBUsers();
            Users user = userDB.selectDataUsers(login, "login");

            if (user.getLogin() != null && user.getLogin().length() > 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Такой пользователь уже существует"), 200);
                return;
            }

            // проверки паролей

            if (login.length() == 0) {
                new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Укажите логин"), 200);
                return;
            }

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
            String token = new GenerateToken().generateToken();

            // переобразовать биты в строку для пароля
            String saltBae64 = Base64.getEncoder().encodeToString(salt);
            String hashBase64 = Base64.getEncoder().encodeToString(hash);

            // сторка с хешем, солью и количесвом итераций, добавляю ее в бд
            String newPasswordWithDataOfDecode = iteration + ":" + saltBae64 + ":" + hashBase64;

            // добавление данных в бд users, из добавления взвращаю id для другой бд
            DBUsers db = new DBUsers();
            String idFromData = db.insertDataUser(login, newPasswordWithDataOfDecode);

            // инициализирую бд со статусами
            DBStatus dbStatus = new DBStatus();
            dbStatus.insertStatus(idFromData);

            // добавляю данные в user_token
            DBTokenUser dbToken = new DBTokenUser();
            dbToken.insertTokenUser(idFromData, token);

            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(true, "Регистрация прошла успешно"), 200);



        } catch (IOException error) {
            System.out.println("Error to registration " + error.getMessage());
        } catch (ParseException error) {
            System.out.println("Error to data in registration " + error.getMessage());
        } catch (NoSuchAlgorithmException error) {
            System.out.println("Error to generate password " + error.getMessage());
        } catch (InvalidKeySpecException error) {
            System.out.println("Error to generate hash " + error.getMessage());
        }
    }


}
