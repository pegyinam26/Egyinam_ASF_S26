import {useState} from "react";
import {Container, Row} from "reactstrap";
import {MENU_ITEMS} from "../data/menuData";
import MenuFilter from "../components/MenuFilter";
import MenuItemCard from "../components/MenuItemCard";
import PageHero from "../components/PageHero";
import CartCTA from "../components/CartCTA";

export default function MenuPage({ cart, setCart,ux, triggerUX }) {

    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = MENU_ITEMS.filter(item => {
        const matchCategory =
            category === "All" || category === "" || item.category === category;

        const matchSearch =
            item.name.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);

        return matchCategory && matchSearch;
    });

    return (
        <>
            <PageHero title="Our Menu" className="menu-hero" />
            <div className="menu-description-text">
                <p>
                    Start your G & G's experience off right with mouth-watering, internationally curated breakfast,
                    appetizers, soups and fresh salads, and ensure your last bite is as good as your first. More importantly, delve
                    into our signature steak made with USDA prime beef cooked to perfection, and finally top it off with
                    our delectable desserts, handcrafted to end on a sweet note.
                </p>
            </div>
        <Container>

            <MenuFilter setCategory={setCategory} setSearch={setSearch}/>

            <Row>
                {filtered.map(item => (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        cart={cart}
                        setCart={setCart}
                        // setShowToast={setShowToast}
                        // setShowCTA={setShowCTA}
                        ux={ux}
                        triggerUX={triggerUX}
                    />
                ))}
            </Row>


        </Container>
            {/*<CartToast show={showToast} message="Item added to cart 🛒" />*/}
            {/*<CartCTA show={showCTA} message="Item added to cart 🛒"  />*/}
            {/*<CartToast show={ux.toast} message={ux.message} />*/}


        </>

    );
}