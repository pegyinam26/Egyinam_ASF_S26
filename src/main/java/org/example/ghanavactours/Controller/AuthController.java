package org.example.ghanavactours.Controller;

import org.example.ghanavactours.Entity.User;
import org.example.ghanavactours.Service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // REGISTER - used to create a new USER account from the business logic in the AuthService layer
    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> request) {
        return authService.register(request);
    }

    // LOGIN - used to login a USER based on the business logic for this in the AuthService layer
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        return authService.login(request);
    }
}