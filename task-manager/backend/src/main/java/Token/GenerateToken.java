package Token;

import java.security.SecureRandom;
import java.util.HexFormat;

public class GenerateToken {

    public String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);

        String hex = HexFormat.of().formatHex(bytes);

        return hex;
    }
}
