import { useEffect, useState } from "react";

export default function BookingsList() {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/bookings")
            .then(res => res.json())
            .then(setBookings);
    }, []);

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

            <table className="w-full border">
                <thead className="bg-gray-200">
                <tr>
                    <th className="p-2">First Name</th>
                    <th className="p-2">Last Name</th>
                    <th className="p-2">Itinerary</th>
                    <th className="p-2">Booking Date</th>
                    <th className="p-2">Travel Date</th>
                    <th className="p-2">Status</th>
                </tr>
                </thead>

                <tbody>
                {bookings.map((b, i) => (
                    <tr key={i} className="border text-center">
                        <td className="p-2">{b.user?.fname}</td>
                        <td className="p-2">{b.user?.lname}</td>
                        <td className="p-2">{b.itinerary?.title}</td>
                        <td className="p-2">{b.booking_date}</td>
                        <td className="p-2">{b.travel_start_date}</td>
                        <td className="p-2">{b.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}