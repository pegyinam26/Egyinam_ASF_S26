import { useState } from "react";
import DayCarousel from "./DayCarousel";
import { useNavigate } from "react-router-dom";
import GhanaLeafletMap from "./GhanaLeafletMap.tsx";

//component designed to carry and display the dayCarousel and the interactive map from GhanaLeafletMap
export default function TourSection({ tour }: any) {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    return (

        <div className="mb-16 md:mb-28 bg-black/15 backdrop-blur-sm border border-white/10 rounded-[28px] md:rounded-[40px] p-5 sm:p-8 md:p-12 shadow-2xl">
            {/* TITLE + CTA (centered together) */}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-700 tracking-wide text-center">
                    {tour.title}
                </h2>
                {/* Book Now CTA*/}
                <button
                   //ensuring dependency on which user role allows to have itinerary dropdown pre-selected or not
                    onClick={() =>{
                        const user = JSON.parse(localStorage.getItem("user") || "null");

                        if(user?.role === "ADMIN"){
                            navigate("/admin/bookings");
                            return;
                        }

                        navigate("/booking", {
                            state: {
                                itineraryId: tour.duration,
                                itineraryTitle: tour.title,
                            },
                        })
                    }}

                    className="
                            bg-gradient-to-r
                            from-green-500
                            to-emerald-600
                            hover:scale-105
                            hover:shadow-green-500/30
                            text-white
                            px-6 py-3
                            rounded-2xl
                            shadow-xl
                            text-sm md:text-base
                            transition-all
                            duration-300
                            font-bold">
                    Book Now
                </button>

            </div>

            {/* DAY SELECTOR */}
            <div className="flex gap-2 overflow-x-auto mb-6 justify-start sm:justify-center pb-2">
                {tour.days.map((d: any, i: number) => (
                    <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`px-5 py-2 rounded-full transition-all duration-300 font-semibold ${
                            selected === i
                                ? "bg-yellow-500 text-black shadow-lg scale-105"
                                : "bg-white/10 text-amber-700 hover:bg-white/20"
                        }`}
                    >
                        Day {d.day}
                    </button>
                ))}
            </div>

            {/*/!* ACTIVE DAY *!/*/}
                <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                    <DayCarousel day={tour.days[selected]} />
                    <GhanaLeafletMap day={tour.days[selected]} />
                </div>

        </div>
    );
}