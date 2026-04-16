import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationsPage from "./pages/ReservationsPage";
import CartPage from "./pages/CartPage";
import {useEffect, useState} from "react";
import Footer from "./components/Footer";
import CartCTA from "./components/CartCTA.jsx";


function App() {
    const [ux, setUX] = useState({
        cta: false,
        message: "",
        count: 0,
        total: 0
    });
    let ctaTimer;
    const triggerUX = (itemName, cart) => {
        const count = cart.reduce((sum, i) => sum + i.quantity, 0);
        const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
        setUX({
            cta: true,
            message: `${itemName} added`,
            count,
            total
        });

        // reset timer if user clicks again quickly
        clearTimeout(ctaTimer);

        ctaTimer = setTimeout(() => {
            setUX(prev => ({ ...prev, cta: false }));
        }, 2000); //  longer display time
    };


    const [cart, setCart] = useState([]);

    const [animateBadge, setAnimateBadge] = useState(false);

    useEffect(() => {
        if (animateBadge) {
            const timer = setTimeout(() => setAnimateBadge(false), 400);
            return () => clearTimeout(timer);
        }
    }, [animateBadge]);
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
                                  ux={ux}
                                  triggerUX={triggerUX}
                              />
                          }
                      />
                    <Route path="/reservations" element={<ReservationsPage />}/>
                    <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
                  </Routes>
              </div>

              <CartCTA
                  show={ux.cta}
                  message={ux.message}
                  count={ux.count}
                  total={ux.total}
              />
          <Footer />
          </div>
      </Router>
  );
}
export default App;