import { useEffect, useState } from "react";
import PageBackground from "../components/PageBackground";
import {
    Pencil,
    Trash2,
    Save,
    X,
    Search,
    Users,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

export default function UsersList() {
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const [page, setPage] = useState(1);
    const perPage = 10;

    const fetchUsers = () => {
        fetch("http://localhost:8080/api/users")
            .then((res) => res.json())
            .then(setUsers)
            .catch((err) => console.error("Failed to fetch users:", err));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((u) => {
        const fullName = `${u.fname || ""} ${u.lname || ""}`.toLowerCase();
        const email = `${u.email || ""}`.toLowerCase();

        return (
            fullName.includes(search.toLowerCase()) ||
            email.includes(search.toLowerCase())
        );
    });

    const totalPages = Math.ceil(filteredUsers.length / perPage) || 1;

    const paginatedUsers = filteredUsers.slice(
        (page - 1) * perPage,
        page * perPage
    );

    const handleEdit = (user: any) => {
        setEditingId(user.id);

        setEditForm({
            ...user,
            address: {
                ...(user.address || {
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: "USA",
                }),
            },
        });
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                fname: editForm.fname,
                lname: editForm.lname,
                email: editForm.email,
                phoneNumber: editForm.phoneNumber,
                address: {
                    street: editForm.address?.street || "",
                    city: editForm.address?.city || "",
                    state: editForm.address?.state || "",
                    zip: editForm.address?.zip || "",
                    country: editForm.address?.country || "USA",
                },
            };

            console.log("USER UPDATE PAYLOAD:", payload);

            const res = await fetch(
                `http://localhost:8080/api/users/${editForm.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const errorText = await res.text();
                console.error("USER UPDATE ERROR:", errorText);
                throw new Error(errorText);
            }

            alert("User updated successfully!");
            setEditingId(null);
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert("Failed to update user");
        }
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this user? This will also delete all bookings connected to this user."
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete user");
            }

            alert("User deleted successfully!");
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert("Failed to delete user");
        }
    };

    return (
        <PageBackground>
            <div className="w-full max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 py-6 md:py-10">

                <div className="mb-10 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-amber-900 mb-4">
                        Users Dashboard
                    </h1>

                    <p className="text-amber-900 text-base md:text-lg">
                        Manage traveler profiles, contact details, and address information.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-gradient-to-br from-amber-900/40 to-black/50 border border-amber-500/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-amber-900 text-sm mb-2">
                                    Total Users
                                </p>
                                <h2 className="text-4xl font-black text-white">
                                    {users.length}
                                </h2>
                            </div>
                            <Users size={42} className="text-amber-300" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-900/40 to-black/50 border border-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-amber-900 text-sm mb-2">
                                    With Phone
                                </p>
                                <h2 className="text-4xl font-black text-white">
                                    {users.filter((u) => u.phoneNumber).length}
                                </h2>
                            </div>
                            <Phone size={42} className="text-emerald-300" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/40 to-black/50 border border-blue-500/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-amber-900 text-sm mb-2">
                                    With Address
                                </p>
                                <h2 className="text-4xl font-black text-white">
                                    {users.filter((u) => u.address).length}
                                </h2>
                            </div>
                            <MapPin size={42} className="text-blue-300" />
                        </div>
                    </div>

                </div>

                <div className="relative max-w-md mb-8">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-200"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search user by name or email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full bg-white/10 border border-black/40 text-amber-900 placeholder-amber-900/90 rounded-2xl pl-12 pr-4 py-3 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>

                <div className="bg-gradient-to-br from-black/60 via-gray-900/50 to-amber-950/20 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-[1100px] w-full">

                            <thead className="bg-black/40 border-b border-white/10">
                            <tr className="text-amber-200 text-sm uppercase tracking-wider">
                                <th className="p-5 text-left">Name</th>
                                <th className="p-5 text-left">Email</th>
                                <th className="p-5 text-left">Phone</th>
                                <th className="p-5 text-left">Street</th>
                                <th className="p-5 text-left">City</th>
                                <th className="p-5 text-left">State</th>
                                <th className="p-5 text-left">ZIP</th>
                                <th className="p-5 text-center">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {paginatedUsers.map((u, idx) => (
                                <tr
                                    key={u.id}
                                    className={`
                                            border-b border-white/5
                                            hover:bg-white/5
                                            transition-all
                                            duration-200
                                            ${idx % 2 === 0 ? "bg-black/10" : "bg-transparent"}
                                        `}
                                >

                                    <td className="p-5 text-amber-50">
                                        {editingId === u.id ? (
                                            <div className="space-y-2">
                                                <input
                                                    value={editForm.fname || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            fname: e.target.value,
                                                        })
                                                    }
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                                />

                                                <input
                                                    value={editForm.lname || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            lname: e.target.value,
                                                        })
                                                    }
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="font-semibold">
                                                    {u.fname} {u.lname}
                                                </p>

                                                <p className="text-xs text-gray-100">
                                                    User #{u.id}
                                                </p>
                                            </div>
                                        )}
                                    </td>

                                    <td className="p-5 text-gray-100">
                                        {editingId === u.id ? (
                                            <input
                                                value={editForm.email || ""}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} />
                                                {u.email}
                                            </div>
                                        )}
                                    </td>

                                    <td className="p-5 text-gray-100">
                                        {editingId === u.id ? (
                                            <input
                                                value={editForm.phoneNumber || ""}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        phoneNumber: e.target.value,
                                                    })
                                                }
                                                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                            />
                                        ) : (
                                            u.phoneNumber || "N/A"
                                        )}
                                    </td>

                                    <td className="p-5 text-gray-100">
                                        {editingId === u.id ? (
                                            <input
                                                value={editForm.address?.street || ""}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        address: {
                                                            ...editForm.address,
                                                            street: e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                            />
                                        ) : (
                                            u.address?.street || "N/A"
                                        )}
                                    </td>

                                    <td className="p-5 text-gray-100">
                                        {editingId === u.id ? (
                                            <input
                                                value={editForm.address?.city || ""}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        address: {
                                                            ...editForm.address,
                                                            city: e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                            />
                                        ) : (
                                            u.address?.city || "N/A"
                                        )}
                                    </td>

                                    <td className="p-5 text-gray-100">
                                        {editingId === u.id ? (
                                            <input
                                                value={editForm.address?.state || ""}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        address: {
                                                            ...editForm.address,
                                                            state: e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                            />
                                        ) : (
                                            u.address?.state || "N/A"
                                        )}
                                    </td>

                                    <td className="p-5 text-gray-100">
                                        {editingId === u.id ? (
                                            <input
                                                value={editForm.address?.zip || ""}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        address: {
                                                            ...editForm.address,
                                                            zip: e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                                            />
                                        ) : (
                                            u.address?.zip || "N/A"
                                        )}
                                    </td>

                                    <td className="p-5 text-center">
                                        <div className="flex justify-center gap-4">
                                            {editingId === u.id ? (
                                                <>
                                                    <button
                                                        onClick={handleUpdate}
                                                        className="text-emerald-100 hover:scale-110 transition"
                                                    >
                                                        <Save size={20} />
                                                    </button>

                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="text-red-800 hover:scale-110 transition"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(u)}
                                                        className="text-amber-300 hover:scale-110 transition"
                                                    >
                                                        <Pencil size={20} />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(u.id)}
                                                        className="text-red-800 hover:scale-110 transition"
                                                    >
                                                        <Trash2 size={20} />
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

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-5 py-2 rounded-xl bg-white/10 text-amber-900 hover:bg-white/20 disabled:opacity-40 transition"
                    >
                        Prev
                    </button>

                    <span className="text-amber-900 font-semibold">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-5 py-2 rounded-xl bg-white/10 text-amber-900 hover:bg-white/20 disabled:opacity-40 transition"
                    >
                        Next
                    </button>
                </div>

            </div>
        </PageBackground>
    );
}