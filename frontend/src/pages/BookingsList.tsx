import { useEffect, useState } from "react";
import PageBackground from "../components/PageBackground";
import {
    Pencil,
    Trash2,
    Save,
    X,
    Search,
    CalendarDays,
    BadgeCheck,
    Clock3,
    Ban
} from "lucide-react";

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
    const handleEdit = (booking: any) => {

        setEditingId(booking.id);

        setEditForm({

            ...booking,

            user: {
                ...booking.user
            },

            itinerary: {
                ...booking.itinerary
            }

        });
    };

    // SAVE UPDATE
    const handleUpdate = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/bookings/${editForm.id}`,
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
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

            {/*<div className="max-w-7xl mx-auto px-6 py-10">*/}
            <div className="w-full max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 py-6 md:py-10">

                {/* HEADER */}
                <div className="mb-10 text-center">

                    <h1 className="
                    {/*text-5xl md:text-6xl*/}
                    text-3xl sm:text-4xl md:text-6xl
                    font-black
                    text-amber-900
                    mb-4
                ">
                        Booking Dashboard
                    </h1>

                    <p className="
                    text-amber-20/80
                    text-lg
                ">
                        Manage reservations, traveler experiences,
                        and booking activity.
                    </p>

                </div>

                {/* STATS CARDS */}
                <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                mb-10
            ">

                    {/* CONFIRMED */}
                    <div className="
                    bg-gradient-to-br
                    from-emerald-900/40
                    to-black/50
                    border border-emerald-500/20
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-2xl
                ">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-amber-900 text-sm mb-2">
                                    Confirmed
                                </p>

                                <h2 className="
                                text-4xl
                                font-black
                                text-white
                            ">
                                    {stats.CONFIRMED}
                                </h2>

                            </div>

                            <BadgeCheck
                                size={42}
                                className="text-emerald-300"
                            />

                        </div>

                    </div>

                    {/* PENDING */}
                    <div className="
                    bg-gradient-to-br
                    from-amber-900/40
                    to-black/50
                    border border-amber-500/20
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-2xl
                ">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-amber-900 text-sm mb-2">
                                    Pending
                                </p>

                                <h2 className="
                                text-4xl
                                font-black
                                text-white
                            ">
                                    {stats.PENDING}
                                </h2>

                            </div>

                            <Clock3
                                size={42}
                                className="text-amber-300"
                            />

                        </div>

                    </div>

                    {/* CANCELLED */}
                    <div className="
                    bg-gradient-to-br
                    from-red-900/40
                    to-black/50
                    border border-red-500/20
                    backdrop-blur-xl
                    rounded-3xl
                    p-6
                    shadow-2xl
                ">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-amber-900 text-sm mb-2">
                                    Cancelled
                                </p>

                                <h2 className="
                                text-4xl
                                font-black
                                text-white
                            ">
                                    {stats.CANCELLED}
                                </h2>

                            </div>

                            <Ban
                                size={42}
                                className="text-red-300"
                            />

                        </div>

                    </div>

                </div>

                {/* SEARCH */}
                <div className="
                relative
                max-w-md
                mb-8
            ">

                    <Search
                        className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-amber-200
                    "
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search traveler..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="
                        w-full
                        bg-white/10
                        border border-black/40
                        text-amber-900
                        placeholder-amber-900/90
                        rounded-2xl
                        pl-12
                        pr-4
                        py-3
                        backdrop-blur-md
                        shadow-inner
                        focus:outline-none
                        focus:ring-2
                        focus:ring-amber-400
                    "
                    />

                </div>

                {/* TABLE CARD */}
                <div className="
                bg-gradient-to-br
                from-black/60
                via-gray-900/50
                to-amber-950/20
                backdrop-blur-xl
                border border-white/10
                rounded-[32px]
                shadow-2xl
                overflow-hidden
            ">

                    <div className="overflow-x-auto">

                        {/*<table className="w-full">*/}
                        <table className="min-w-[950px] w-full">

                            {/* HEADER */}
                            <thead className="
                            bg-black/40
                            border-b border-white/10
                        ">

                            <tr className="text-amber-200 text-sm uppercase tracking-wider">

                                <th className="p-5 text-left">Traveler</th>
                                <th className="p-5 text-left">Itinerary</th>
                                <th className="p-5 text-left">Booking Date</th>
                                <th className="p-5 text-left">Travel Date</th>
                                <th className="p-5 text-left">Status</th>
                                <th className="p-5 text-center">Actions</th>

                            </tr>

                            </thead>

                            {/* BODY */}
                            <tbody>

                            {paginatedBookings.map((b, idx) => (

                                <tr
                                    key={b.id}
                                    className={`
                                    border-b border-white/5
                                    hover:bg-white/5
                                    transition-all
                                    duration-200
                                    ${idx % 2 === 0
                                        ? "bg-black/10"
                                        : "bg-transparent"}
                                `}
                                >

                                    {/* NAME */}
                                    <td className="p-5 text-amber-50">

                                        {editingId === b.id ? (

                                            <div className="space-y-2">

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
                                                    className="
                                                    w-full
                                                    bg-black/30
                                                    border border-white/10
                                                    rounded-xl
                                                    px-3 py-2
                                                    text-white
                                                "
                                                />

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
                                                    className="
                                                    w-full
                                                    bg-black/30
                                                    border border-white/10
                                                    rounded-xl
                                                    px-3 py-2
                                                    text-white
                                                "
                                                />

                                            </div>

                                        ) : (

                                            <div>

                                                <p className="font-semibold">
                                                    {b.user?.fname} {b.user?.lname}
                                                </p>

                                                <p className="
                                                text-xs
                                                text-gray-100
                                            ">
                                                    Booking #{b.id}
                                                </p>

                                            </div>

                                        )}

                                    </td>

                                    {/* ITINERARY */}
                                    <td className="
                                    p-5
                                    text-gray-200
                                    font-medium
                                ">
                                        {b.itinerary?.title}
                                    </td>

                                    {/* BOOKING DATE */}
                                    <td className="
                                    p-5
                                    text-gray-100
                                ">
                                        <div className="
                                        flex items-center gap-2
                                    ">
                                            <CalendarDays size={16}/>
                                            {b.booking_date}
                                        </div>
                                    </td>

                                    {/* TRAVEL DATE */}
                                    <td className="p-5 text-gray-100">

                                        {editingId === b.id ? (

                                            <input
                                                type="date"
                                                value={editForm.travel_start_date}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        travel_start_date:
                                                        e.target.value
                                                    })
                                                }
                                                className="
                                                bg-black/30
                                                border border-white/10
                                                rounded-xl
                                                px-3 py-2
                                                text-white
                                            "
                                            />

                                        ) : (
                                            b.travel_start_date
                                        )}

                                    </td>

                                    {/* STATUS */}
                                    <td className="p-5">

                                        {editingId === b.id ? (

                                            <select
                                                value={editForm.status}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        status: e.target.value
                                                    })
                                                }
                                                className="
                                                bg-black/30
                                                border border-white/10
                                                rounded-xl
                                                px-3 py-2
                                                text-white
                                            "
                                            >
                                                <option>PENDING</option>
                                                <option>CONFIRMED</option>
                                                <option>CANCELLED</option>
                                            </select>

                                        ) : (

                                            <span className={`
                                            px-4 py-2
                                            rounded-full
                                            text-xs
                                            font-bold
                                            ${
                                                b.status === "CONFIRMED"
                                                    ? "bg-emerald-500/20 text-emerald-100"
                                                    : b.status === "PENDING"
                                                        ? "bg-amber-500/20 text-amber-900"
                                                        : "bg-red-500/20 text-amber-900"
                                            }
                                        `}>
                                            {b.status}
                                        </span>

                                        )}

                                    </td>

                                    {/* ACTIONS */}
                                    <td className="
                                    p-5
                                    text-center
                                ">

                                        <div className="
                                        flex
                                        justify-center
                                        gap-4
                                    ">

                                            {editingId === b.id ? (

                                                <>

                                                    <button
                                                        onClick={handleUpdate}
                                                        className="
                                                        text-emerald-100
                                                        hover:scale-110
                                                        transition
                                                    "
                                                    >
                                                        <Save size={20}/>
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            setEditingId(null)
                                                        }
                                                        className="
                                                        text-red-800
                                                        hover:scale-110
                                                        transition
                                                    "
                                                    >
                                                        <X size={20}/>
                                                    </button>

                                                </>

                                            ) : (

                                                <>

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(b)
                                                        }
                                                        className="
                                                        text-amber-300
                                                        hover:scale-110
                                                        transition
                                                    "
                                                    >
                                                        <Pencil size={20}/>
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(b.id)
                                                        }
                                                        className="
                                                        text-red-800
                                                        hover:scale-110
                                                        transition
                                                    "
                                                    >
                                                        <Trash2 size={20}/>
                                                    </button>

                                                </>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* PAGINATION */}

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-8">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="
                        px-5 py-2
                        rounded-xl
                        bg-white/10
                        text-amber-900
                        hover:bg-white/20
                        disabled:opacity-40
                        transition
                    "
                    >
                        Prev
                    </button>

                    <span className="
                    text-amber-900
                    font-semibold
                ">
                    Page {page} of {totalPages}
                </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="
                        px-5 py-2
                        rounded-xl
                        bg-white/10
                        text-amber-900
                        hover:bg-white/20
                        disabled:opacity-40
                        transition
                    "
                    >
                        Next
                    </button>

                </div>

            </div>

        </PageBackground>
    );
}