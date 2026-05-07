import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: any) {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    console.log("ADMIN ROUTE:", user);

    if (!user || user.role?.toUpperCase() !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
}