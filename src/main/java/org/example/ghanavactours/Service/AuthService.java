package org.example.ghanavactours.Service;

import org.example.ghanavactours.Entity.User;
import org.example.ghanavactours.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class AuthService {
    //injecting userRepository constructor
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER - CRUD - C - creating a user
    public User register(Map<String, String> request) {

        //gets user registration information to store into strings to be used to build user account
        String fname = request.get("fname");
        String lname = request.get("lname");
        String email = request.get("email");
        String password = request.get("password");

        // check existing email, this was used in userRepository to optionally create a findByEmail method
        if(userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        //builds user account during login to fill up the database table fields
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

    // BACKEND LOGIN
    public Map<String, Object> login(Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        //using the userRepository optional findByEmail method to find user by their email before logging in
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        //ensuring password entered matches stored password
        if(!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        //if email and password requests are successful and valid information, return the following information to the frontend
        return Map.of(
                "id", user.getId(),
                "fname", user.getFname(),
                "lname", user.getLname(),
                "email", user.getEmail(),
                "role", user.getRole()
        );
    }
}