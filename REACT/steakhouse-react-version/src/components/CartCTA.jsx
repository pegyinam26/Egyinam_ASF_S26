import { Link } from "react-router-dom";

export default function CartCTA({ show }) {
    return (
        <div className={`cart-cta ${show ? "show" : ""}`}>
            <span>Items added!</span>

            <Link to="/cart" className="cta-btn">
                View Cart →
            </Link>
        </div>
    );
}