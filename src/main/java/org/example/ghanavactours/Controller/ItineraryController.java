package org.example.ghanavactours.Controller;

import org.example.ghanavactours.Entity.Itinerary;
import org.example.ghanavactours.Repository.ItineraryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {

    private final ItineraryRepository itineraryRepository;
    public ItineraryController(ItineraryRepository itineraryRepository) {
        this.itineraryRepository = itineraryRepository;
    }

    //CRUD - reading or getting all Itineraries
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