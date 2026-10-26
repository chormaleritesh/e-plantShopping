import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="page-container cart-page">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h1>Your shopping cart is empty</h1>
          <p className="muted">Find a plant you love and add it to your cart.</p>
          <button className="button button-primary" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Shopping Cart <span className="count-badge">{totalQuantity} items</span></h1>
        </div>
        <button className="button button-outline" onClick={onContinueShopping}>← Continue Shopping</button>
      </div>
      <div className="cart-layout">
        <section className="cart-list">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-product">
                <h2>{item.name}</h2>
                <p className="muted">Unit price: ₹{item.price}</p>
                <button className="text-button remove-button" onClick={() => dispatch(removeItem(item.id))}>Delete / Remove</button>
              </div>
              <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                <span>{item.quantity}</span>
                <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
              </div>
              <strong className="line-total">₹{item.price * item.quantity}</strong>
            </article>
          ))}
        </section>
        <aside className="order-summary">
          <h2>Order summary</h2>
          <div className="summary-line"><span>Total plant quantity</span><span>{totalQuantity}</span></div>
          <div className="summary-line"><span>Delivery</span><span className="free-label">FREE</span></div>
          <div className="summary-total"><span>Total price</span><strong>₹{totalPrice}</strong></div>
          <button className="button button-primary checkout-button" onClick={() => window.alert("Coming Soon! Checkout will be available in a future update.")}>Checkout — Coming Soon</button>
          <button className="button button-outline checkout-button" onClick={onContinueShopping}>Continue Shopping</button>
        </aside>
      </div>
    </main>
  );
}
