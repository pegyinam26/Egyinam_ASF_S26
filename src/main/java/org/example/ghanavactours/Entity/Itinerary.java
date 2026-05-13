package org.example.ghanavactours.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference; //fixes JSON recursion
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false)
    private long duration_days;

    //JsonManagedReference fixes JSON recursion which might cause stack overflow and 500 error
    //used to handle bidirectional relationships from Itinerary -> ItineraryDestination (JsonManagedReference)
    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ItineraryDestination> itineraryDestinations;
}