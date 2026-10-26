import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items || []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-container">
      <h1>Shopping Cart</h1>
      <p>Total plants: {totalItems}</p>

      {items.length === 0 ? (
        <div>
          <p>Your shopping cart is empty.</p>
          <button onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <article
              className="cart-item"
              key={item.id}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover"
                }}
              />

              <div>
                <h3>{item.name}</h3>
                <p>Unit price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>

                <button
                  onClick={() =>
                    item.quantity > 1
                      ? dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1
                          })
                        )
                      : dispatch(removeItem(item.id))
                  }
                >
                  −
                </button>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1
                      })
                    )
                  }
                >
                  +
                </button>

                <button onClick={() => dispatch(removeItem(item.id))}>
                  Delete
                </button>
              </div>
            </article>
          ))}

          <h2>Total Cost: ₹{totalCost}</h2>

          <button
            onClick={() => alert("Coming Soon!")}
          >
            Checkout
          </button>

          <button
            className="button button-outline"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </>
      )}
    </main>
  );
}