const BASE_URL = "http://localhost:8080/api";

// CREATE
export const createBooking = async (data: any) => {
    const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

// READ
export const getBookings = async () => {
    const res = await fetch(`${BASE_URL}/bookings`);
    return res.json();
};

// UPDATE
export const updateBooking = async (id: any, data: any) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

// DELETE
export const deleteBooking = async (id: any) => {
    await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "DELETE",
    });
};