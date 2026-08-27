package SendResponse;

import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class SendResponse {
    // общие метод для ответа на ошибки или любой другой текст, просто отправка на фронт для отображения ошибки
    public void sendResponse(HttpExchange exchange, String message, int status) {
        try {
            byte[] bytes = message.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-type", "text/html; charset=utf-8");
            exchange.sendResponseHeaders(status, bytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(bytes);
            os.close();
        } catch (IOException error) {
            System.out.println("Error to send data request " + error.getMessage());
        }
    }

}
