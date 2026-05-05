package org.example.ghanavactours.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        String password = (String) request.get("password");

        if("admin".equals(username) && "admin123".equals(password)) {
            System.out.println(request);
            return Map.of("role", "ADMIN");
        }

        if("user".equals(username) && "user123".equals(password)) {
            System.out.println(request);
            return Map.of("role", "USER");
        }
        throw new RuntimeException("Invalid username or password");

    }
}