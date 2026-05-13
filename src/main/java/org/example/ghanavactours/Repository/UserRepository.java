package org.example.ghanavactours.Repository;

import org.example.ghanavactours.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //created this to be used in the AuthService to enable user's email to be checked if existing before authenticating user
    Optional<User> findByEmail(String email);

}