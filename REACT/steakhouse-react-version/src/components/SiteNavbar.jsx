import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarToggler,
    Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function SiteNavbar({cart, animateBadge}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <Navbar dark color="dark" expand="lg" className="lux-navbar sticky-top">
            <div className="container-fluid d-flex align-items-center">
                {/* BRAND */}
                <NavbarBrand className="d-flex align-items-center gap-2 m-0" tag={NavLink} to="/">
                    <img src="../.././images/logo-image.png" alt="logo-image" width="40" className="brand-logo me-2"/>
                    <span className="brand-text">G & G's Steakhouse</span>
                </NavbarBrand>
                {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}


                {/* TOGGLER (mobile) */}
                <NavbarToggler onClick={toggle} className="custom-toggler" />

                {/* COLLAPSE */}
                <Collapse isOpen={isOpen} navbar>

                {/* NAV LINKS */}
                    <Nav className="ms-auto d-flex align-items-center nav-links" navbar="navbar-expand-lg navbar-dark bg-dark sticky-top">
                        <div className="collapse navbar-collapse" id="navMenu">
                                    <NavItem>
                                        <NavLink to="/" className="nav-link d-flex align-items-center gap-1">
                                            <i className="fas fa-home"></i>Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/menu" className="nav-link d-flex align-items-center gap-1">
                                            <i className="fa fa-bars"></i>Menu</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/reservations" className="nav-link d-flex align-items-center gap-1">
                                            <i className="fas fa-calendar-check"></i>Reservations</NavLink>
                                    </NavItem>
                                    {/* CART WITH BADGE */}
                                    <NavItem>
                                        <NavLink to="/cart" className="nav-link d-flex align-items-center gap-2">
                                            <i className="fas fa-shopping-cart"></i>Cart
                                            <span id="cart-badge" className={`cart-badge ${animateBadge ? "animate" : ""}`}>{cartCount}</span>
                                        </NavLink>
                                    </NavItem>
                        </div>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}