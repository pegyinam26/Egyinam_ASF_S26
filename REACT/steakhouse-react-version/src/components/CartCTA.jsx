import { Link } from "react-router-dom";

export default function CartCTA({ show, message, count, total }) {
    return (
        <div className={`cart-cta ${show ? "show" : ""}`}>
            <div className="cta-info">
                <div className="cta-message">{message}</div>
                <div className="cta-sub">
                    {count} item{count !== 1 && "s"} • ${total.toFixed(2)}
                </div>
            </div>

            <Link to="/cart" className="cta-btn">
                View Cart →
            </Link>

        </div>
    );
}