package org.example.ghanavactours.Service;

import org.example.ghanavactours.Entity.Address;
import org.example.ghanavactours.Entity.Booking;
import org.example.ghanavactours.Entity.Itinerary;
import org.example.ghanavactours.Entity.User;
import org.example.ghanavactours.Repository.BookingRepository;
import org.example.ghanavactours.Repository.ItineraryRepository;
import org.example.ghanavactours.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {

    private final ItineraryRepository itineraryRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;


    public BookingService(BookingRepository bookingRepository, ItineraryRepository itineraryRepository, UserRepository userRepository  ) {
        this.bookingRepository = bookingRepository;
        this.itineraryRepository = itineraryRepository;
        this.userRepository = userRepository;
    }
   //fulfilling CRUD - C- create
//    public Booking createBooking(Booking booking) {
//        return bookingRepository.save(booking);
//    }

    public Booking createBooking(Booking booking) {
        //save user first
        User savedUser = userRepository.save(booking.getUser());
        //fetch itinerary
        Long id = booking.getItinerary().getId();

        Itinerary itinerary = itineraryRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        booking.setItinerary(itinerary);
        booking.setUser(savedUser);

        return bookingRepository.save(booking);
    }

    //fulfilling CRUD - R - read
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
    }

    //fulfilling CRUD - U - update
    public Booking updateBooking(Long id, Booking updatedBooking) {

        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Update only editable fields
        existing.setTravel_start_date(updatedBooking.getTravel_start_date());
        existing.setStatus(updatedBooking.getStatus());

        // Update user fields
        if (existing.getUser() != null && updatedBooking.getUser() != null) {
            existing.getUser().setFname(updatedBooking.getUser().getFname());
            existing.getUser().setLname(updatedBooking.getUser().getLname());
        }

        return bookingRepository.save(existing);
    }

    //fulfilling CRUD - D - delete
    public void deleteBooking(Long id) {
        Booking existing = bookingRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        //delete booking
        bookingRepository.deleteById(existing.getId());
    }

}