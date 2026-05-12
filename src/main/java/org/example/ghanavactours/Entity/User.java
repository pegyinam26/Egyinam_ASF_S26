package org.example.ghanavactours.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 50)
    private String fname;

    @Column(length = 50)
    private String lname;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(length = 20)
    private String phoneNumber;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToOne(cascade = CascadeType.ALL,optional = true)
    @JoinColumn(name = "address_id", nullable = true)
    private Address address;

    //added this JSONIGNORE to prevent infinite JSON loop. it tells JSON to skip a field when converting to JSON
    //this prevents endless loop when returning userRepository.findAll() which results in
    //user-> bookings -> booking -> user -> bookings -> booking... causing 500 error or stack overflow
    @JsonIgnore
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Booking> bookings = new ArrayList<>();
}