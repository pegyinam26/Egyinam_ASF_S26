package org.example.ghanavactours.Controller;

import org.example.ghanavactours.Entity.Booking;
import org.example.ghanavactours.Service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    //Constructor injection for the BookingService in BookingController
    public BookingController(BookingService service) {
        this.bookingService = service;
    }

    //fulfilling CRUD - C- create
    @ResponseStatus(HttpStatus.CREATED)//ensures 201 response when created
//    @PostMapping
//    public Booking create(@RequestBody Map<String, Object> request) {
//        return bookingService.createBooking(request);
//    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    //fulfilling CRUD - R - read
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    //fulfilling CRUD - U - update
    @PutMapping("/{id}")
    public Booking update(@PathVariable Long id, @RequestBody Booking booking) {
        return bookingService.updateBooking(id, booking);
    }

    //fulfilling CRUD - D - delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}