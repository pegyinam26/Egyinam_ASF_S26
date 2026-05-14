import { useEffect, useState } from "react";
import PageBackground from "../components/PageBackground";
import { Pencil, Save, X, CalendarDays } from "lucide-react";

//displays current bookings for a logged in regular user.
export default function MyBookings() {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [bookings, setBookings] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [message, setMessage] = useState("");

    const fetchMyBookings = () => {
        if (!user?.id) return;

        fetch(`http://localhost:8080/api/bookings/user/${user.id}`)
            .then((res) => res.json())
            .then(setBookings)
            .catch((err) => {
                console.error("Failed to fetch bookings:", err);
                setMessage("Unable to load your bookings.");
            });
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const handleEdit = (booking: any) => {
        setEditingId(booking.id);

        setEditForm({
            ...booking,
            user: {
                ...booking.user,
            },
            itinerary: {
                ...booking.itinerary,
            },
        });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...editForm,

                // regular user can only update these values
                travel_start_date: editForm.travel_start_date,

                user: {
                    ...editForm.user,
                    fname: editForm.user?.fname,
                    lname: editForm.user?.lname,
                },

                // preserve current status from database/form
                status: editForm.status,
            };

            const res = await fetch(
                `http://localhost:8080/api/bookings/${editForm.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err);
            }

            setEditingId(null);
            setMessage("Booking updated successfully.");
            fetchMyBookings();
        } catch (err) {
            console.error(err);
            setMessage("Failed to update booking.");
        }
    };

    return (
        <PageBackground>
            <div className="w-full max-w-6xl mx-auto px-0 sm:px-4 lg:px-6 py-6 md:py-10">

                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-amber-900 mb-4">
                        My Bookings
                    </h1>

                    <p className="text-amber-900 text-base md:text-lg">
                        View your Ghana travel reservations and update your travel details.
                    </p>
                </div>

                {message && (
                    <div className="mb-6 text-center text-amber-900 bg-white/30 rounded-xl py-3">
                        {message}
                    </div>
                )}

                {bookings.length === 0 ? (
                    <div className="bg-black/50 border border-amber-400/20 rounded-[32px] p-10 text-center shadow-2xl">
                        <h2 className="text-2xl font-black text-amber-200 mb-3">
                            No bookings found
                        </h2>

                        <p className="text-amber-50/80">
                            You have not created any bookings yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="
                                    bg-gradient-to-br
                                    from-black/70
                                    via-gray-900/60
                                    to-amber-950/30
                                    border border-amber-400/20
                                    rounded-[32px]
                                    shadow-2xl
                                    p-6
                                "
                            >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-amber-300 mb-2">
                                            Traveler
                                        </p>

                                        {editingId === booking.id ? (
                                            <div className="space-y-2">
                                                <input
                                                    value={editForm.user?.fname || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            user: {
                                                                ...editForm.user,
                                                                fname: e.target.value,
                                                            },
                                                        })
                                                    }
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                                />

                                                <input
                                                    value={editForm.user?.lname || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            user: {
                                                                ...editForm.user,
                                                                lname: e.target.value,
                                                            },
                                                        })
                                                    }
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-amber-50 font-bold text-lg">
                                                {booking.user?.fname} {booking.user?.lname}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-amber-300 mb-2">
                                            Itinerary
                                        </p>

                                        <p className="text-amber-50">
                                            {booking.itinerary?.title}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-amber-300 mb-2">
                                            Travel Date
                                        </p>

                                        {editingId === booking.id ? (
                                            <input
                                                type="date"
                                                value={editForm.travel_start_date || ""}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        travel_start_date: e.target.value,
                                                    })
                                                }
                                                className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                            />
                                        ) : (
                                            <p className="flex items-center gap-2 text-amber-50">
                                                <CalendarDays size={16} />
                                                {booking.travel_start_date}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col md:items-end gap-4">
                                        <span
                                            className={`
                                                px-4 py-2
                                                rounded-full
                                                text-xs
                                                font-bold
                                                w-fit
                                                ${
                                                booking.status === "CONFIRMED"
                                                    ? "bg-emerald-500/20 text-emerald-200"
                                                    : booking.status === "PENDING"
                                                        ? "bg-amber-500/20 text-amber-200"
                                                        : "bg-red-500/20 text-red-200"
                                            }
                                            `}
                                        >
                                            {booking.status}
                                        </span>

                                        {editingId === booking.id ? (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleUpdate}
                                                    className="text-emerald-300 hover:scale-110 transition"
                                                >
                                                    <Save size={22} />
                                                </button>

                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="text-red-400 hover:scale-110 transition"
                                                >
                                                    <X size={22} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(booking)}
                                                className="text-amber-300 hover:scale-110 transition"
                                            >
                                                <Pencil size={22} />
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageBackground>
    );
}