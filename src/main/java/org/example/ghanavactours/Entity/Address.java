package org.example.ghanavactours.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String street;

    @Column(nullable = false, length = 50)
    private String city;

    @Column(nullable = false, length = 2)
    private String state;

    @Column(nullable = false, length = 5)
    private String zip;

    @Column(nullable = false, length = 100)
    private String country;
}

