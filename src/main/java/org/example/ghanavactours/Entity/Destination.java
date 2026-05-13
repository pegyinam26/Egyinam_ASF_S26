package org.example.ghanavactours.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 100)
    private String region;

    //JsonIgnore helps prevent JSON recursion errors for unwanted reverse mappings
    //without this it would cause destination -> activities -> activity -> destination -> activities
    @OneToMany(mappedBy = "destination")
    @JsonIgnore
    private List<ItineraryDestination> itineraryDestinations;
}