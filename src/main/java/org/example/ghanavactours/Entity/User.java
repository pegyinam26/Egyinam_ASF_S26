package org.example.ghanavactours.Entity;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 50)
    private String fname;

    @Column(length = 50)
    private String lname;

    @Column(nullable = false, length = 100)
    private String email;


    @Column(nullable = false, length = 20)
    private String phoneNumber;


    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", nullable=false)
    private Address address;

}