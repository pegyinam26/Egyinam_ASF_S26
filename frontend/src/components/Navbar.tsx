import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import adinkra1 from "../assets/adinkra4_11.jpg";
import adinkra2 from "../assets/adinkra4_22.jpg";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const role = user?.role;
    const homeDestination =
        role === "ADMIN"
            ? "/admin/bookings"
            : role === "USER"
                ? "/itinerary"
                : "/";

    const handleLogout = () => {
        localStorage.removeItem("user");
        setMenuOpen(false);
        navigate("/");
    };

    const isActive = (path: string) =>
        location.pathname === path
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white";

    const isItinerary = location.pathname === "/itinerary";
    const centerImage = isItinerary ? adinkra2 : adinkra1;

    const shouldShiftAdinkra = location.pathname !== "/";

    return (
        <nav className="bg-gray-900 text-white shadow-md w-full relative z-50">

            <div className="grid grid-cols-3 items-center px-4 md:px-6 py-6">

                {/* LEFT — DESKTOP */}
                <div className="hidden lg:flex items-center gap-6">

                    <Link
                        to={homeDestination}
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

                    {role === "USER" && (
                        <Link
                            to="/my-bookings"
                            className={`whitespace-nowrap transition ${isActive("/my-bookings")}`}
                        >
                            My Bookings
                        </Link>
                    )}

                    {role === "ADMIN" && (
                        <Link to="/admin/bookings" className={`whitespace-nowrap transition ${isActive("/admin/bookings")}`}>
                            Bookings
                        </Link>
                    )}

                    {role === "ADMIN" && (
                        <Link to="/admin/users" className={`whitespace-nowrap transition ${isActive("/admin/users")}`}>
                            Users
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

                {/* LEFT — MOBILE BRAND */}
                <div className="lg:hidden flex items-center">
                    <Link
                        to={homeDestination}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 font-bold tracking-wide hover:text-yellow-400 transition"
                    >
                        <span className="text-3xl">🇬🇭</span>
                        <span className="text-base sm:text-lg whitespace-nowrap">
                            Ghana Vacation Tours
                        </span>
                    </Link>
                </div>

                {/* CENTER — ELITE ADINKRA */}
                <div
                    className={`
                        hidden md:flex justify-center relative group pointer-events-none
                        ${shouldShiftAdinkra ? "lg:ml-80" : ""}
                    `}
                >
                    <div className="absolute w-24 h-24 bg-yellow-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

                    <img
                        src={centerImage}
                        alt="Adinkra Symbol"
                        className="
                            h-12 md:h-12 object-contain
                            transition-all duration-500
                            group-hover:scale-110
                            group-hover:rotate-3
                            drop-shadow-[0_4px_15px_rgba(255,215,0,0.5)]
                        "
                    />

                    <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className="bg-black text-white text-xs px-3 py-1 rounded shadow-md whitespace-nowrap">
                            Adinkra Symbol — Wisdom & Heritage
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex justify-end items-center gap-3 md:gap-4">

                    {role && (
                        <span className="hidden sm:inline-flex bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            {role === "ADMIN" ? "Admin" : "User: " + user.fname}
                        </span>
                    )}

                    {role && (
                        <button
                            onClick={handleLogout}
                            className="hidden lg:inline-flex bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md text-sm font-medium shadow-sm"
                        >
                            Logout
                        </button>
                    )}

                    {/* MOBILE HAMBURGER */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="
                            lg:hidden
                            bg-gray-800
                            hover:bg-gray-700
                            border border-gray-700
                            px-3 py-2
                            rounded-md
                            text-white
                            shadow-sm
                        "
                        aria-label="Toggle navigation menu"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            {menuOpen && (
                <div className="
                    lg:hidden
                    bg-gray-950
                    border-t border-gray-700
                    px-6
                    py-5
                    space-y-4
                    shadow-2xl
                ">

                    {role && (
                        <Link
                            to="/itinerary"
                            onClick={() => setMenuOpen(false)}
                            className={`block transition ${isActive("/itinerary")}`}
                        >
                            Itinerary
                        </Link>
                    )}

                    {role === "USER" && (
                        <Link
                            to="/booking"
                            onClick={() => setMenuOpen(false)}
                            className={`block transition ${isActive("/booking")}`}
                        >
                            Book a Trip
                        </Link>
                    )}

                    {role === "USER" && (
                        <Link
                            to="/my-bookings"
                            onClick={() => setMenuOpen(false)}
                            className={`block transition ${isActive("/my-bookings")}`}
                        >
                            My Bookings
                        </Link>
                    )}

                    {role === "ADMIN" && (
                        <Link
                            to="/admin/bookings"
                            onClick={() => setMenuOpen(false)}
                            className={`block transition ${isActive("/admin/bookings")}`}
                        >
                            Bookings
                        </Link>
                    )}

                    {role === "ADMIN" && (
                        <Link
                            to="/admin/users"
                            onClick={() => setMenuOpen(false)}
                            className={`block transition ${isActive("/admin/users")}`}
                        >
                            Users
                        </Link>
                    )}


                    {role && (
                        <Link
                            to="/gallery"
                            onClick={() => setMenuOpen(false)}
                            className={`block transition ${isActive("/gallery")}`}
                        >
                            Gallery & Reviews
                        </Link>
                    )}

                    <Link
                        to="/about"
                        onClick={() => setMenuOpen(false)}
                        className={`block transition ${isActive("/about")}`}
                    >
                        About Us
                    </Link>

                    {role && (
                        <button
                            onClick={handleLogout}
                            className="
                                w-full
                                text-left
                                bg-red-500
                                hover:bg-red-600
                                px-4 py-2
                                rounded-md
                                text-sm
                                font-medium
                                shadow-sm
                            "
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}

        </nav>
    );
}