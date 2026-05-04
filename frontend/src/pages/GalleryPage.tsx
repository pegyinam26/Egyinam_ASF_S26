import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import PageBackground from "../components/PageBackground";

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
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white rounded-lg shadow-2xl">

            <h2
                className="text-3xl md:text-4xl font-extrabold text-center px-6"
                style={{
                    color: "#f5d27a",
                    textShadow: "0 6px 25px rgba(0,0,0,1)"
                }}
            >
                {title}
            </h2>

            <p className="mt-4 text-md opacity-80" style={{fontFamily: "cursive" }}>
                Exciting travel adventures for your viewing pleasure...
            </p>

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

    // @ts-ignore
    return (
        <PageBackground>

            {/* TITLE */}
            <h1
                className="text-4xl md:text-5xl font-extrabold text-center mb-6"
                style={{
                    color: "#f5d27a",
                    textShadow: "0 6px 25px rgba(0,0,0,1)"
                }}
            >
                Ghana Tour Gallery
            </h1>

            {/* TOUR SELECTOR */}
            <div className="flex justify-center gap-4 mb-8">
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
            <div className="flex justify-center items-center gap-4 min-h-[70vh]">

                {/* LEFT ARROW */}
                <button
                    onClick={prevPage}
                    className="h-[260px] w-10 self-center flex items-center justify-center
                     bg-black/40 hover:bg-black/70 text-white text-2xl
                     rounded-l-lg transition hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                >
                    ◀
                </button>

                {/* BOOK */}
                <HTMLFlipBook
                    ref={flipBookRef}
                    key={selectedTour} // resets on tour change
                    width={420}
                    height={520}
                    size="stretch"
                    minWidth={300}
                    maxWidth={600}
                    minHeight={400}
                    maxHeight={650}
                    showCover={true}
                    flippingTime={800}
                    useMouseEvents={false} // disable click flip
                    className="shadow-2xl"
                >

                    {/* COVER */}
                    <div>
                        <Cover title={`${selectedTour}-Day Tour Ghanaian Experience`} />
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
                    className="h-[260px] w-10 self-center flex items-center justify-center
                     bg-black/40 hover:bg-black/70 text-white text-2xl
                     rounded-r-lg transition hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                >
                    ▶
                </button>

            </div>

        </PageBackground>
    );
}