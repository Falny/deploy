package LoginSignin;

import SendResponse.SendResponse;
import SendResponse.SendStatusSuccess;
import com.sun.net.httpserver.HttpExchange;

public class FuncCheckPassword {
    public boolean checkPassword (HttpExchange exchange, String password) {
        if (password.length() < 5 || password.length() > 15) {
            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Слишком маленький или большой пароль"), 200);
            return false;
        }

        if (!password.matches(".*[A-Z].*")) {
            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Должна быть хотя бы одна заглавная буква"), 200);
            return false;

        }

        if (!password.matches(".*[0-9].*")) {
            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Должна быть хотя бы одна цифра"), 200);
            return false;

        }
        if (!password.matches(".*[!@$%&?()+=#,._-].*")) {
            new SendResponse().sendResponse(exchange, new SendStatusSuccess().sendStatusSuccess(false, "Должен быть хотя бы один !,@,$,%,&,?,(,),-,+,=,#,,,.,_ символ"), 200);
            return false;

        }

        return true;
    }
}
