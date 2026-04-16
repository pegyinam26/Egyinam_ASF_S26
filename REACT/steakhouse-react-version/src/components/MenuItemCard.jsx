import {Card, CardBody, Button} from "reactstrap";
import {useState, useRef} from "react";



export default function MenuItemCard({ item, cart, setCart,triggerUX}) {
    const [qty, setQty] = useState(1);

    {/*Fly to cart functionality*/}
    const imgRef = useRef();
    const flyToCart = (imgElement) => {
        const cartBadge = document.getElementById("cart-badge");
        if (!cartBadge || !imgElement) return;

        const imgRect = imgElement.getBoundingClientRect();
        const cartRect = cartBadge.getBoundingClientRect();

        const clone = imgElement.cloneNode(true);

        clone.style.position = "fixed";
        clone.style.left = imgRect.left + "px";
        clone.style.top = imgRect.top + "px";
        clone.style.width = imgRect.width + "px";
        clone.style.height = imgRect.height + "px";
        clone.style.zIndex = 9999;
        clone.style.transition = "all 0.7s ease-in-out";

        document.body.appendChild(clone);

        setTimeout(() => {
            clone.style.left = cartRect.left + "px";
            clone.style.top = cartRect.top + "px";
            clone.style.width = "20px";
            clone.style.height = "20px";
            clone.style.opacity = "0.5";
        }, 10);

        setTimeout(() => {
            clone.remove();
        }, 700);
    };

    const [isAdding, setIsAdding] = useState(false);
    const addToCart = () => {
        setIsAdding(true);
        setTimeout(() => {
        const existing = cart.find(i => i.id === item.id);

        if (existing && existing.quantity >= 5) {
            setQty(1);          // reset dropdown
            setIsAdding(false); // reset button text
                return; // 🔥 STOP everything (no animation, no UX)
            }

        let updatedCart;

        if (existing) {
            existing.quantity = Math.min(existing.quantity + qty, 5);
            updatedCart = [...cart];
        } else {
            updatedCart = [...cart, { ...item, quantity: qty }];
        }
            setCart(updatedCart);
            flyToCart(imgRef.current);
            // setAnimateBadge(true);
            triggerUX(item.name, updatedCart);




            setIsAdding(false);
            setQty(1);  // reset dropdown after successful add
        }, 400); // short delay for UX
    };

    return (
        <div className="col-md-4 mb-4 fade-in shadow">
            <Card className="menu-card h-100 position-relative">
                {item.image && (
                    <div className="card-img-wrapper">
                        <img ref={imgRef} src={item.image} alt={item.name} />
                    </div>
                )}
                    <CardBody className="d-flex flex-column position-relative">
                        <h5 className="menu-title mt-3">
                            {item.name}
                        </h5>
                        <div className="menu-description flex-grow-1 mt-3">
                            {item.description}
                        </div>
                        <div className="price mt-3">
                            ${item.price.toFixed(2)}
                        </div>
                        <div className="category mt-4 mb-2">
                            {item.category}
                        </div>
                        <select className="dropdown" onChange={(e) => setQty(Number(e.target.value))}>
                            {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
                        </select>
                        {/*SELECT WITH CUSTOM DROPDOWN*/}
                        {/*<CustomDropdown className="dropdown-item position-absolute"*/}
                        {/*    value={qty}*/}
                        {/*    onChange={(val) => setQty(val)}*/}
                        {/*    options={[1, 2, 3, 4, 5]}*/}
                        {/*/>*/}
                        <Button className="btn-gold add-cart-btn" color="warning" onClick={addToCart} disabled={isAdding}>
                            {isAdding ? "Adding..." : "Add to Cart"}
                        </Button>
                </CardBody>
            </Card>
        </div>
    );
}