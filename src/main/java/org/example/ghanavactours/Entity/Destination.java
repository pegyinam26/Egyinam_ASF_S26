package org.example.ghanavactours.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Data
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
    private List<ItineraryDestination> itineraryDestinations;
}