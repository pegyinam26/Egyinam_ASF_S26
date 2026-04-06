import {Button, Table} from "reactstrap";
import CartSummary from "../components/CartSummary";
import ConfirmModal from "../components/ConfirmModal";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
    
export default function CartPage({ cart, setCart }) {

    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const [submitModal, setSubmitModal] = useState(false);

    // const confirmSubmit = () => {
    //     setCart([]);              // clear cart
    //     setSubmitModal(false);    // close modal
    //     navigate("/menu");        // redirect
    // };

    const handleSubmitOrder = () => {
        setSubmitModal(true);

        setTimeout(() => {
            setCart([]);
            setSubmitModal(false);
            navigate("/menu");
        }, 2000);
    };
    // if(cart.length === 0){
    //
    //     return <>
    //             <PageHero title="Review your menu selections..." className="cart-hero" />
    //                 <div className="text-center mt-5">
    //                      <h3>Your Cart is empty!</h3>
    //                 </div>
    //             </>
    // }
    const cancelOrder = () => {
        setCart([]);
        navigate("/menu");
    };
    return (
        <>
            <PageHero title="Review your menu selections..." className="cart-hero" />
        <div>
            {cart.length === 0 ? (
                <div>
                    <h3 className="empty-cart-text">
                        Your Cart is empty!
                    </h3>
                    <div className="text-center mt-4">
                        <Button className="btn-gold me-2" onClick={() => setModal(true)}>Cancel Order</Button>
                        <Button className="btn-gold" onClick={handleSubmitOrder}>Submit Order</Button>
                    </div>
                </div>
                ) : (
            <Table>
                <thead>
                    <tr>
                        <th>Menu Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )};

            <CartSummary cart={cart} />
            <Button color="danger" onClick={()=>setModal(true)}>Cancel</Button>

            <ConfirmModal
                isOpen={modal}
                toggle={() => setModal(false)}
                confirm={cancelOrder}
                title="Cancel Order"
                message="Are you sure you want to cancel your order?"
            />
            <Button color="success" onClick={handleSubmitOrder}>Submit Order</Button>
            {/*<ConfirmModal*/}
            {/*    isOpen={submitModal}*/}
            {/*    toggle={() => setSubmitModal(false)}*/}
            {/*    confirm={confirmSubmit}*/}
            {/*    title="Thank You"*/}
            {/*    message="Your order has been placed successfully!"*/}

            {/*/>*/}
            <ConfirmModal
                isOpen={submitModal}
                toggle={() => setSubmitModal(false)}
                showActions={false}
                title="Thank You"
                message="Your order has been placed successfully."
            />

        </div>


        </>
    );
}