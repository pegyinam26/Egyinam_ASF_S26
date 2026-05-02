import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: any) {
    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
        return <Navigate to="/" />;
    }

    return children;
}