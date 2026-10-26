import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  { id: 1, name: "Snake Plant", category: "Indoor Plants", price: 299, image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?w=400" },
  { id: 2, name: "Peace Lily", category: "Indoor Plants", price: 399, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400" },
  { id: 3, name: "Monstera", category: "Indoor Plants", price: 499, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
  { id: 4, name: "Aloe Vera", category: "Indoor Plants", price: 199, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
  { id: 5, name: "Spider Plant", category: "Indoor Plants", price: 249, image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400" },
  { id: 6, name: "Areca Palm", category: "Indoor Plants", price: 599, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400" },
  { id: 7, name: "Rose", category: "Outdoor Plants", price: 299, image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400" },
  { id: 8, name: "Hibiscus", category: "Outdoor Plants", price: 249, image: "https://images.unsplash.com/photo-1597055181300-ade3d8b9e4f7?w=400" },
  { id: 9, name: "Jasmine", category: "Outdoor Plants", price: 199, image: "https://images.unsplash.com/photo-1597848212624-e6e7c7d6c5c4?w=400" },
  { id: 10, name: "Bougainvillea", category: "Outdoor Plants", price: 349, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400" },
  { id: 11, name: "Marigold", category: "Outdoor Plants", price: 149, image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400" },
  { id: 12, name: "Petunia", category: "Outdoor Plants", price: 179, image: "https://images.unsplash.com/photo-1469259943454-aa100abba749?w=400" },
  { id: 13, name: "Basil", category: "Herbs", price: 99, image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400" },
  { id: 14, name: "Mint", category: "Herbs", price: 89, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400" },
  { id: 15, name: "Rosemary", category: "Herbs", price: 149, image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400" },
  { id: 16, name: "Thyme", category: "Herbs", price: 129, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
  { id: 17, name: "Coriander", category: "Herbs", price: 79, image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400" },
  { id: 18, name: "Oregano", category: "Herbs", price: 139, image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400" }
];

export default function ProductList({ onContinueShopping, onShowCart, onShowPlants }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categories = ["Indoor Plants", "Outdoor Plants", "Herbs"];

  return (
    <main className="product-list-container">
      <h1>Our Plants</h1>
      <p>Discover the perfect plants for your home and garden.</p>

      <nav className="navbar" aria-label="Plant shop navigation">
        <button onClick={onContinueShopping}>Home</button>
        <button onClick={onShowPlants}>Plants</button>
        <button onClick={onShowCart}>Cart ({cartCount})</button>
      </nav>

      {categories.map((category) => (
        <section key={category}>
          <h2>{category}</h2>

          <div className="product-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const inCart = cartItems.some((item) => item.id === plant.id);

                return (
                  <article className="plant-card" key={plant.id}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{ width: "100%", height: "180px", objectFit: "cover" }}
                    />

                    <h3>{plant.name}</h3>
                    <p>Price: ₹{plant.price}</p>

                    <button
                      className="button button-primary"
                      disabled={inCart}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {inCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </main>
  );
}