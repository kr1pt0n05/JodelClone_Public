package com.example.jodel_app.utils;
import java.util.Base64;

public class CookieExtractUsername {

    public static String extractUsername(String authToken) {
        // Decode the Base64 string
        byte[] decodedBytes = Base64.getDecoder().decode(authToken);
        String decodedString = new String(decodedBytes);

        // Split the decoded string to get the username
        // Assuming the format is "username:timestamp"
        String[] parts = decodedString.split(":");
        if (parts.length > 1) {
            return parts[0]; // Return the username part
        } else {
            throw new IllegalArgumentException("Invalid token format");
        }
    }

}
