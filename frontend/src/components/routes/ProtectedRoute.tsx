import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {

    const storedUser = localStorage.getItem("user");

    // DEBUG
    console.log("PROTECTED ROUTE USER:", storedUser);

    if (!storedUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}