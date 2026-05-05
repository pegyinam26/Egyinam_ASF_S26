import { Navigate } from "react-router-dom";

export default function UserRoute({children}: any) {
    const role = localStorage.getItem("role");

    if (role !== "USER") {
        return <Navigate to="/" />;
    }

    return children;
}