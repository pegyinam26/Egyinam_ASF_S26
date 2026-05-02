import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import BookingsList from "./pages/BookingsList";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route
                    path="/booking"
                    element={
                        <ProtectedRoute>
                            <UserRoute>
                                <BookingPage />
                            </UserRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminRoute>
                                <BookingsList />
                            </AdminRoute>
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}

export default App;