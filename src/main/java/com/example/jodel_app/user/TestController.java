package com.example.jodel_app.user;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
public class TestController {

    @GetMapping(path = "/create")
    public ResponseEntity<User> createUser() {
        User user = new User();
        user.setUsername("null");
        user.setPassword("null3");
        return ResponseEntity.ok(user);
    }
}
