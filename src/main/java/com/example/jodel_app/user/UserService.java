package com.example.jodel_app.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<?> registerUser(User user) {
        if (user.getPassword().length() < 4 || user.getUsername().length() < 4) {
            return new ResponseEntity<>(Map.of(
                    "message", "Username and/or password is too short. Please ensure both are at least 4 characters long."),
                    HttpStatusCode.valueOf(400));
        }

        Optional<User> check = userRepository.findByUsername(user.getUsername());
        if (check.isPresent()) {
            return new ResponseEntity<>(Map.of(
                    "message", "The username you entered is unavailable. Please try another."),
                    HttpStatusCode.valueOf(409));
        }
        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
        return new ResponseEntity<>(Map.of(
                "message", "Success."),
                HttpStatusCode.valueOf(201));
    }

    public ResponseEntity<?> loginUser(User user) {
        Optional<User> check = userRepository.findByUsername(user.getUsername());

        if (!check.isPresent()) {
            return new ResponseEntity<>(Map.of(
                    "message", "Invalid username or password. Please try again."),
                    HttpStatusCode.valueOf(400));
        }
        if (!check.get().getPassword().equals(hashPassword(user.getPassword()))) {
            return new ResponseEntity<>(Map.of(
                    "message", "Invalid username or password. Please try again."),
                    HttpStatusCode.valueOf(401));
        }

        return new ResponseEntity<>(Map.of(
                "message", "Success."),
                HttpStatusCode.valueOf(200));
    }

    public String generateAuthToken(String username) {
        return Base64.getEncoder().encodeToString((username + ":" + System.currentTimeMillis()).getBytes());
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public boolean validateAuthToken(String token) {
        // Decode the Base64 token
        String decodedToken = new String(Base64.getDecoder().decode(token));
        String[] parts = decodedToken.split(":");
        if (parts.length != 2) {
            return false;
        }
        String username = parts[0];
        long timestamp = Long.parseLong(parts[1]);

        // Check if the token is not older than 1 hour
        if (System.currentTimeMillis() - timestamp > 3600000) {
            return false;
        }

        // Check if the user exists
        return userRepository.findByUsername(username).isPresent();
    }
}
