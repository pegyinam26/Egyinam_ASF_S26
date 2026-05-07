import TourSection from "../components/TourSection";
import { tours } from "../data/tours";
import PageBackground from "../components/PageBackground";


export default function ItineraryPage() {
    return (
        <PageBackground>

            {/* CONTENT */}
            <div className="text-center mb-20">

                <h1 className="
                    text-5xl md:text-7xl font-black text-emerald-900 mb-6 tracking-wide
                ">
                    Tour Itineraries
                </h1>

                <p className="
                    text-gray-900 text-lg md:text-2xl max-w-4xl pb-10 mx-auto leading-relaxed
                ">
                    Discover curated luxury experiences across Ghana —
                    from vibrant cities and coastal history to rainforest
                    adventures and unforgettable safari journeys.
                </p>

                {tours.map((tour, index) => (
                    <TourSection key={index} tour={tour} />
                ))}

            </div>

        </PageBackground>
    );
}