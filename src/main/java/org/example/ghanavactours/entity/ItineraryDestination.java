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
@Table(name="Itinerary_Destination")
public class ItineraryDestination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 5)
    private long itinerary_id;

    @Column(nullable = false, length = 5)
    private long destination_id;

    @Column(length = 5)
    private long day_number;

    @ManyToOne
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