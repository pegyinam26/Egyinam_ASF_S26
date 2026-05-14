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

    //Injecting these repositories for use in the booking service
    private final ItineraryRepository itineraryRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;


    public BookingService(BookingRepository bookingRepository, ItineraryRepository itineraryRepository, UserRepository userRepository  ) {
        this.bookingRepository = bookingRepository;
        this.itineraryRepository = itineraryRepository;
        this.userRepository = userRepository;
    }
   //fulfilling CRUD - C- create
    public Booking createBooking(Booking booking) {

        // ===== EXISTING ITINERARY =====
        //this is used on the book a trip form where a user selects and itinerary from the dropdown
        Long itineraryId = booking.getItinerary().getId();

        Itinerary itinerary = itineraryRepository
                .findById(itineraryId)
                .orElseThrow(() ->
                        new RuntimeException("Itinerary not found"));

        // ===== EXISTING USER =====
        //checks to see if user exists when filling out the booking form: names and email are prepopulated
        Long userId = booking.getUser().getId();

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // update phone number
        user.setPhoneNumber(booking.getUser().getPhoneNumber());

        // update/create address
        if (booking.getUser().getAddress() != null) {

            Address incomingAddress = booking.getUser().getAddress();

            Address address = user.getAddress();

            if (address == null) {
                address = new Address();
            }

            address.setStreet(incomingAddress.getStreet());
            address.setCity(incomingAddress.getCity());
            address.setState(incomingAddress.getState());
            address.setZip(incomingAddress.getZip());
            address.setCountry(incomingAddress.getCountry());

            user.setAddress(address);
        }

        // ===== ATTACH PERSISTED ENTITIES =====
        //this is where itinerary and user information created so far are attached to the booking being created
        booking.setItinerary(itinerary);

        booking.setUser(user);

        // ===== SAVE =====

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
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    //fulfilling CRUD - U - update
    public Booking updateBooking(
            Long id,
            Booking updatedBooking
    ) {

        Booking currentBooking = bookingRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        // ===== BOOKING FIELDS =====

        currentBooking.setStatus(
                updatedBooking.getStatus()
        );

        currentBooking.setTravel_start_date(
                updatedBooking.getTravel_start_date()
        );

        // ===== USER FIELDS =====

        currentBooking.getUser().setFname(
                updatedBooking.getUser().getFname()
        );

        currentBooking.getUser().setLname(
                updatedBooking.getUser().getLname()
        );

        return bookingRepository.save(currentBooking);
    }

    //fulfilling CRUD - D - delete
    public void deleteBooking(Long id) {
        Booking existing = bookingRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        //delete booking
        bookingRepository.deleteById(existing.getId());
    }

}