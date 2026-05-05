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

    @OneToMany(mappedBy = "destination")
    @JsonIgnore //helps prevent JSON recursion errors for unwanted reverse mappings
    private List<ItineraryDestination> itineraryDestinations;
}