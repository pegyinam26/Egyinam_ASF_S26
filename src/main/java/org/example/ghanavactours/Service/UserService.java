package org.example.ghanavactours.Service;
import org.example.ghanavactours.Entity.Address;
import org.example.ghanavactours.Entity.User;
import org.example.ghanavactours.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
   //fulfilling CRUD - R - Read
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    //CRUD - U - update
    public User updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setFname(updatedUser.getFname());
        existingUser.setLname(updatedUser.getLname());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());

        if (updatedUser.getAddress() != null) {

            Address address = existingUser.getAddress();

            if (address == null) {
                address = new Address();
            }

            address.setStreet(updatedUser.getAddress().getStreet());
            address.setCity(updatedUser.getAddress().getCity());
            address.setState(updatedUser.getAddress().getState());
            address.setZip(updatedUser.getAddress().getZip());
            address.setCountry(updatedUser.getAddress().getCountry());

            existingUser.setAddress(address);
        }

        return userRepository.save(existingUser);
    }

        //fulfilling CRUD - D - delete
    public void deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        //delete user
        userRepository.deleteById(existingUser.getId());
    }
}