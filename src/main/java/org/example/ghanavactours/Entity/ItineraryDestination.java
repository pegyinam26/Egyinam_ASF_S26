package org.example.ghanavactours.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Itinerary_Destination")
public class ItineraryDestination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(length = 5)
    private long day_number;

    //JsonBackReference fixes JSON recursion which might cause stack overflow and 500 error
    //used to handle bidirectional relationships from ItineraryDestination -> Itinerary (JsonBackReference)
    @ManyToOne
    @JsonBackReference
    @JoinColumn(
            name = "itinerary_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_itinerary")
    )
    private Itinerary itinerary;

    @ManyToOne
    @JoinColumn(
            name = "destination_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_destination")
    )
    private Destination destination;
}