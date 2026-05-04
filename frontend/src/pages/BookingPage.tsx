import { useEffect, useState } from "react";
import { bookingSchema } from "../validation/bookingSchema";

import PageBackground from "../components/PageBackground.tsx";

export default function BookingPage() {
    const [form, setForm] = useState({
        itineraryTitle: "",
        travelDate: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "USA",
    });

    const [itineraries, setItineraries] = useState<any[]>([]);
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // State → City mapping
    const stateCityMap: Record<string, string[]> = {
        TX: ["Houston", "Dallas", "Austin"],
        CA: ["Los Angeles", "San Diego", "San Francisco"],
        NY: ["New York City", "Buffalo", "Albany"],
        FL: ["Miami", "Orlando", "Tampa"],
        GA: ["Atlanta", "Columbus","Savannah"]
    };

    // Fetch itineraries
    useEffect(() => {
        fetch("http://localhost:8080/api/itineraries")
            .then((res) => res.json())
            .then(setItineraries)
            .catch(() => setMessage("Failed to load itineraries"));
    }, []);

    // Handle input change
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === "state") {
            setForm({ ...form, state: value, city: "" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Submit form
    const handleSubmit = async () => {
        try {
            setErrors({});
            setMessage("");
            setLoading(true);

            // Validate
            await bookingSchema.validate(form, { abortEarly: false });

            const res = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error();

            setMessage("Booking created successfully!");

            // Reset form
            setForm({
                itineraryTitle: "",
                travelDate: "",
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                country: "USA",
            });

        } catch (err: any) {
            if (err.inner) {
                const newErrors: any = {};
                err.inner.forEach((e: any) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            } else {
                setMessage("Failed to create booking");
            }
        }

        setLoading(false);
    };

    return (
        <PageBackground>
        <div className="max-w-3xl mx-auto p-6 ">

            <h1 className="text-2xl font-bold text-center mb-6">Book Your Trip</h1>

            {message && (
                <div className="mb-4 text-center text-sm text-blue-600">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ITINERARY */}
                <div>
                    <select
                        name="itineraryTitle"
                        value={form.itineraryTitle}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select Itinerary</option>
                        {itineraries.map((i) => (
                            <option key={i.id} value={i.title}>
                                {i.title}
                            </option>
                        ))}
                    </select>
                    {errors.itineraryTitle && (
                        <p className="text-red-500 text-sm">{errors.itineraryTitle}</p>
                    )}
                </div>

                {/* TRAVEL DATE */}
                <div>
                    <input
                        type="date"
                        name="travelDate"
                        value={form.travelDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    {errors.travelDate && (
                        <p className="text-red-500 text-sm">{errors.travelDate}</p>
                    )}
                </div>

                {/* FIRST / LAST NAME */}
                <div>
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                </div>

                <div>
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                </div>

                {/* EMAIL / PHONE */}
                <div>
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <input
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                    )}
                </div>

                {/* STREET */}
                <div className="md:col-span-2">
                    <input
                        name="street"
                        placeholder="Street Address"
                        value={form.street}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    {errors.street && (
                        <p className="text-red-500 text-sm">{errors.street}</p>
                    )}
                </div>

                {/* STATE */}
                <div>
                    <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">State</option>
                        <option value="TX">Texas</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="FL">Florida</option>
                    </select>
                    {errors.state && (
                        <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                </div>

                {/* CITY (smart dropdown) */}
                <div>
                    <select
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">City</option>
                        {form.state &&
                            stateCityMap[form.state]?.map((city) => (
                                <option key={city}>{city}</option>
                            ))}
                    </select>
                    {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                </div>

                {/* ZIP */}
                <div>
                    <input
                        name="zip"
                        placeholder="ZIP Code"
                        value={form.zip}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    {errors.zip && (
                        <p className="text-red-500 text-sm">{errors.zip}</p>
                    )}
                </div>

                {/* COUNTRY */}
                <div>
                    <input
                        value="United States"
                        disabled
                        className="border p-2 rounded w-full bg-gray-100"
                    />
                </div>

            </div>

            {/* SUBMIT */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
                {loading ? "Submitting..." : "Submit Booking"}
            </button>

        </div>
        </PageBackground>
    );
}