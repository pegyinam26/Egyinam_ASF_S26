import TourSection from "../components/TourSection";
import { tours } from "../data/tours";
import PageBackground from "../components/PageBackground";





export default function ItineraryPage() {
    return (
        <PageBackground>

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

        </PageBackground>
    );
}