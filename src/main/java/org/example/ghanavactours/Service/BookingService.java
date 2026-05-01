package org.example.ghanavactours.Service;

import org.example.ghanavactours.Entity.Booking;
import org.example.ghanavactours.Repository.BookingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
   //fulfilling CRUD - C- create
    public Booking createBooking(Booking booking) {
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

}