import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity
} from "./CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.cart.items || []
  );

  const totalQuantity = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const totalCost = items.reduce(
    (sum, item) =>
      sum +
      Number(item.cost ?? item.price ?? 0) *
        Number(item.quantity || 0),
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.id));
      return;
    }

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    window.alert("Coming Soon!");
  };

  if (items.length === 0) {
    return (
      <main className="page-container cart-page cart-container">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>

          <h1>Your shopping cart is empty.</h1>

          <p className="muted">
            Discover our plants and bring some greenery home.
          </p>

          <button
            type="button"
            className="get-started-button"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container cart-page cart-container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>

          <h1>
            Shopping Cart{" "}
            <span className="count-badge cart_quantity">
              {totalQuantity}
            </span>
          </h1>

          <p className="muted">
            Review your selected plants before checkout.
          </p>
        </div>

        <button
          type="button"
          className="button button-outline get-started-button"
          onClick={onContinueShopping}
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-list">
          {items.map((item) => {
            const unitCost = Number(
              item.cost ?? item.price ?? 0
            );

            const quantity = Number(item.quantity || 0);

            const itemTotal = unitCost * quantity;

            return (
              <article
                className="cart-row cart-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-product">
                  <h2>{item.name}</h2>

                  <p className="muted">
                    Unit price: ₹{unitCost}
                  </p>

                  <p>
                    Quantity: {quantity}
                  </p>

                  <button
                    type="button"
                    className="text-button remove-button cart-item-delete"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>

                <div
                  className="quantity-control"
                  aria-label={`Quantity controls for ${item.name}`}
                >
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => handleDecrement(item)}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <strong className="line-total">
                  ₹{itemTotal}
                </strong>
              </article>
            );
          })}
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Items ({totalQuantity})</span>
            <span>₹{totalCost}</span>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <span className="free-label">FREE</span>
          </div>

          <div className="summary-total">
            <span>Total Cost</span>
            <strong>₹{totalCost}</strong>
          </div>

          <button
            type="button"
            className="button button-primary checkout-button"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <button
            type="button"
            className="text-button clear-button"
            onClick={() => {
              items.forEach((item) => {
                dispatch(removeItem(item.id));
              });
            }}
          >
            Clear Cart
          </button>
        </aside>
      </div>
    </main>
  );
}