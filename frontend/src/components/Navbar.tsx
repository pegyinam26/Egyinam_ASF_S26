import { Link, useNavigate, useLocation } from "react-router-dom";
import adinkra1 from "../assets/adinkra4_11.jpg";
import adinkra2 from "../assets/adinkra4_22.jpg";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const role = user?.role;

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const isActive = (path: string) =>
        location.pathname === path
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white";

    const isItinerary = location.pathname === "/itinerary";
    const centerImage = isItinerary ? adinkra2 : adinkra1;

    const shouldShiftAdinkra =
        location.pathname !== "/";

    return (
        <nav className="bg-gray-900 text-white shadow-md w-full relative">

            <div className="grid grid-cols-3 items-center px-4 md:px-6 py-6">

                {/* LEFT */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="flex items-center gap-2 font-bold tracking-wide hover:text-yellow-400 transition"
                    >
                        <span className="text-4xl">🇬🇭</span>
                        <span className="text-lg md:text-xl whitespace-nowrap">
                            Ghana Vacation Tours
                        </span>
                    </Link>

                    {role && (
                        <Link to="/itinerary" className={`whitespace-nowrap transition ${isActive("/itinerary")}`}>
                            Itinerary
                        </Link>
                    )}

                    {role === "USER" && (
                        <Link to="/booking" className={`whitespace-nowrap transition ${isActive("/booking")}`}>
                            Book a Trip
                        </Link>
                    )}

                    {role === "ADMIN" && (
                        <Link to="/admin" className={`whitespace-nowrap transition ${isActive("/admin")}`}>
                            Admin Panel
                        </Link>
                    )}
                    {role && (
                        <Link
                            to="/gallery"
                            className={`whitespace-nowrap transition ${isActive("/gallery")}`}
                        >
                            Gallery & Reviews
                        </Link>
                    )}
                    <Link
                        to="/about"
                        className={`whitespace-nowrap transition ${isActive("/about")}`}
                    >
                        About Us
                    </Link>
                </div>

                {/* CENTER — ELITE ADINKRA */}
                {/*<div className="flex justify-center relative group ml-10 md:ml-16">*/}
                <div
                    className={`flex justify-center relative group pointer-events-none ${shouldShiftAdinkra ? "ml-24 md:ml-40 lg:ml-56" : ""}`}
                >

                    {/* Glow background */}
                    <div className="absolute w-24 h-24 bg-yellow-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

                    {/* Image */}
                    <img
                        src={centerImage}
                        alt="Adinkra Symbol"
                        className="h-12 md:h-12 object-contain
                                   transition-all duration-500
                                   group-hover:scale-110
                                   group-hover:rotate-3
                                   drop-shadow-[0_4px_15px_rgba(255,215,0,0.5)]"
                    />

                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className="bg-black text-white text-xs px-3 py-1 rounded shadow-md whitespace-nowrap">
                            Adinkra Symbol — Wisdom & Heritage
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex justify-end items-center gap-4">

                    {role && (
                        <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            {role === "ADMIN" ? "Admin" : "User"}
                        </span>
                    )}

                    {role && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md text-sm font-medium shadow-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>

            </div>
        </nav>
    );
}