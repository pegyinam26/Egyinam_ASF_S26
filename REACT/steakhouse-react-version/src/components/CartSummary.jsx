export default function CartSummary({ cart }) {
    const subtotal = cart.reduce((sum,i)=> sum + i.price*i.quantity,0);
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;
    return (
        <div>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Total: ${total.toFixed(2)}</h4>
        </div>
    );
}