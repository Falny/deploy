package Component;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class HandlerPostForm implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "http://localhost:5173");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if (method.equals("OPTIONS")) {
            exchange.sendResponseHeaders(200, -1);
        }
        if (method.equals("POST")) {
            handlerForm(exchange);
        }
    }

    public void handlerForm(HttpExchange exchange) {
        try {
            String token = System.getenv("token");
            String id = System.getenv("chat_id");;
            String apiUrl = "https://api.telegram.org/bot" + token + "/sendMessage";

            System.out.println(token);

            InputStream io = exchange.getRequestBody();
            String body = new String(io.readAllBytes(), StandardCharsets.UTF_8);

            JSONObject json = new JSONObject();
            json.put("chat_id", id);
            json.put("text", body);

            JSONObject responseServer = new JSONObject();
            if (token.length() > 0) {
                HttpClient client = HttpClient.newHttpClient();
                HttpRequest request = HttpRequest.newBuilder().uri(URI.create(apiUrl)).header("Content-Type", "application/json").POST(HttpRequest.BodyPublishers.ofString(json.toJSONString(), StandardCharsets.UTF_8)).build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    responseServer.put("message", true);
                    responseServer.put("text", "Отправлено успешно");
                    String data = responseServer.toJSONString();
                    byte[] bytes = data.getBytes(StandardCharsets.UTF_8);
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, bytes.length);
                    exchange.getResponseBody().write(bytes);
                }
            } else {
                responseServer.put("message", false);
                responseServer.put("text", "Ошибка отправки");
                String data = responseServer.toJSONString();
                byte[] bytes = data.getBytes(StandardCharsets.UTF_8);
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, bytes.length);
                exchange.getResponseBody().write(bytes);
            }

        } catch (IOException error) {
            System.out.println("Error read form " + error.getMessage());
        } catch (InterruptedException error) {
            System.out.println("Error send request form " + error.getMessage());
        } finally {
            exchange.close();
        }

    }
}
