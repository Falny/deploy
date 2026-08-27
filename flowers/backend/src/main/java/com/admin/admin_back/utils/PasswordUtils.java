package com.admin.admin_back.utils;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Base64;

public class PasswordUtils {
    private int iteration = 65536;
    private int lengthHash = 128;
    private String algorithm = "PBKDF2WithHmacSHA1";


    public String createPassword(String password) {
        String passwordDecode = "";
        try {
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);

            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iteration, lengthHash);
            SecretKeyFactory factory = SecretKeyFactory.getInstance(algorithm);
            byte[] hash = factory.generateSecret(spec).getEncoded();

            String salt64 = Base64.getEncoder().encodeToString(salt);
            String hash64 = Base64.getEncoder().encodeToString(hash);

            passwordDecode = salt64 + ":" + hash64;

        } catch (NoSuchAlgorithmException error) {
            System.out.println("Error algorithm password " + error.getMessage());
        }catch (InvalidKeySpecException error) {
            System.out.println("Error key password " + error.getMessage());
        }

        return passwordDecode;
    }

    public Boolean checkPassword(String password, String hash) {
        try {
            String[] splitHash = hash.split(":");
            byte[] saltFromDB = Base64.getDecoder().decode(splitHash[0]);
            byte[] hashFromDB = Base64.getDecoder().decode(splitHash[1]);

            KeySpec spec = new PBEKeySpec(password.toCharArray(), saltFromDB, iteration, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance(algorithm);
            byte[] newHash = factory.generateSecret(spec).getEncoded();

            if (!Arrays.equals(newHash, hashFromDB)) {
                return false;
            }


        }  catch (NoSuchAlgorithmException error) {
            System.out.println("Error algorithm check password " + error.getMessage());
        }catch (InvalidKeySpecException error) {
            System.out.println("Error key check password " + error.getMessage());
        }
        return true;
    }
}
