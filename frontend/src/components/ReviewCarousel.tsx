import { useState } from "react";
import { reviews } from "../data/reviews";
import { ChevronLeft, ChevronRight } from "lucide-react";

//displays all the reviews hard-coded in the reviews.ts data file and displays and paginates through them
export default function ReviewCarousel() {

    const [index, setIndex] = useState(0);

    const next = () =>
        setIndex((prev) =>
            (prev + 1) % reviews.length
        );

    const prev = () =>
        setIndex((prev) =>
            (prev - 1 + reviews.length) % reviews.length
        );

    const review = reviews[index];

    return (

        <div className="relative max-w-4xl mx-auto py-20">

            {/* SECTION TITLE */}
            <div className="text-center mb-12">

                <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-6"
                    style={{
                        color: "#e4cb89",
                        textShadow: "0 6px 25px rgba(0,0,0,1)"
                    }}
                >
                    Traveler Experiences
                </h2>

                <p className="
                    text-amber-90/80
                    text-lg
                ">
                    Hear what our guests have to say about their
                    Ghana journey.
                </p>

            </div>

            {/* REVIEW CARD */}
            <div className="relative">

                {/* SPEECH BUBBLE */}
                <div className="
                    relative
                    bg-gradient-to-br
                    from-black/60
                    via-gray-900/50
                    to-amber-950/20
                    backdrop-blur-xl
                    border border-white/10
                    rounded-[40px]
                    p-10 md:p-14
                    shadow-2xl
                    text-center
                ">

                    {/* QUOTE-shows each individual review on the review card */}
                    <p className="
                        text-xl md:text-2xl
                        text-amber-50
                        leading-relaxed
                        italic
                        mb-10
                    ">
                        “{review.text}”
                    </p>

                    {/* STARS - displaying review rating from 1-5 stars */}
                    <div className="
                        flex
                        justify-center
                        gap-3
                        mb-8
                    ">

                        {[1,2,3,4,5].map((star) => (

                            <div
                                key={star}
                                className={`
                                    w-5 h-5
                                    rounded-full
                                    border-2
                                    transition-all
                                    ${
                                    star <= review.rating
                                        ? "bg-amber-400 border-amber-300 shadow-lg"
                                        : "border-gray-500"
                                }
                                `}
                            />

                        ))}

                    </div>

                    {/* USER */}
                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-amber-200
                        font-semibold
                        text-lg
                    ">

                        <span className="text-xl">
                            {review.flag}
                        </span>
                        <span>
                             • {review.name}
                        </span>

                        <span className="
                            text-sm
                            text-amber-100/90
                            font-normal
                        ">
                            • {review.country}
                        </span>

                    </div>

                    {/* SPEECH BUBBLE TAIL */}
                    <div className="
                        absolute
                        -bottom-5
                        left-1/2
                        -translate-x-1/2
                        w-10 h-10
                        bg-black/70
                        rotate-45
                        border-r border-b border-white/10
                    " />

                </div>

            </div>

            <div className="
                flex
                justify-center
                gap-10
                mt-12
            ">

                {/* PREV */}
                <button
                    onClick={prev} className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    w-20 h-20
                    rounded-full
                    bg-white/10
                    hover:bg-white/20
                    text-amber-700
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:scale-105
                    border border-white/10"
                >

                <span className="text-2xl mb-1">
                    <ChevronLeft size={28}/>
                </span>
                    <span className="
                        text-xs
                        uppercase
                        tracking-widest
                    ">
                        Prev
                    </span>

                </button>

                {/* NEXT */}
                <button
                    onClick={next} className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    w-20 h-20
                    rounded-full
                    bg-white/10
                    hover:bg-white/20
                    text-amber-700
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:scale-105
                    border border-white/10"
                >
                <span className="text-2xl mb-1">
                   < ChevronRight size={28}/>
                </span>
                    <span className="
                        text-xs
                        uppercase
                        tracking-widest
                    ">
                        Next
                    </span>

                </button>

            </div>
        </div>
    );
}