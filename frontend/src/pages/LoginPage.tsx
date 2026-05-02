import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import promoVideo from "../assets/promo.mp4";

export default function LoginPage() {
    const navigate = useNavigate();

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
            navigate(data.role === "ADMIN" ? "/admin" : "/booking");

        } catch {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="w-full min-h-screen overflow-x-hidden">

            {/* 🔝 STICKY NAVBAR */}
            {/*<div className="fixed top-0 left-0 w-full z-50 bg-black/60 text-white px-6 md:px-16 py-4 flex justify-between items-center">*/}
            {/*    <h1 className="font-bold text-lg md:text-xl">*/}
            {/*        🇬🇭 Ghana Tours*/}
            {/*    </h1>*/}
            {/*    <span className="text-sm opacity-80">*/}
            {/*        Discover • Explore • Experience*/}
            {/*    </span>*/}
            {/*</div>*/}

            {/* 🎥 HERO VIDEO SECTION */}
            <div className="relative w-full min-h-screen overflow-hidden">

                {/* VIDEO BACKGROUND */}
                <video
                    src={promoVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover -translate-y-6"
                />

                {/* 🌈 GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

                {/* 🧠 CENTERED TEXT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-16">

                    {/* H1 */}
                    <h1 className="text-4xl md:text-6xl font-black mb-8 text-[#f5e6c8] leading-tight tracking-wide"
                        style={{ textShadow: "0 4px 20px rgba(0,0,0,0.85)" }}>
                        Discover and Explore Ghana
                    </h1>

                    {/* H2 */}
                    <h2 className="text-lg md:text-2xl font-semibold mb-6 text-white tracking-wide">
                        Adventure • Culture • History
                    </h2>

                    {/* PARAGRAPH */}
                    <p className="w-full px-4 md:px-24 lg:px-40 text-lg md:text-xl leading-relaxed text-white drop-shadow-md">
                        Ghana offers a powerful mix of history, culture, and natural beauty in one unforgettable trip. From the vibrant energy of Accra to the historic Cape Coast Castle, every destination tells a story. Explore rainforest canopy walks in Kakum National Park, relax on scenic beaches, and experience wildlife in Mole National Park. Known for its safety and warm hospitality, Ghana is the perfect introduction to West Africa.
                    </p>

                </div>

                {/* 🔐 LOGIN BOX */}
                <div className="absolute top-24 right-6 md:right-16 z-40">

                    <div className="bg-white p-4 rounded-lg shadow-md w-[250px]">

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