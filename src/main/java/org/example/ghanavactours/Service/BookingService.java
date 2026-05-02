package org.example.ghanavactours.Service;

import org.example.ghanavactours.Entity.Address;
import org.example.ghanavactours.Entity.Booking;
import org.example.ghanavactours.Entity.Itinerary;
import org.example.ghanavactours.Entity.User;
import org.example.ghanavactours.Repository.BookingRepository;
import org.example.ghanavactours.Repository.ItineraryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private ItineraryRepository itineraryRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
   //fulfilling CRUD - C- create
//    public Booking createBooking(Booking booking) {
//        return bookingRepository.save(booking);
//    }

    public Booking createBooking(Map<String, Object> request) {

        // Extract values
        String itineraryTitle = (String) request.get("itineraryTitle");
        String firstName = (String) request.get("firstName");
        String lastName = (String) request.get("lastName");
        String email = (String) request.get("email");
        String phone = (String) request.get("phoneNumber");

        String street = (String) request.get("street");
        String city = (String) request.get("city");
        String state = (String) request.get("state");
        String zip = (String) request.get("zip");
        String country = (String) request.get("country");

        String travelDateStr = (String) request.get("travelDate");

        // Convert date
        LocalDate travelDate = LocalDate.parse(travelDateStr);

        // Find itinerary
        Itinerary itinerary = itineraryRepository
                .findByTitle(itineraryTitle)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        // Create Address
        Address address = Address.builder()
                .street(street)
                .city(city)
                .state(state)
                .zip(zip)
                .country(country)
                .build();

        // Create User
        User user = User.builder()
                .fname(firstName)
                .lname(lastName)
                .email(email)
                .phoneNumber(phone)
                .createdAt(LocalDateTime.now())
                .address(address)
                .build();

        // Create Booking
        Booking booking = Booking.builder()
                .user(user)
                .itinerary(itinerary)
                .booking_date(LocalDate.now())
                .travel_start_date(travelDate)
                .status("PENDING")
                .build();

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