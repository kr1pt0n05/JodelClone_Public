package com.example.jodel_app.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import com.example.jodel_app.user.UserService;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {

    private final UserService userService;

    @Autowired
    public AuthenticationInterceptor(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("authToken")) {
                    if (userService.validateAuthToken(cookie.getValue())) {
                        return true;
                    } else {
                        response.sendRedirect("/");
                        return false;
                    }
                }
            }
        }
        response.sendRedirect("/");
        return false;
    }
}
