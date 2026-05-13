package org.example.ghanavactours.Controller;

import org.example.ghanavactours.Entity.User;
import org.example.ghanavactours.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //fulfilling CRUD - R - read to get a single user by Id or get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    //fulfilling CRUD - U - update
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        return userService.updateUser(id, updatedUser);
    }

    //fulfilling CRUD - D -  delete
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}