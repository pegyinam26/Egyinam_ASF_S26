import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import frontCover from "../assets/FRONT_COVER.jpg";
import promoVideo from "../assets/promo.mp4";

import { loginUser, registerUser } from "../services/api";

export default function LoginPage() {

    const navigate = useNavigate();

    // MODE
    const [isRegister, setIsRegister] = useState(false);

    // FORM
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // ERROR
    const [error, setError] = useState("");

    // SUCCESS
    const [success, setSuccess] = useState("");

    // AUTO REDIRECT IF LOGGED IN
    // useEffect(() => {
    //     const user = localStorage.getItem("user");
    //
    //     if (user) {
    //         navigate("/itinerary");
    //     }
    // }, []);

    // PAGE STYLING
    useEffect(() => {
        document.body.style.overflowX = "hidden";
        document.body.style.margin = "0";
    }, []);

    // ✏HANDLE INPUT
    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // LOGIN
    const handleLogin = async () => {

        try {

            setError("");
            setSuccess("");

            const data = await loginUser({
                email: form.email,
                password: form.password,
            });
            console.log("LOGIN RESPONSE:", data);
            // SAVE USER SESSION
            localStorage.setItem("user", JSON.stringify(data));

            // REDIRECT
            navigate(data.role === "ADMIN" ? "/admin" : "/itinerary");

        } catch (err: any) {
            setError("Invalid email or password");
        }
    };

    // 🆕 REGISTER
    const handleRegister = async () => {

        try {

            setError("");
            setSuccess("");

            // PASSWORD MATCH
            if (form.password !== form.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            await registerUser({
                fname: form.fname,
                lname: form.lname,
                email: form.email,
                password: form.password,
            });

            setSuccess("Account created successfully! Please login.");

            // SWITCH TO LOGIN MODE
            setIsRegister(false);

            // CLEAR PASSWORDS
            setForm({
                ...form,
                password: "",
                confirmPassword: "",
            });

        } catch (err: any) {
            setError("Registration failed");
        }
    };

    return (
        <div className="w-full min-h-screen overflow-x-hidden">

            {/* HERO VIDEO */}
            <div className="relative w-full min-h-screen overflow-hidden">

                {/* VIDEO */}
                <video
                    src={promoVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full brightness-75 contrast-110 object-cover -translate-y-7"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

                {/* CENTER CONTENT */}
                {/*<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-16">*/}
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-[50vh] text-center px-6 md:px-16">
                    {/* TITLE */}
                    <div className="absolute w-full top-[12%] text-center px-6 md:px-16">

                        <h1
                            className="text-5xl md:text-7xl font-black mb-4 text-[#f5e6c8] tracking-wide"
                            style={{
                                textShadow:
                                    "0 0 60px rgba(255,215,150,0.2), 0 6px 25px rgba(0,0,0,0.9)",
                            }}
                        >
                            Discover and Explore Ghana
                        </h1>

                        <h2 className="text-lg md:text-2xl font-semibold mb-10 text-white tracking-wide">
                            Adventure • Culture • History
                        </h2>
                    </div>

                    {/* WHY VISIT */}
                    <div
                        className="text-4xl md:text-5xl font-black mb-6 text-[#f5e6c8] tracking-wide"
                        style={{ textShadow: "0 6px 25px rgba(0,0,0,0.9)" }}
                    >
                        <h3>Why should you visit?</h3>
                    </div>

                    {/* INFO CARD */}
                    <div className="w-full flex justify-center mt-10 px-4 md:px-10">

                        <div
                            className="
                                w-full max-w-[96vw]
                                px-4 md:px-8 py-5
                                rounded-2xl
                                backdrop-blur-md
                                border border-white/20
                                shadow-2xl
                                bg-gradient-to-r from-black/10 via-black/10 to-black/20"
                        >
                            <p
                                className="
                                    text-base md:text-xl
                                    leading-8 md:leading-9
                                    font-bold text-[#f5e6c8]
                                    drop-shadow-md"
                                style={{ fontFamily: "cursive" }}
                            >
                                Ghana offers a powerful mix of history, culture,
                                and natural beauty in one unforgettable trip.
                                From the vibrant energy of Accra to the historic
                                Cape Coast Castle, every destination tells a story.
                                Explore rainforest canopy walks in Kakum National Park,
                                relax on scenic beaches, and experience wildlife in
                                Mole National Park. Known for its safety and warm
                                hospitality, Ghana is the perfect introduction to
                                West Africa.
                            </p>

                        </div>
                    </div>
                </div>

                {/* LEFT IMAGE */}
                <div className="absolute top-8 left-6 md:left-22 z-40">

                    <div className="w-[220px] h-[310px] bg-white rounded-lg shadow-md overflow-hidden">

                        <img
                            src={frontCover}
                            alt="Front Cover"
                            className="w-full h-full object-cover"
                        />

                    </div>
                </div>

                {/* AUTH BOX */}
                <div className="absolute top-6 md:top-10 right-2 md:right-4 z-40">

                    <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-xl w-[250px] ">
                        <div className="text-center mb-4">

                            <h3 className="text-lg font-bold text-gray-800">
                                {isRegister ? "Create Your Account" : "Welcome"}
                            </h3>

                            <p className="text-sm text-gray-600 mt-1">
                                {isRegister
                                    ? "Register to get started with your Ghana adventure."
                                    : "Already a member? Login below."
                                }
                            </p>

                        </div>
                        {/* TOGGLE */}
                        <div className="flex mb-4 rounded overflow-hidden">

                            <button
                                onClick={() => {
                                    setIsRegister(false);
                                    setError("");
                                    setSuccess("");
                                }}
                                className={`w-1/2 py-2 text-sm font-semibold ${
                                    !isRegister
                                        ? "bg-gray-600 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                Sign In
                            </button>

                            <button
                                onClick={() => {
                                    setIsRegister(true);
                                    setError("");
                                    setSuccess("");
                                }}
                                className={`w-1/2 py-2 text-sm font-semibold ${
                                    isRegister
                                        ? "bg-gray-600 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                Register
                            </button>

                        </div>

                        {/* SUCCESS */}
                        {success && (
                            <p className="text-green-600 text-sm mb-3 text-center">
                                {success}
                            </p>
                        )}

                        {/* ERROR */}
                        {error && (
                            <p className="text-red-500 text-sm mb-3 text-center">
                                {error}
                            </p>
                        )}

                        {/* REGISTER FIELDS */}
                        {isRegister && (
                            <>
                                <input
                                    name="fname"
                                    placeholder="First Name"
                                    className="border p-2 w-full mb-2 rounded text-sm"
                                    onChange={handleChange}
                                />

                                <input
                                    name="lname"
                                    placeholder="Last Name"
                                    className="border p-2 w-full mb-2 rounded text-sm"
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        {/* EMAIL */}
                        <input
                            name="email"
                            placeholder="Email"
                            className="border p-2 w-full mb-2 rounded text-sm"
                            onChange={handleChange}
                        />

                        {/* PASSWORD */}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border p-2 w-full mb-2 rounded text-sm"
                            onChange={handleChange}
                        />

                        {/* CONFIRM PASSWORD */}
                        {isRegister && (
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="border p-2 w-full mb-2 rounded text-sm"
                                onChange={handleChange}
                            />
                        )}

                        {/* ACTION BUTTON */}
                        <button
                            onClick={
                                isRegister
                                    ? handleRegister
                                    : handleLogin
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded text-sm font-semibold transition"
                        >
                            {isRegister ? "Create Account" : "Login"}
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}