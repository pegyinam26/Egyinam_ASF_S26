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
    const [emptySubmitMsg, setEmptySubmitMsg] = useState(false);

    // const confirmSubmit = () => {
    //     setCart([]);              // clear cart
    //     setSubmitModal(false);    // close modal
    //     navigate("/menu");        // redirect
    // };

    const handleSubmitOrder = () => {
        if (cart.length === 0) {
            setEmptySubmitMsg(true);

            setTimeout(() => {
                setEmptySubmitMsg(false);
                navigate("/menu");
            }, 2000);

            return;
        }

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
        if (cart.length === 0) {
            setEmptySubmitMsg(true);

            setTimeout(() => {
                setEmptySubmitMsg(false);
                navigate("/menu");
            }, 2000);

            return;
        }

        setCart([]);
        navigate("/menu");
    };
//     return (
//         <>
//             <PageHero title="Review your menu selections..." className="cart-hero" />
//         <div>
//             {cart.length === 0 ? (
//                 <div>
//                     <h3 className="empty-cart-text">
//                         Your Cart is empty!
//                     </h3>
//                     <div className="text-center mt-4 d-flex justify-content-center gap-3">
//                         <Button className="btn-gold me-2" onClick={() => setModal(true)}>Cancel Order</Button>
//                         <Button className="btn-gold" onClick={handleSubmitOrder}>Submit Order</Button>
//                     </div>
//
//                 </div>
//                 ) : (
//                 <Table className="table table-dark table-striped text-center align-middle">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Menu Item</th>
//                         <th>Qty</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cart.map(item => (
//                         <tr key={item.id}>
//                             <td>{item.id}</td>
//                             <td>{item.name}</td>
//                             <td>{item.quantity}</td>
//                             <td>${item.price * item.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             )};
//
//             <div className="text-center mt-4">
//                 <CartSummary cart={cart} />
//
//                 <div className="d-flex justify-content-center gap-3 mt-3">
//                     <Button className="btn-gold" onClick={() => setModal(true)}>
//                         Cancel Order
//                     </Button>
//                     <Button className="btn-gold" onClick={handleSubmitOrder}>
//                         Submit Order
//                     </Button>
//                 </div>
//             </div>
//
//             <ConfirmModal
//                 isOpen={modal}
//                 toggle={() => setModal(false)}
//                 confirm={cancelOrder}
//                 title="Cancel Order"
//                 message="Are you sure you want to cancel your order?"
//             />
//             {/*<Button color="success" onClick={handleSubmitOrder}>Submit Order</Button>*/}
//             {/*<ConfirmModal*/}
//             {/*    isOpen={submitModal}*/}
//             {/*    toggle={() => setSubmitModal(false)}*/}
//             {/*    confirm={confirmSubmit}*/}
//             {/*    title="Thank You"*/}
//             {/*    message="Your order has been placed successfully!"*/}
//
//             {/*/>*/}
//             {/*<ConfirmModal*/}
//             {/*    isOpen={submitModal}*/}
//             {/*    toggle={() => setSubmitModal(false)}*/}
//             {/*    showActions={false}*/}
//             {/*    title="Thank You"*/}
//             {/*    message="Your order has been placed successfully."*/}
//             {/*/>*/}
//
//         </div>
//
//
//         </>
//     );
// }


    return (
        <>
            <PageHero title="Review your menu selections..." className="cart-hero" />

            <div className="text-center cart-content">

                {cart.length === 0 ? (
                    <>
                        <h3 className="empty-cart-text mt-4">
                            Your Cart is empty!
                        </h3>
                        {emptySubmitMsg && (
                            <p className="mt-3 text-warning">
                                No order placed, redirecting back to menu...
                            </p>
                        )}

                        <div className="cart-actions d-flex justify-content-center gap-3 mt-4">
                            <Button className="btn-gold" onClick={cancelOrder}>
                                Cancel Order
                            </Button>
                            <Button className="btn-gold" onClick={handleSubmitOrder}>
                                Submit Order
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* TABLE */}
                        <div className="cart-table-container">
                                <Table className="table table-dark table-striped text-center align-middle">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Item</th>
                                        <th>Menu Item</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            {/* IMAGE */}
                                            <td>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="cart-item-img"
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                        </div>

                        {/* MOVE CartSummary INSIDE THIS BLOCK */}
                        <div className="cart-summary text-center mt-4">
                            <CartSummary cart={cart} />
                        </div>

                        {/* BUTTONS */}
                        <div className="cart-actions d-flex justify-content-center gap-3 mt-3">
                            <Button className="btn-gold" onClick={() => setModal(true)}>
                                Cancel Order
                            </Button>
                            <Button className="btn-gold" onClick={handleSubmitOrder}>
                                Submit Order
                            </Button>
                        </div>
                    </>
                )}

                {/* CANCEL MODAL */}
                <ConfirmModal
                    isOpen={modal}
                    toggle={() => setModal(false)}
                    confirm={() => {
                        setModal(false);
                        setCart([]);
                        navigate("/menu");
                    }}
                    title="Cancel Order"
                    message="Are you sure you want to cancel your order?"
                />

                {/* SUBMIT MODAL (ONLY FOR FILLED CART) */}
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