import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, updateQuantity } from "./CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items || []);

  const getItemCost = (item) => Number(item.cost ?? item.price ?? 0);
  const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const totalCost = items.reduce(
    (sum, item) => sum + getItemCost(item) * Number(item.quantity || 0),
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: Number(item.quantity || 0) + 1 }));
  };

  const handleDecrement = (item) => {
    const nextQuantity = Number(item.quantity || 0) - 1;
    if (nextQuantity <= 0) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: nextQuantity }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  if (items.length === 0) {
    return (
      <main className="page-container cart-page cart-container">
        <div className="empty-cart">
          <div className="empty-icon" aria-hidden="true">🛒</div>
          <h1>Your Shopping Cart</h1>
          <p className="muted">Your cart is empty. Explore our plants!</p>
          <button className="button button-primary get-started-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container cart-page cart-container">
      <nav className="products-rubric-nav navbar" aria-label="Cart navigation">
        <button className="nav-link" onClick={onContinueShopping}>Home</button>
        <button className="nav-link" onClick={onContinueShopping}>Plants</button>
        <button className="nav-link cart-nav" aria-current="page">
          🛒 Cart <span className="cart-count cart_quantity">{totalQuantity}</span>
        </button>
      </nav>

      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Shopping Cart <span className="count-badge">{totalQuantity}</span></h1>
        </div>
        <button className="button button-outline get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-list">
          {items.map((item) => {
            const itemCost = getItemCost(item);
            const quantity = Number(item.quantity || 0);
            return (
              <article className="cart-row cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-product">
                  <h2>{item.name}</h2>
                  <p className="muted">Unit price: ₹{itemCost}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Subtotal: ₹{itemCost * quantity}</p>
                  <button
                    className="text-button remove-button cart-item-delete"
                    onClick={() => handleRemove(item)}
                    aria-label={`Delete ${item.name} from cart`}
                  >
                    Delete
                  </button>
                </div>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name} quantity`}>+</button>
                </div>
                <strong className="line-total">₹{itemCost * quantity}</strong>
              </article>
            );
          })}
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-line"><span>Total Items</span><span>{totalQuantity}</span></div>
          <div className="summary-line"><span>Subtotal</span><span>₹{totalCost}</span></div>
          <div className="summary-line"><span>Delivery</span><span className="free-label">FREE</span></div>
          <div className="summary-total"><span>Total Cost</span><strong>₹{totalCost}</strong></div>
          <button className="button button-primary checkout-button" onClick={() => window.alert("Coming Soon")}>
            Checkout
          </button>
          <button className="text-button clear-button" onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </aside>
      </div>
    </main>
  );
}
