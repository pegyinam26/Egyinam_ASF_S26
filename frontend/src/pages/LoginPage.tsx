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
                    className="absolute inset-0 w-full h-full object-cover -translate-y-6"
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

                {/* CENTERED TEXT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-16">

                    {/* TEXT CONTENT (aligned with login box center) */}
                    <div className="absolute w-full top-[18%] text-center px-6 md:px-16">

                        {/* H1 */}
                        <h1
                            className="text-5xl md:text-7xl font-black mb-4 text-[#f5e6c8] tracking-wide"
                            style={{ textShadow: "0 6px 25px rgba(0,0,0,0.9)" }}
                        >
                            Discover and Explore Ghana
                        </h1>

                        {/* H2 */}
                        <h2 className="text-lg md:text-2xl font-semibold mb-10 text-white tracking-wide">
                            Adventure • Culture • History
                        </h2>

                    </div>

                    {/* PARAGRAPH */}
                    <p className="w-full px-4 md:px-24 lg:px-40 text-6xl font-bold md:text-xl leading-relaxed text-amber-100 drop-shadow-md mt-20" style={{fontFamily: "cursive" }}>
                        Ghana offers a powerful mix of history, culture, and natural beauty in one unforgettable trip. From the vibrant energy of Accra to the historic Cape Coast Castle, every destination tells a story. Explore rainforest canopy walks in Kakum National Park, relax on scenic beaches, and experience wildlife in Mole National Park. Known for its safety and warm hospitality, Ghana is the perfect introduction to West Africa.
                    </p>

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