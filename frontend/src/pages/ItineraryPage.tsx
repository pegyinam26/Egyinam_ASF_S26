import TourSection from "../components/TourSection";
import { tours } from "../data/tours";
import PageBackground from "../components/PageBackground";


export default function ItineraryPage() {
    return (
        <PageBackground>
            <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
            {/* CONTENT */}
            <div className="text-center mb-20">

                <h1 className="
                    {/*text-5xl md:text-7xl */}
                    text-3xl sm:text-5xl md:text-7xl
                    font-black
                    text-emerald-900
                    mb-6 tracking-wide
                ">
                    Tour Itineraries
                </h1>

                <p className="
                    text-gray-900 text-base sm:text-lg md:text-2xl max-w-4xl pb-10 mx-auto leading-relaxed
                ">
                    Discover curated luxury experiences across Ghana —
                    from vibrant cities and coastal history to rainforest
                    adventures and unforgettable safari journeys.
                </p>

                {tours.map((tour, index) => (
                    <TourSection key={index} tour={tour} />
                ))}

            </div>
            </div>
        </PageBackground>
    );
}