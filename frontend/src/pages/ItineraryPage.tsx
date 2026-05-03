import TourSection from "../components/TourSection";
import { tours } from "../data/tours";
import bgImage from "../assets/Itinerary_background.jpg";

export default function ItineraryPage() {
    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

            {/* CONTENT */}
            <div className="relative z-10 p-6 md:p-12">

                <h1 className="text-4xl font-bold text-center mb-6">
                    Ghana Tour Itineraries
                </h1>

                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Choose your perfect experience—from a quick cultural escape to a full
                    journey across Ghana’s beaches, mountains, and wildlife.
                </p>

                {tours.map((tour, index) => (
                    <TourSection key={index} tour={tour} />
                ))}

            </div>

        </div>
    );
}