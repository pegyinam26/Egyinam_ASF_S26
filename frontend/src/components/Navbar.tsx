import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("role");
        navigate("/");
    };

    const isActive = (path: string) =>
        location.pathname === path
            ? "text-yellow-400"
            : "text-gray-300 hover:text-white";

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-wide hover:text-yellow-400 transition"
                    >
                        🇬🇭 Ghana Vacation Tours
                    </Link>

                    {role === "USER" && (
                        <Link
                            to="/booking"
                            className={`transition ${isActive("/booking")}`}
                        >
                            Book a Trip
                        </Link>
                    )}

                    {role === "ADMIN" && (
                        <Link
                            to="/admin"
                            className={`transition ${isActive("/admin")}`}
                        >
                            Admin Panel
                        </Link>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    {/* ROLE BADGE */}
                    {role && (
                        <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            Welcome, {role === "ADMIN" ? "Admin" : "User"}
                        </span>
                    )}

                    {/* LOGOUT BUTTON */}
                    {role && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 transition px-4 py-1.5 rounded-md text-sm font-medium shadow-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>

            </div>
        </nav>
    );
}