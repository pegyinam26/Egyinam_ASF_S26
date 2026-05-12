import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import PageBackground from "../components/PageBackground";
import ReviewCarousel from "../components/ReviewCarousel";
import adinkraAll from "../assets/adinkra_all.jpg";

/* ===================== IMAGE GROUPS ===================== */

function generateTourImages(tour: string, dayCounts: number[]) {
    const images: string[] = [];

    dayCounts.forEach((count, dayIndex) => {
        for (let i = 1; i <= count; i++) {
            images.push(`/img/${tour}/day${dayIndex + 1}-${i}.jpg`);
        }
    });

    return images;
}

/* DEFINE HOW MANY IMAGES EACH DAY HAS */

const tourImages: any = {
    "7": generateTourImages("7", [5, 6, 5, 4, 5, 4,2]),
    "11": generateTourImages("11", [4, 6, 5, 4, 5, 6, 3, 3, 5, 3, 4]),
    "14": generateTourImages("14", [4, 6, 6, 4, 6, 3, 3, 4, 5, 3, 5, 3, 5, 3])
};

/* ===================== PAGE COMPONENT ===================== */

function Page({ img, index, total }: any) {
    return (
        <div className="w-full h-full bg-white flex flex-col justify-between items-center rounded-lg shadow-2xl p-6">

            {/* IMAGE */}
            <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="max-h-[95%] max-w-full object-contain rounded-lg
                     transition-all duration-700
                     opacity-0 animate-[fadeIn_0.6s_forwards]
                     hover:scale-105"
                />
            </div>

            {/* PAGE NUMBER */}
            <div className="text-center text-sm text-gray-500 mt-4">
                Page {index + 1} / {total}
            </div>

        </div>
    );
}

/* ===================== COVER ===================== */

function Cover({ title }: any) {

    return (

        <div className="
            w-full
            h-full
            overflow-hidden
            rounded-lg
            shadow-2xl
            relative
            bg-gradient-to-br
            from-black
            via-gray-900
            to-amber-950
        ">

            {/* GOLDEN OVERLAY GLOW */}
            <div className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_35%)]
                pointer-events-none
            " />

            {/* MAIN CONTENT */}
            <div className="
                relative
                z-10
                h-full
                flex
                items-center
                justify-between
                px-8
                py-10
                gap-8
            ">

                {/* LEFT SIDE IMAGE */}
                <div className="
                    w-[42%]
                    h-full
                    flex
                    items-center
                    justify-center
                ">

                    <div className="
                        relative
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-amber-300/30
                        bg-white/5
                        backdrop-blur-md
                        shadow-[0_0_35px_rgba(251,191,36,0.18)]
                        p-3
                    ">

                        <img
                            src={adinkraAll}
                            alt="Adinkra Symbols"
                            className="
                                w-full
                                h-[320px]
                                object-contain
                                rounded-2xl
                                transition-all
                                duration-700
                                hover:scale-105
                            "
                        />

                    </div>

                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className="
                    w-[58%]
                    flex
                    flex-col
                    justify-center
                    items-center
                    text-center
                ">

                    {/* SMALL LABEL */}
                    <p className="
                        text-xs
                        uppercase
                        tracking-[0.35em]
                        text-amber-300
                        mb-4
                    ">
                        Ghana Vacation Tours LLC
                    </p>

                    {/* TITLE */}
                    <h2
                        className="
                            text-3xl
                            md:text-4xl
                            font-black
                            leading-tight
                            px-2
                        "
                        style={{
                            color: "#f5d27a",
                            textShadow: "0 6px 25px rgba(0,0,0,1)"
                        }}
                    >
                        {title}
                    </h2>

                    {/* DIVIDER */}
                    <div className="
                        w-28
                        h-[2px]
                        bg-gradient-to-r
                        from-transparent
                        via-amber-400
                        to-transparent
                        my-6
                    " />

                    {/* SUBTEXT */}
                    <p
                        className="
                            text-base
                            text-amber-50/80
                            leading-8
                            max-w-sm
                        "
                        style={{
                            fontFamily: "cursive"
                        }}
                    >
                        Explore unforgettable cultural journeys,
                        awe-inspiring experiences, breathtaking landscapes,
                        and immersive adventures across Ghana.
                    </p>

                    {/* BOTTOM BADGE */}
                    <div className="
                        mt-8
                        px-5
                        py-2
                        rounded-full
                        border
                        border-amber-300/30
                        bg-white/5
                        text-amber-200
                        text-sm
                        tracking-wide
                        shadow-lg
                    ">
                        Culture • Heritage • Adventure
                    </div>

                </div>

            </div>

        </div>

    );
}

/* ===================== MAIN ===================== */

export default function GalleryPage() {
    const [selectedTour, setSelectedTour] = useState("7");
    const flipBookRef = useRef<any>(null);

    const images = tourImages[selectedTour];

    /* NAVIGATION */
    const nextPage = () => {
        flipBookRef.current?.pageFlip().flipNext();
    };

    const prevPage = () => {
        flipBookRef.current?.pageFlip().flipPrev();
    };


    return (
        <PageBackground>

            {/* TITLE */}
            <h1
                // className="text-5xl md:text-6xl font-extrabold text-center mb-6"
                className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-6"
                style={{
                    color: "#e4cb89",
                    textShadow: "0 6px 25px rgba(0,0,0,1)"
                }}
            >
                Tour Gallery
            </h1>

            {/* TOUR SELECTOR */}
            {/*<div className="flex justify-center gap-4 mb-8">*/}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                {["7", "11", "14"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setSelectedTour(t)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            selectedTour === t
                                ? "bg-yellow-600 text-white scale-105 shadow-md"
                                : "bg-white/80 hover:bg-white"
                        }`}
                    >
                        {t}-Day Tour
                    </button>
                ))}
            </div>

            {/* BOOK WITH ARROWS */}
            {/*<div className="flex justify-center items-center gap-4 min-h-[70vh]">*/}
            <div className="flex justify-center items-center gap-2 sm:gap-4 min-h-[60vh] overflow-x-hidden">

                {/* LEFT ARROW */}
                <button
                    onClick={prevPage}
                    className="h-[180px] sm:h-[260px] w-8 sm:w-10 self-center flex items-center justify-center
                     bg-black/40 hover:bg-black/70 text-white text-2xl
                     rounded-l-lg transition hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                >
                    ◀
                </button>


                {/* BOOK */}
                <HTMLFlipBook
                    ref={flipBookRef}
                    key={selectedTour} // resets on tour change
                    // width={420}
                    // height={520}
                    width={320}
                    height={440}
                    size="stretch"
                    // minWidth={300}
                    // maxWidth={600}
                    // minHeight={400}
                    minWidth={280}
                    maxWidth={600}
                    minHeight={360}
                    maxHeight={650}
                    showCover={true}
                    flippingTime={800}
                    useMouseEvents={false} // disable click flip
                    className="shadow-2xl"
                >

                    {/* COVER */}
                    <div>
                        <Cover title={`${selectedTour}-Day Tour Experience`} />
                    </div>

                    {/* PAGES */}
                    {images.map((img: string, index: number) => (
                        <div key={index}>
                            <Page
                                img={img}
                                index={index}
                                total={images.length}
                            />
                        </div>
                    ))}

                </HTMLFlipBook>

                {/* RIGHT ARROW */}
                <button
                    onClick={nextPage}
                    className="h-[180px] sm:h-[260px] w-8 sm:w-10 self-center flex items-center justify-center
                     bg-black/40 hover:bg-black/70 text-white text-2xl
                     rounded-r-lg transition hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                >
                    ▶
                </button>

            </div>

            <ReviewCarousel/>
        </PageBackground>
    );
}