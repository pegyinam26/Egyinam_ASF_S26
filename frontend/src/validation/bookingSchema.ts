import * as yup from "yup";

export const bookingSchema = yup.object({
    itineraryTitle: yup.string().required("Select an itinerary"),
    travelDate: yup
        .date()
        .required("Travel date is required")
        .min(new Date(), "Date must be in the future"),

    firstName: yup.string().required("First name required"),
    lastName: yup.string().required("Last name required"),

    email: yup.string().email("Invalid email").required("Email required"),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone number required"),

    street: yup.string().required("Street required"),
    city: yup.string().required("City required"),
    state: yup.string().required("State required"),
    zip: yup
        .string()
        .matches(/^[0-9]{5}$/, "ZIP must be 5 digits")
        .required("ZIP required"),
    country: yup.string().required(),
});