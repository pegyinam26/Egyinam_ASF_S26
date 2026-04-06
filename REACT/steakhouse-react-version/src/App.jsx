import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationsPage from "./pages/ReservationsPage";
import CartPage from "./pages/CartPage";
import {useState} from "react";
import Footer from "./components/Footer";
import CartToast from "./components/CartToast";


function App() {
    const [showToast, setShowToast] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCTA, setShowCTA] = useState(false);
    const [animateBadge, setAnimateBadge] = useState(false);
    // setAnimateBadge(true);---causes infinite loop
    setTimeout(() => setAnimateBadge(false), 400);
    return (
      <Router>
          <div className="d-flex flex-column min-vh-100">
              <SiteNavbar cart={cart} animateBadge={animateBadge} />
              <div className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<HomePage/>}/>
                      <Route
                          path="/menu"
                          element={
                              <MenuPage
                                  cart={cart}
                                  setCart={setCart}
                                  showToast={showToast}
                                  setShowToast={setShowToast}
                                  showCTA={showCTA}
                                  setShowCTA={setShowCTA}
                              />
                          }
                      />
                    <Route path="/reservations" element={<ReservationsPage />}/>
                    <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
                  </Routes>
              </div>

          <Footer />
          </div>
      </Router>
  );
}
export default App;