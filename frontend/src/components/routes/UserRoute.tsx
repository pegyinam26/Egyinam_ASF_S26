import { Navigate } from "react-router-dom";

export default function UserRoute({ children }: any) {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    console.log("USER ROUTE:", user);

    if (!user || user.role?.toUpperCase() !== "USER") {
        return <Navigate to="/" replace />;
    }

    return children;
}