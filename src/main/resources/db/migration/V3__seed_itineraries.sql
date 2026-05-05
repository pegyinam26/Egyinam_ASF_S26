INSERT INTO itinerary (id, title, duration_days) VALUES
                                                     (1, '7-Day Tour (Classic Highlights)', 7),
                                                     (2, '11-Day Tour (Balanced Exploration)', 11),
                                                     (3, '14-Day Tour (Full Experience)', 14);

INSERT INTO destination (id, name, region) VALUES
-- ACCRA & GREATER ACCRA
(1, 'Accra', 'Greater Accra'),
(2, 'Kotoka International Airport', 'Greater Accra'),
(3, 'Skybar', 'Greater Accra'),
(4, 'Kwame Nkrumah Mausoleum', 'Greater Accra'),
(5, 'Black Star Square', 'Greater Accra'),
(6, 'W.E.B. Du Bois Centre', 'Greater Accra'),
(7, 'Arts Centre', 'Greater Accra'),
(8, 'Labadi Beach', 'Greater Accra'),
(9, 'Polo Beach Club', 'Greater Accra'),
(10, 'Osu Nightlife District', 'Greater Accra'),

-- EASTERN REGION
(11, 'Aburi Botanical Gardens', 'Eastern'),
(12, 'Tetteh Quarshie Cocoa Farm', 'Eastern'),
(13, 'Boti Falls', 'Eastern'),
(14, 'Umbrella Rock', 'Eastern'),

-- VOLTA REGION
(15, 'Ada Foah', 'Volta'),
(16, 'Aqua Safari Resort', 'Volta'),
(17, 'Treasure Island', 'Volta'),
(18, 'Palm Island Beach Resort', 'Volta'),
(19, 'Wli Waterfalls', 'Volta'),
(20, 'Mount Afadjato', 'Volta'),
(21, 'Lake Volta', 'Volta'),

-- CENTRAL REGION
(22, 'Cape Coast Castle', 'Central'),
(23, 'Elmina Castle', 'Central'),
(24, 'Kakum National Park', 'Central'),
(25, 'Lemon Beach Resort', 'Central'),
(26, 'Anomabo Beach Resort', 'Central'),

-- WESTERN REGION
(27, 'Busua Beach', 'Western'),
(28, 'Nzulezu Stilt Village', 'Western'),

-- ASHANTI REGION
(29, 'Kumasi', 'Ashanti'),
(30, 'Manhyia Palace', 'Ashanti'),
(31, 'Bonwire Kente Village', 'Ashanti'),

-- NORTHERN REGION
(32, 'Mole National Park', 'Northern'),
(33, 'Zaina Lodge', 'Northern'),
(34, 'Tamale Airport', 'Northern');


-- 7 DAY TOUR
INSERT INTO itinerary_destination (itinerary_id, destination_id, day_number) VALUES
-- Day 1
(1, 2, 1), (1, 1, 1), (1, 3, 1),

-- Day 2
(1, 4, 2), (1, 5, 2), (1, 6, 2), (1, 7, 2),

-- Day 3
(1, 11, 3), (1, 12, 3), (1, 13, 3), (1, 14, 3),

-- Day 4
(1, 9, 4),

-- Day 5
(1, 15, 5), (1, 16, 5), (1, 17, 5), (1, 18, 5),

-- Day 6
(1, 22, 6), (1, 23, 6), (1, 25, 6),

-- Day 7
(1, 1, 7), (1, 2, 7);


-- 11 DAY TOUR
INSERT INTO itinerary_destination (itinerary_id, destination_id, day_number) VALUES
                                                                                 (2, 2, 1), (2, 3, 1),

                                                                                 (2, 4, 2), (2, 5, 2), (2, 7, 2),

                                                                                 (2, 8, 3), (2, 10, 3),

                                                                                 (2, 11, 4), (2, 12, 4), (2, 13, 4), (2, 14, 4),

                                                                                 (2, 9, 5),

                                                                                 (2, 15, 6), (2, 16, 6), (2, 17, 6),

                                                                                 (2, 9, 7),

                                                                                 (2, 22, 8), (2, 23, 8),

                                                                                 (2, 24, 9), (2, 25, 9),

                                                                                 (2, 1, 10),

                                                                                 (2, 2, 11);

-- 14 DAY TOUR
INSERT INTO itinerary_destination (itinerary_id, destination_id, day_number) VALUES
                                                                                 (3, 2, 1), (3, 3, 1),

                                                                                 (3, 4, 2), (3, 5, 2), (3, 7, 2),

                                                                                 (3, 8, 3),

                                                                                 (3, 22, 4), (3, 26, 4),

                                                                                 (3, 22, 5), (3, 23, 5), (3, 24, 5),

                                                                                 (3, 27, 6),

                                                                                 (3, 28, 7),

                                                                                 (3, 15, 8),

                                                                                 (3, 19, 9), (3, 20, 9), (3, 21, 9),

                                                                                 (3, 29, 10),

                                                                                 (3, 30, 11), (3, 31, 11),

                                                                                 (3, 32, 12), (3, 33, 12), (3, 34, 12),

                                                                                 (3, 32, 13),

                                                                                 (3, 2, 14);

