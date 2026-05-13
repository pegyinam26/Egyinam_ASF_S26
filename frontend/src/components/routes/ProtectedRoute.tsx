import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {

    //ensures the user is logged in before accessing a page
    //if no user exists in localStorage, the user is redirected to the login page

    const storedUser = localStorage.getItem("user");

    // DEBUG
    console.log("PROTECTED ROUTE USER:", storedUser);

    if (!storedUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}