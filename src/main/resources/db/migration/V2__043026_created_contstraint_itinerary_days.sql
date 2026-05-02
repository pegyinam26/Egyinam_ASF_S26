ALTER TABLE itinerary_destination
    ADD CONSTRAINT unique_itinerary_day
        UNIQUE (itinerary_id, day_number);