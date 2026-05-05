ALTER TABLE itinerary_destination
    ADD CONSTRAINT unique_itinerary_day_dest
        UNIQUE (itinerary_id, destination_id, day_number);