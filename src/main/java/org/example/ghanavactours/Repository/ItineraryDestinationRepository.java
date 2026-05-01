package org.example.ghanavactours.Repository;

import org.example.ghanavactours.Entity.ItineraryDestination;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItineraryDestinationRepository extends JpaRepository<ItineraryDestination, Long> {

}