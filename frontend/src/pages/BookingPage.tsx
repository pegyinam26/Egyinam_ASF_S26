import { useEffect, useState } from "react";
import { bookingSchema } from "../validation/bookingSchema";
import PageBackground from "../components/PageBackground.tsx";

export default function BookingPage() {

    const [form, setForm] = useState({
        itineraryId: "",
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

    // STATE → CITY MAP
    const stateCityMap: Record<string, string[]> = {
        TX: ["Houston", "Dallas", "Austin"],
        CA: ["Los Angeles", "San Diego", "San Francisco"],
        NY: ["New York City", "Buffalo", "Albany"],
        FL: ["Miami", "Orlando", "Tampa"],
        GA: ["Atlanta", "Columbus", "Savannah"],
    };

    // FETCH ITINERARIES
    useEffect(() => {

        fetch("http://localhost:8080/api/itineraries")
            .then((res) => res.json())
            .then(setItineraries)
            .catch(() =>
                setMessage("Failed to load itineraries")
            );

    }, []);

    // HANDLE INPUT CHANGE
    const handleChange = (e: any) => {

        const { name, value } = e.target;

        if (name === "state") {

            setForm({
                ...form,
                state: value,
                city: "",
            });

        } else {

            setForm({
                ...form,
                [name]: value,
            });
        }

        // CLEAR FIELD ERROR LIVE
        setErrors((prev: any) => ({
            ...prev,
            [name]: "",
        }));
    };

    // HANDLE SUBMIT
    const handleSubmit = async () => {

        try {

            setErrors({});
            setMessage("");
            setLoading(true);

            // VALIDATE
            await bookingSchema.validate(form, {
                abortEarly: false,
            });

            const loggedInUser = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            const payload = {

                booking_date: new Date()
                    .toISOString()
                    .split("T")[0],

                travel_start_date: form.travelDate,

                status: "PENDING",

                itinerary: {
                    id: Number(form.itineraryId),
                },

                user: {
                    id: loggedInUser.id,
                },
            };

            const res = await fetch(
                "http://localhost:8080/api/bookings",
                {
                    method: "POST",
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

            const savedBooking = await res.json();

            alert(
                `Booking Confirmed!\n\nBooking ID: ${savedBooking.id}\n\nThank you for booking your Ghana experience with us.`
            );

            setMessage("Booking created successfully!");

            // RESET FORM
            setForm({
                itineraryId: "",
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

            console.error(err);

            // YUP VALIDATION ERRORS
            if (err.inner) {

                const validationErrors: any = {};

                err.inner.forEach((e: any) => {
                    validationErrors[e.path] = e.message;
                });

                setErrors(validationErrors);

            } else {

                setMessage(
                    "Unable to create booking at this time."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (

        <PageBackground>

            <div className="
                max-w-5xl
                mx-auto
                px-6 md:px-10
                py-10
            ">

                {/* MAIN CARD */}
                <div className="
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-amber-800/30
                    via-black/10
                    to-emerald-700/10
                    backdrop-blur-xl
                    border border-amber-400/20
                    rounded-[40px]
                    shadow-2xl
                    p-8 md:p-12
                ">

                    <div className="
                        absolute
                        -top-32
                        -right-24
                        w-72
                        h-72
                        bg-amber-400/10
                        blur-3xl
                        rounded-full
                    " />

                    <div className="
                        absolute
                        -bottom-32
                        -left-24
                        w-72
                        h-72
                        bg-emerald-500/10
                        blur-3xl
                        rounded-full
                    " />

                    {/* TITLE */}
                    <h1 className="
                        text-5xl md:text-6xl
                        font-black
                        text-center
                        text-amber-900
                        mb-4
                    ">
                        Book Your Journey
                    </h1>

                    {/* SUBTITLE */}
                    <p className="
                        text-center
                        text-amber-900
                        text-lg md:text-xl
                        mb-12
                        mx-auto
                        whitespace-nowrap
                    ">
                        Reserve your personalized Ghana experience by
                        completing the booking form below.
                    </p>

                    {/* SUCCESS / ERROR MESSAGE */}
                    {message && (
                        <div className="
                            mb-8
                            text-center
                            text-sm
                            text-amber-700
                            bg-black/20
                            rounded-xl
                            py-3
                        ">
                            {message}
                        </div>
                    )}

                    {/* FORM GRID */}
                    <div className="
                    shadow-inner
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-6

                    ">

                        {/* ITINERARY */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                Start Your Adventure
                            </label>

                            <select
                                name="itineraryId"
                                value={form.itineraryId}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            >

                                <option value="" className="text-amber-900">
                                    Select Itinerary
                                </option>

                                {itineraries.map((i) => (
                                    <option
                                        key={i.id}
                                        value={i.id}
                                        className="text-amber-900"
                                    >
                                        {i.title}
                                    </option>
                                ))}

                            </select>
                            <p className="
                                text-xs
                                text-gray-700
                                mt-2
                            ">
                                Itineraries are curated to give you the most memorable experiences.
                            </p>
                            {errors.itineraryId && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.itineraryId}
                                </p>
                            )}

                        </div>

                        {/* TRAVEL DATE */}
                        <div>

                            <label
                                htmlFor="travelDate"
                                className="
                                    block
                                    text-sm
                                    text-gray-700
                                    mb-2
                                "
                            >
                                Preferred Travel Start Date
                            </label>

                            <input
                                type="date"
                                id="travelDate"
                                name="travelDate"
                                value={form.travelDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            />

                            <p className="
                                text-xs
                                text-gray-700
                                mt-2
                            ">
                                Select the date you would like your Ghana
                                tour experience to begin.
                            </p>

                            {errors.travelDate && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.travelDate}
                                </p>
                            )}

                        </div>

                        {/* FIRST NAME */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                First Name
                            </label>

                            <input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/20
                                    border border-black/40
                                    text-amber-900
                                    placeholder-gray-100/60
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            />

                            {errors.firstName && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.firstName}
                                </p>
                            )}

                        </div>

                        {/* LAST NAME */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                Last Name
                            </label>

                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    placeholder-gray-100/60
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            />

                            {errors.lastName && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.lastName}
                                </p>
                            )}

                        </div>

                        {/* EMAIL */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                Email Address
                            </label>

                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    placeholder-gray-100/60
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            />

                            {errors.email && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.email}
                                </p>
                            )}

                        </div>

                        {/* PHONE */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                Phone Number
                            </label>

                            <input
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    placeholder-gray-100/60
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            />

                            {errors.phoneNumber && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.phoneNumber}
                                </p>
                            )}

                        </div>

                        {/* STREET */}
                        <div className="md:col-span-2">

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                Street Address
                            </label>

                            <input
                                name="street"
                                value={form.street}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    placeholder-gray-100/60
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            />

                            {errors.street && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.street}
                                </p>
                            )}

                        </div>

                        {/* STATE */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                State
                            </label>

                            <select
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            >

                                <option value="" className="text-amber-900">
                                    Select State
                                </option>

                                <option value="TX" className="text-amber-900">
                                    Texas
                                </option>

                                <option value="CA" className="text-amber-900">
                                    California
                                </option>

                                <option value="NY" className="text-amber-900">
                                    New York
                                </option>

                                <option value="FL" className="text-amber-900">
                                    Florida
                                </option>

                                <option value="GA" className="text-amber-900">
                                    Georgia
                                </option>

                            </select>

                            {errors.state && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.state}
                                </p>
                            )}

                        </div>

                        {/* CITY */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                City
                            </label>

                            <select
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            >

                                <option value="" className="text-black">
                                    Select City
                                </option>

                                {form.state &&
                                    stateCityMap[form.state]?.map((city) => (
                                        <option
                                            key={city}
                                            value={city}
                                            className="text-black"
                                        >
                                            {city}
                                        </option>
                                    ))}

                            </select>

                            {errors.city && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.city}
                                </p>
                            )}

                        </div>

                        {/* ZIP */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                ZIP Code
                            </label>

                            <input
                                name="zip"
                                value={form.zip}
                                onChange={handleChange}
                                className="
                                    w-full
                                    bg-white/10
                                    border border-black/40
                                    text-amber-900
                                    placeholder-gray-100/60
                                    rounded-2xl
                                    px-4 py-3
                                    backdrop-blur-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-yellow-400
                                    transition-all
                                "
                            />

                            {errors.zip && (
                                <p className="
                                    text-blue-800
                                    text-sm
                                    mt-2
                                    ml-1
                                ">
                                    {errors.zip}
                                </p>
                            )}

                        </div>

                        {/* COUNTRY */}
                        <div>

                            <label className="
                                block
                                text-sm
                                text-gray-700
                                mb-2
                            ">
                                Country
                            </label>

                            <input
                                value="United States"
                                disabled
                                className="
                                            w-full
                                            bg-white-500/5
                                            border border-black/40
                                            text-amber-900
                                            rounded-2xl
                                            px-4 py-3
                                            backdrop-blur-md
                                            shadow-inner
                                            cursor-not-allowed
                                        "
                            />

                        </div>

                    </div>

                    {/* SUBMIT */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
                            mt-10
                            w-full
                            bg-gradient-to-r
                            from-yellow-500
                            to-amber-600
                            hover:scale-[1.02]
                            hover:shadow-yellow-500/30
                            text-black
                            font-bold
                            py-4
                            rounded-2xl
                            transition-all
                            duration-300
                            shadow-xl
                        "
                    >
                        {loading
                            ? "Processing Reservation..."
                            : "Reserve My Ghana Experience"}
                    </button>

                </div>

            </div>

        </PageBackground>
    );
}