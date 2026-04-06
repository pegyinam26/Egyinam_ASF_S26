import {Container} from "reactstrap";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <>
            {/* HERO VIDEO */}
            <section className="hero">
                <video autoPlay muted loop playsInline className="hero-video">
                    <source src="../.././images/hero-video2.mp4" type="video/mp4" />
                </video>

                <div className="hero-content">
                    <h1>G & G's Steakhouse</h1>
                    <p>...where great food and drinks await ya!</p>
                    <Link to="/reservations" className="btn-gold">
                        Reserve a table
                    </Link>
                </div>
            </section>

            {/* FEATURED SECTION */}
            <Container className="featured text-center">
                <h2>Featured Favorites</h2>

                <div className="card-container">
                    <div className="menu-card">
                        <img src="../.././images/signature_rib-eye-with-linguine.jpg" alt="Grilled ribeye steak" />
                        <h3>Signature Ribeye Pasta</h3>
                        <p>Cajun Steak Linguine with creamy parmesan sauce</p>
                    </div>

                    <div className="menu-card">
                        <img src="../.././images/filet_mignon_steak.jpg" alt="Filet mignon"/>
                        <h3>Filet Mignon</h3>
                        <p>10 oz tenderloin with sides</p>
                    </div>

                    <div className="menu-card">
                        <img src="../.././images/old-fashioned3.jpg" alt="Classic old fashioned cocktail"/>
                        <h3>Old Fashioned</h3>
                        <p>Classic bourbon cocktail</p>
                    </div>
                </div>
            </Container>

            {/* FULL MENU CTA */}
            <div className="full-menu-hero">
                <Link to="/menu" className="btn-gold">
                    Click me for full menu
                </Link>
            </div>
        </>
    );
}