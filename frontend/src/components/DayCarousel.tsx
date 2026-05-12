import { useState } from "react";

export default function DayCarousel({ day }: any) {

    const [index, setIndex] = useState(0);

    const next = () =>
        setIndex((i: number) => (i + 1) % day.images.length);

    const prev = () =>
        setIndex((i: number) =>
            (i - 1 + day.images.length) % day.images.length
        );

    return (

        // <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-10 md:mb-16">

            {/* IMAGE SECTION */}
            <div className="relative group">

                {/* IMAGE */}
                <div className="overflow-hidden rounded-3xl shadow-2xl">

                    <img
                        key={index}
                        src={`/img/${day.images[index]}`}
                        alt={day.title}
                        // className="
                        //     w-full
                        //     h-[520px]
                        //     object-contain
                        //     bg-blend-darken
                        //     transition-all
                        //     duration-700
                        //     group-hover:scale-105
                        // "
                        className="
                            w-full
                            h-[280px] sm:h-[360px] lg:h-[520px]
                            object-contain
                            bg-blend-darken
                            transition-all
                            duration-700
                            group-hover:scale-105
                        "
                    />

                </div>

                {/* DARK OVERLAY */}
                <div className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/60
                    via-black/10
                    to-transparent
                    rounded-3xl
                " />

                {/* DAY BADGE */}
                <div className="
                    absolute top-5 left-5
                    bg-yellow-500
                    text-black
                    font-black
                    px-5 py-2
                    rounded-full
                    shadow-xl
                    text-sm md:text-base
                ">
                    Day {day.day}
                </div>

                {/* IMAGE COUNTER */}
                <div className="
                    absolute bottom-5 right-5
                    bg-black/60
                    text-white
                    px-4 py-1
                    rounded-full
                    text-sm
                    backdrop-blur-md
                ">
                    {index + 1} / {day.images.length}
                </div>

                {/* NAV BUTTONS */}
                <button
                    onClick={prev}
                    className="
                        absolute left-4 top-1/2 -translate-y-1/2
                        bg-black/50 hover:bg-black/70
                        text-white
                        {/*w-12 h-12*/}
                        w-9 h-9 sm:w-12 sm:h-12
                        rounded-full
                        backdrop-blur-md
                        transition
                    "
                >
                    ◀
                </button>

                <button
                    onClick={next}
                    className="
                        absolute right-4 top-1/2 -translate-y-1/2
                        bg-black/50 hover:bg-black/70
                        text-white
                        {/*w-12 h-12*/}
                        w-9 h-9 sm:w-12 sm:h-12
                        rounded-full
                        backdrop-blur-md
                        transition
                    "
                >
                    ▶
                </button>

            </div>

            {/* DESCRIPTION CARD */}
            <div className="
                bg-white/10
                backdrop-blur-xl
                border border-white/20
                rounded-3xl
                {/*p-8 md:p-10*/}
                p-5 sm:p-8 md:p-10
                shadow-2xl
                relative
                overflow-hidden
            ">

                {/* GLOW */}
                <div className="
                    absolute -top-20 -right-20
                    w-56 h-56
                    bg-yellow-400/10
                    rounded-full
                    blur-3xl
                " />

                {/* TITLE */}
                <h2 className="
                    {/*text-3xl md:text-4xl*/}
                    text-2xl sm:text-3xl md:text-4xl
                    font-black
                    text-amber-700
                    mb-6
                    leading-tight
                ">
                    {day.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="
                    text-gray-800
                    leading-8
                    text-base md:text-lg
                    whitespace-pre-line
                ">
                    {day.description}
                </p>

                {/* EXPERIENCE TAGS */}
                <div className="flex flex-wrap gap-3 mt-8">

                    <span className="
                        bg-yellow-500/20
                        text-amber-900
                        px-4 py-1
                        rounded-full
                        text-sm
                    ">
                        Adventure
                    </span>

                    <span className="
                        bg-blue-500/20
                        text-amber-900
                        px-4 py-1
                        rounded-full
                        text-sm
                    ">
                        Culture
                    </span>

                    <span className="
                        bg-green-500/20
                        text-amber-900
                        px-4 py-1
                        rounded-full
                        text-sm
                    ">
                        Experience
                    </span>

                </div>

            </div>

        </div>
    );
}