import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import BookingsList from "./pages/BookingsList";
import ItineraryPage from "./pages/ItineraryPage";
import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
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

                {/*<Route path="/booking" element={*/}
                {/*    <ProtectedRoute>*/}
                {/*        <BookingPage />*/}
                {/*    </ProtectedRoute>*/}
                {/*} />*/}

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
                {/*<Route path="/admin" element={*/}
                {/*    <AdminRoute>*/}
                {/*        <AdminPage />*/}
                {/*    </AdminRoute>*/}
                {/*} />*/}
                <Route path="/itinerary" element={
                    <ProtectedRoute>
                        <ItineraryPage />
                    </ProtectedRoute>
                } />


                <Route path="/gallery" element={
                    <ProtectedRoute>
                        <UserRoute>
                            <GalleryPage />
                        </UserRoute>
                    </ProtectedRoute>
                } />

            </Routes>
            <Footer />
        </>
    );
}

export default App;