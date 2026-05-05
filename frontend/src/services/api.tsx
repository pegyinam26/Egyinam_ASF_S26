const BASE_URL = "http://localhost:8080/api";

// CREATE
export const createBooking = async (data: any) => {
    const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create booking");
        return res.json();
};

// READ
export const getBookings = async () => {
    const res = await fetch(`${BASE_URL}/bookings`);
    if (!res.ok) throw new Error("Failed to get bookings");
        return res.json();
};

/* ================= ITINERARIES ================= */

export const getItineraries = async () => {
    const res = await fetch(`${BASE_URL}/itineraries`);
    if (!res.ok) throw new Error("Failed to fetch itineraries");
        return res.json();
};

export const getItineraryById = async (id: number) => {
    const res = await fetch(`${BASE_URL}/itineraries/${id}`);
    if (!res.ok) throw new Error("Failed to fetch itinerary");
        return res.json();
};

// UPDATE
export const updateBooking = async (id: any, data: any) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update booking");
        return res.json();
};

// DELETE
export const deleteBooking = async (id: any) => {
    await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "DELETE",
    });
};