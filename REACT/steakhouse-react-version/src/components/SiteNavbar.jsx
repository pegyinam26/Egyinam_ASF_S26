import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarToggler,
    Collapse
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SiteNavbar({cart, animateBadge}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <Navbar dark color="dark" expand="lg" className="lux-navbar sticky-top">
            <div className="container-fluid d-flex align-items-center">
                {/* BRAND */}
                <NavbarBrand className="d-flex align-items-center gap-2 m-0" tag={Link} to="/">
                    <img src="../.././images/logo-image.png" alt="logo-image" width="40" className="brand-logo me-2"/>
                    <span className="brand-text">G & G's Steakhouse</span>
                </NavbarBrand>
                {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}


                {/* TOGGLER (mobile) Hamburger */}
                <NavbarToggler onClick={toggle} className="custom-toggler me-2" />

                {/* COLLAPSE */}
                <Collapse isOpen={isOpen} navbar>

                {/* NAV LINKS */}
                    <Nav className="nav-links w-100" navbar>

                                    <NavItem>
                                        <Link to="/" className="nav-link d-flex align-items-center gap-1">
                                            <i className="fas fa-home"></i>Home</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/menu" className="nav-link d-flex align-items-center gap-1">
                                            <i className="fa fa-bars"></i>Menu</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/reservations" className="nav-link d-flex align-items-center gap-1">
                                            <i className="fas fa-calendar-check"></i>Reservations</Link>
                                    </NavItem>
                                    {/* CART WITH BADGE */}
                                    <NavItem>
                                        <Link to="/cart" className="nav-link d-flex align-items-center gap-2">
                                            <i className="fas fa-shopping-cart"></i>Cart
                                            <span id="cart-badge" className={`cart-badge ${animateBadge ? "animate" : ""}`}>{cartCount}</span>
                                        </Link>
                                    </NavItem>

                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}
