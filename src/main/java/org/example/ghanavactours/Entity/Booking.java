package org.example.ghanavactours.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private LocalDate booking_date;

    @Column(nullable = false)
    private Date travel_start_date;

    @Column(nullable = false, length = 50)
    private String status;

    //User FK,  one user has many bookings
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_user")
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    //Itinerary FK, one itinerary has many bookings
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "itinerary_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_itinerary_booking")
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Itinerary itinerary;

}