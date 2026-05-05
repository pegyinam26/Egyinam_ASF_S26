import { useState } from "react";
import DayCarousel from "./DayCarousel";
import { useNavigate } from "react-router-dom";

export default function TourSection({ tour }: any) {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="mb-20">

            {/* TITLE + CTA (centered together) */}
            <div className="flex justify-center items-center gap-4 mb-6">

                <h2 className="text-3xl font-bold">
                    {tour.title}
                </h2>
                {/* Book Now CTA*/}
                <button
                    onClick={() => navigate("/booking")}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md text-sm md:text-base transition"
                >
                    Book Now
                </button>

            </div>

            {/* DAY SELECTOR */}
            <div className="flex gap-2 overflow-x-auto mb-6 justify-center">
                {tour.days.map((d: any, i: number) => (
                    <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`px-3 py-1 rounded transition ${
                            selected === i
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        Day {d.day}
                    </button>
                ))}
            </div>

            {/* ACTIVE DAY */}
            <DayCarousel day={tour.days[selected]} />

        </div>
    );
}