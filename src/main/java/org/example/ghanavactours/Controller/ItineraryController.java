package org.example.ghanavactours.Controller;

import org.example.ghanavactours.Entity.Itinerary;
import org.example.ghanavactours.Repository.ItineraryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {

    private final ItineraryRepository itineraryRepository;
    public ItineraryController(ItineraryRepository itineraryRepository) {
        this.itineraryRepository = itineraryRepository;
    }

    //CRUD - reading or getting all Itineraries and reading a single itinerary by Id
    @GetMapping
    public List<Itinerary> getItineraries() {
        return itineraryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Itinerary getItineraryById(@PathVariable Long id) {
        return itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));
    }
}