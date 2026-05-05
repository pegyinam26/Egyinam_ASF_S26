package org.example.ghanavactours.Controller;

import org.example.ghanavactours.Entity.Booking;
import org.example.ghanavactours.Service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(originPatterns = "http://localhost:*")//ensures all port numbers are applicable for the API url - CORS policuy
public class BookingController {

    private final BookingService bookingService;

    //Constructor injection for the BookingService in BookingController
    public BookingController(BookingService service) {
        this.bookingService = service;
    }
    //fulfilling CRUD - C- create
    @ResponseStatus(HttpStatus.CREATED)//ensures 201 response when created
    @PostMapping
    public Booking create(@RequestBody Map<String, Object> request) {
        return bookingService.createBooking(request);
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
}