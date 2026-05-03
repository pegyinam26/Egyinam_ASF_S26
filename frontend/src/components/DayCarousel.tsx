import { useState } from "react";

export default function DayCarousel({ day }: any) {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i: number) => (i + 1) % day.images.length);
    const prev = () =>
        setIndex((i: number) => (i - 1 + day.images.length) % day.images.length);

    return (
        <div className="text-center">

            {/* IMAGE */}
            <div className="relative mb-4 flex justify-center bg-gray-100 p-4 rounded-xl">
                {/*<img*/}
                {/*    src={`/img/${day.images[index]}`}*/}
                {/*    className="w-full h-[350px] object-cover rounded-lg shadow"*/}
                {/*/>*/}
                {/*<div className="relative mb-4 flex justify-center">*/}



                {/*<div className="relative mb-4 flex justify-center bg-gray-100 p-4 rounded-xl">*/}

                {/*    <img*/}
                {/*        key={index}*/}
                {/*        src={`/img/${day.images[index]}`}*/}
                {/*        className="max-h-[500px] w-auto object-contain rounded-lg shadow transition-all duration-500"*/}
                {/*    />*/}

                {/*</div>*/}

                    <img
                        key={index}
                        src={`/img/${day.images[index]}`}
                        alt="ghana-image-goes-here"
                        className="max-h-[500px] w-auto object-contain rounded-lg shadow transition-all duration-500"
                    />

                {/*</div>*/}

                <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 bg-black/50 text-white px-2 py-1 rounded"
                >
                    ◀
                </button>

                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 bg-black/50 text-white px-2 py-1 rounded"
                >
                    ▶
                </button>
            </div>

            {/* TEXT */}
            <h3 className="text-xl font-bold mb-2">
                Day {day.day}: {day.title}
            </h3>

            <p className="text-gray-600 max-w-3xl mx-auto">
                {day.description}
            </p>

            {/* IMAGE COUNTER */}
            <p className="text-sm mt-2 text-gray-400">
                {index + 1} / {day.images.length}
            </p>

        </div>
    );
}