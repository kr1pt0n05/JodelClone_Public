package com.example.jodel_app.user;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("/register")
    public String register() {
        return "register.html";
    }

    @GetMapping("/test")
    @ResponseBody
    public ResponseEntity<?> test(HttpServletRequest request) {
        return ResponseEntity.ok().body("Test successful");
    }

    @GetMapping("/api/check-auth")
    @ResponseBody
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("authToken")) {
                    if (userService.validateAuthToken(cookie.getValue())) {
                        return ResponseEntity.ok().body("Authenticated");
                    }
                }
            }
        }
        return ResponseEntity.status(401).body("Not authenticated");
    }

    @PostMapping("/api/login")
    @ResponseBody
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpServletResponse response) {
        ResponseEntity<?> loginResponse = userService.loginUser(user);
        if (loginResponse.getStatusCode().is2xxSuccessful()) {
            Cookie authCookie = new Cookie("authToken", userService.generateAuthToken(user.getUsername()));
            authCookie.setMaxAge(3600); // 1 hour
            authCookie.setHttpOnly(true);
            authCookie.setPath("/");
            response.addCookie(authCookie);
        }
        return loginResponse;
    }

    @PostMapping("/api/register")
    @ResponseBody
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/api/logout")
    @ResponseBody
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("authToken")) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                    break;
                }
            }
        }
        return ResponseEntity.ok().body("Logged out successfully");
    }

}
