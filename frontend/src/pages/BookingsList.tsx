import { useEffect, useState } from "react";
import PageBackground from "../components/PageBackground";

export default function BookingsList() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const [page, setPage] = useState(1);
    const perPage = 10;

    const fetchBookings = () => {
        fetch("http://localhost:8080/api/bookings")
            .then(res => res.json())
            .then(setBookings);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // FILTER
    const filteredBookings = bookings.filter((b) => {
        const name = `${b.user?.fname || ""} ${b.user?.lname || ""}`.toLowerCase();
        return name.includes(search.toLowerCase());
    });

    // PAGINATION
    const totalPages = Math.ceil(filteredBookings.length / perPage);

    const paginatedBookings = filteredBookings.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // SIMPLE CHART DATA
    const stats = {
        CONFIRMED: bookings.filter(b => b.status === "CONFIRMED").length,
        PENDING: bookings.filter(b => b.status === "PENDING").length,
        CANCELLED: bookings.filter(b => b.status === "CANCELLED").length,
    };

    // START EDIT
    const handleEdit = (b: any) => {
        setEditingId(b.id);
        setEditForm(JSON.parse(JSON.stringify(b)));
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

            alert("Booking updated!");
            setEditingId(null);
            fetchBookings();

        } catch (err) {
            alert("Failed to update booking");
        }
    };

    // DELETE
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this booking?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:8080/api/bookings/${id}`, {
                method: "DELETE",
            });

            alert("Booking deleted!");
            fetchBookings();
        } catch (err) {
            alert("Delete failed!");
        }
    };

    return (
        <PageBackground>

            <h1 className="text-4xl font-bold text-center text-amber-700 mb-4">
                Booking Dashboard
            </h1>

            {/* CHARTS */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded shadow text-center">
                        <p className="text-sm">{key}</p>
                        <div className="h-2 bg-gray-200 mt-2">
                            <div
                                className="h-2 bg-blue-500"
                                style={{ width: `${value * 20}px` }}
                            />
                        </div>
                        <p className="mt-2 font-bold">{value}</p>
                    </div>
                ))}
            </div>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search by first or last name..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                className="border p-2 rounded w-1/3 mb-4"
            />

            {/* TABLE */}
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
                {paginatedBookings.map((b) => (
                    <tr key={b.id} className="border text-center">

                        <td className="p-2">
                            {editingId === b.id ? (
                                <input
                                    value={editForm.user?.fname}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            user: { ...editForm.user, fname: e.target.value }
                                        })
                                    }
                                />
                            ) : b.user?.fname}
                        </td>

                        <td className="p-2">
                            {editingId === b.id ? (
                                <input
                                    value={editForm.user?.lname}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            user: { ...editForm.user, lname: e.target.value }
                                        })
                                    }
                                />
                            ) : b.user?.lname}
                        </td>

                        <td>{b.itinerary?.title}</td>
                        <td>{b.booking_date}</td>

                        <td>
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
                            ) : b.travel_start_date}
                        </td>

                        <td>
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
                                    <option>PENDING</option>
                                    <option>CONFIRMED</option>
                                    <option>CANCELLED</option>
                                </select>
                            ) : b.status}
                        </td>

                        <td className="space-x-2">
                            {editingId === b.id ? (
                                <>
                                    <button onClick={handleUpdate} className="text-green-600">💾</button>
                                    <button onClick={() => setEditingId(null)} className="text-red-600">❌</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEdit(b)} className="text-blue-600">✏️</button>
                                    <button onClick={() => handleDelete(b.id)} className="text-red-600">🗑</button>
                                </>
                            )}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    Prev
                </button>

                <span>{page} / {totalPages}</span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div>

        </PageBackground>
    );
}