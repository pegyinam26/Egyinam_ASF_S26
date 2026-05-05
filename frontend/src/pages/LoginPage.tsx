import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import frontCover from "../assets/FRONT_COVER.jpg";
import promoVideo from "../assets/promo.mp4";

export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role) navigate("/itinerary");
    }, []);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.overflowX = "hidden";
        document.body.style.margin = "0";
    }, []);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error();

            const data = await res.json();

            localStorage.setItem("role", data.role);
            navigate(data.role === "ADMIN" ? "/admin" : "/itinerary");

        } catch {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="w-full min-h-screen overflow-x-hidden">

            {/* HERO VIDEO SECTION */}
            <div className="relative w-full min-h-screen overflow-hidden">

                {/* VIDEO BACKGROUND */}
                <video
                    src={promoVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full brightness-60 contrast-60 object-cover -translate-y-7"
                />

                {/* GRADIENT OVERLAY */}
                <div className="bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-brightness-100" />

                {/* CENTERED TEXT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-16">

                    {/* TEXT CONTENT (aligned with login box center) */}
                    <div className="absolute w-full top-[12%] text-center px-6 md:px-16">

                        {/* H1 */}
                        <h1
                            className="text-5xl md:text-7xl font-black mb-4 text-[#f5e6c8] tracking-wide"
                            style={{
                                textShadow: "0 0 60px rgba(255,215,150,0.2), 0 6px 25px rgba(0,0,0,0.9)"
                            }}
                        >
                            Discover and Explore Ghana
                        </h1>

                        {/* H2 */}
                        <h2 className="text-lg md:text-2xl font-semibold mb-10 text-white tracking-wide">
                            Adventure • Culture • History
                        </h2>

                    </div>

                    <div className="text-5xl md:text-4xl font-black mb-4 text-[#f5e6c8] tracking-wide"
                         style={{ textShadow: "0 6px 25px rgba(0,0,0,0.9)" }}
                    >
                        <h3>Why should you visit?</h3>
                    </div>

                    {/* PARAGRAPH */}
                    <div className="w-full flex justify-center mt-6 px-4 md:px-10">
                        <div className="
                            w-full max-w-8xl
                            px-6 md:px-12 py-6 md:py-8
                            rounded-2xl
                            backdrop-blur-md
                            border border-white/20
                            shadow-2xl
                            bg-gradient-to-r from-black/30 via-black/10 to-black/20
                        ">
                            <p className="
                                        text-lg md:text-2xl
                                        leading-relaxed
                                        font-bold text-[#f5e6c8]

                                        drop-shadow-md

                                    " style={{ fontFamily: "cursive" }}>

                                Ghana offers a powerful mix of history, culture, and natural beauty in one unforgettable trip. From the vibrant energy of Accra to the historic Cape Coast Castle, every destination tells a story. Explore rainforest canopy walks in Kakum National Park, relax on scenic beaches, and experience wildlife in Mole National Park. Known for its safety and warm hospitality, Ghana is the perfect introduction to West Africa.

                            </p>

                        </div>
                    </div>

                </div>
                {/* LEFT IMAGE (mirrors login box) */}
                <div className="absolute top-24 left-6 md:left-22 z-44">

                    <div className="w-[220px] h-[310px] bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={frontCover}
                            alt="Front Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>

                {/* LOGIN BOX */}
                <div className="absolute top-28 right-2 md:right-2 z-20">

                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-xl w-[260px] border border-white/30">

                        <h2 className="text-sm font-semibold mb-2 text-center">
                            Login
                        </h2>

                        {error && (
                            <p className="text-red-500 text-xs mb-2 text-center">
                                {error}
                            </p>
                        )}

                        <input
                            name="username"
                            placeholder="Username"
                            className="border p-1.5 w-full mb-2 rounded text-sm"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border p-1.5 w-full mb-2 rounded text-sm"
                            onChange={handleChange}
                        />

                        <button
                            onClick={handleLogin}
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-1.5 rounded text-sm"
                        >
                            Login
                        </button>

                    </div>
                </div>

            </div>

        </div>
    );
}