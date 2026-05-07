package org.example.ghanavactours.Service;

import org.example.ghanavactours.Entity.User;
import org.example.ghanavactours.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER
    public User register(Map<String, String> request) {

        String fname = request.get("fname");
        String lname = request.get("lname");
        String email = request.get("email");
        String password = request.get("password");

        // check existing email
        if(userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fname(fname)
                .lname(lname)
                .email(email)
                .password(password)
                .role("USER")
                .phoneNumber("N/A")
                .createdAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    // LOGIN
    public Map<String, Object> login(Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        return Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "role", user.getRole()
        );
    }
}