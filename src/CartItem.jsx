import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, updateQuantity } from "./CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!items.length) {
    return (
      <main className="page-container cart-page">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h1>Your cart is waiting for a little green.</h1>
          <p className="muted">You haven't added any plants yet.</p>
          <button className="button button-primary" onClick={onContinueShopping}>Browse plants</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Shopping Cart <span className="count-badge">{totalQuantity}</span></h1>
        </div>
        <button className="button button-outline" onClick={onContinueShopping}>← Continue shopping</button>
      </div>
      <div className="cart-layout">
        <section className="cart-list">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-product">
                <h2>{item.name}</h2>
                <p className="muted">₹{item.price} each</p>
                <button className="text-button remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </div>
              <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button aria-label="Decrease quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                <span>{item.quantity}</span>
                <button aria-label="Increase quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
              </div>
              <strong className="line-total">₹{item.price * item.quantity}</strong>
            </article>
          ))}
        </section>
        <aside className="order-summary">
          <h2>Order summary</h2>
          <div className="summary-line"><span>Items ({totalQuantity})</span><span>₹{total}</span></div>
          <div className="summary-line"><span>Delivery</span><span className="free-label">FREE</span></div>
          <div className="summary-total"><span>Total</span><strong>₹{total}</strong></div>
          <button className="button button-primary checkout-button" onClick={() => window.alert("Thank you! Your demo order total is ₹" + total + ".")}>Checkout</button>
          <button className="text-button clear-button" onClick={() => dispatch(clearCart())}>Clear cart</button>
        </aside>
      </div>
    </main>
  );
}
