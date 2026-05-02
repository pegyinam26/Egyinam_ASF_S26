package org.example.ghanavactours.Controller;

import org.example.ghanavactours.Entity.Destination;
import org.example.ghanavactours.Repository.DestinationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {
    //injecting Destination Constructor repository
    private final DestinationRepository destinationRepository;

    public DestinationController(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    //CRUD - reading or retrieving all destinations from database
    @GetMapping
    public List<Destination> getDestinations() {
        return destinationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Destination getDestination(@PathVariable Long id) {
        return destinationRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Destination not found"));
    }

}