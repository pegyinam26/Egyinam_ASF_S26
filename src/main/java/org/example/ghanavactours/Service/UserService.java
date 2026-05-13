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
   //injecting userRepository constructor in the service
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
    public User updateUser(Long id, User modifiedUser) {

        User currentUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        //using the setter and getter methods from the JPA in the userRepository to updateUser with existing/current user information
        currentUser.setFname(modifiedUser.getFname());
        currentUser.setLname(modifiedUser.getLname());
        currentUser.setEmail(modifiedUser.getEmail());
        currentUser.setPhoneNumber(modifiedUser.getPhoneNumber());

        if (modifiedUser.getAddress() != null) {

            Address address = currentUser.getAddress();

            if (address == null) {
                address = new Address();
            }

            address.setStreet(modifiedUser.getAddress().getStreet());
            address.setCity(modifiedUser.getAddress().getCity());
            address.setState(modifiedUser.getAddress().getState());
            address.setZip(modifiedUser.getAddress().getZip());
            address.setCountry(modifiedUser.getAddress().getCountry());

            currentUser.setAddress(address);
        }

        return userRepository.save(currentUser);
    }

        //fulfilling CRUD - D - delete
    public void deleteUser(Long id) {
        User currentUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        //delete user
        userRepository.deleteById(currentUser.getId());
    }
}