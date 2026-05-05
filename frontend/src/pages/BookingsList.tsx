import { useEffect, useState } from "react";
import PageBackground from "../components/PageBackground";

export default function BookingsList() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const fetchBookings = () => {
        fetch("http://localhost:8080/api/bookings")
            .then(res => res.json())
            .then(setBookings);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // FILTER LOGIC
    const filteredBookings = bookings.filter((b) => {
        const name = `${b.user?.fname || ""} ${b.user?.lname || ""}`.toLowerCase();
        return name.includes(search.toLowerCase());
    });

    // ✏START EDIT
    const handleEdit = (b: any) => {
        setEditingId(b.id);
        setEditForm(JSON.parse(JSON.stringify(b))); // deep copy
    };

    // SAVE UPDATE
    const handleUpdate = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/bookings/${editForm.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editForm),
                }
            );

            if (!res.ok) throw new Error();

            alert("✅ Booking updated!");
            setEditingId(null);
            fetchBookings();

        } catch (err) {
            console.error(err);
            alert(" Failed to update booking");
        }
    };

    return (
        <PageBackground>

            <h1 className="text-2xl font-bold text-center mb-4">
                All Bookings
            </h1>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search by first or last name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            <table className="w-full border">
                <thead className="bg-gray-200">
                <tr>
                    <th className="p-2">First Name</th>
                    <th className="p-2">Last Name</th>
                    <th className="p-2">Itinerary</th>
                    <th className="p-2">Booking Date</th>
                    <th className="p-2">Travel Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>

                <tbody>
                {filteredBookings.map((b) => (
                    <tr key={b.id} className="border text-center">

                        {/* FIRST NAME */}
                        <td className="p-2">
                            {editingId === b.id ? (
                                <input
                                    value={editForm.user?.fname}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            user: {
                                                ...editForm.user,
                                                fname: e.target.value
                                            }
                                        })
                                    }
                                />
                            ) : (
                                b.user?.fname
                            )}
                        </td>

                        {/* LAST NAME */}
                        <td className="p-2">
                            {editingId === b.id ? (
                                <input
                                    value={editForm.user?.lname}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            user: {
                                                ...editForm.user,
                                                lname: e.target.value
                                            }
                                        })
                                    }
                                />
                            ) : (
                                b.user?.lname
                            )}
                        </td>

                        {/* ITINERARY */}
                        <td className="p-2">{b.itinerary?.title}</td>

                        {/* BOOKING DATE */}
                        <td className="p-2">{b.booking_date}</td>

                        {/* TRAVEL DATE */}
                        <td className="p-2">
                            {editingId === b.id ? (
                                <input
                                    type="date"
                                    value={editForm.travel_start_date}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            travel_start_date: e.target.value
                                        })
                                    }
                                />
                            ) : (
                                b.travel_start_date
                            )}
                        </td>

                        {/* STATUS */}
                        <td className="p-2">
                            {editingId === b.id ? (
                                <select
                                    value={editForm.status}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            status: e.target.value
                                        })
                                    }
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="CONFIRMED">CONFIRMED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                </select>
                            ) : (
                                b.status
                            )}
                        </td>

                        {/* ACTIONS */}
                        <td className="p-2 space-x-2">
                            {editingId === b.id ? (
                                <>
                                    <button
                                        onClick={handleUpdate}
                                        className="text-green-600"
                                    >
                                        💾
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="text-red-600"
                                    >
                                        ❌
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleEdit(b)}
                                    className="text-blue-600"
                                >
                                    ✏️
                                </button>
                            )}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>

        </PageBackground>
    );
}