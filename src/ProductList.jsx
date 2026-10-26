import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice.jsx";

const plants = [
  { id: 1, name: "Snake Plant", category: "Air Purifying", price: 399, description: "A hardy, low-maintenance plant that looks great in any room.", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7a?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Monstera Deliciosa", category: "Indoor Plants", price: 699, description: "Beautiful split leaves that bring a tropical feel indoors.", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Peace Lily", category: "Flowering Plants", price: 499, description: "Elegant deep-green leaves and delicate white blooms.", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Golden Pothos", category: "Hanging Plants", price: 299, description: "A trailing favourite that adds greenery to shelves and corners.", image: "https://images.unsplash.com/photo-1616690249387-7e9a4e3a7e1b?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Rubber Plant", category: "Indoor Plants", price: 599, description: "Glossy leaves and a bold look for bright indoor spaces.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Aloe Vera", category: "Succulents", price: 249, description: "A useful, sun-loving succulent that needs little watering.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "ZZ Plant", category: "Low Maintenance", price: 449, description: "A resilient plant that tolerates lower-light conditions.", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Areca Palm", category: "Indoor Plants", price: 799, description: "Feathery palm fronds for a fresh, tropical atmosphere.", image: "https://images.unsplash.com/photo-1597055181300-a8f3a1c1a4c4?auto=format&fit=crop&w=700&q=80" }
];

export default function ProductList({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const countFor = (id) => items.find((item) => item.id === id)?.quantity || 0;

  return (
    <main className="page-container products-page app-container" id="plants">
      <div className="products-rubric-nav navbar">
        <button className="nav-link" onClick={onContinueShopping}>Home</button>
        <button className="nav-link" onClick={onShowPlants}>Plants</button>
        <button className="nav-link cart-nav" onClick={onShowCart}>🛒 Cart <span className="cart-count">{cartCount}</span></button>
      </div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">FIND YOUR GREEN</p>
          <h1>Plants for every space</h1>
          <p className="muted">Choose a favourite and make your space feel alive.</p>
        </div>
        <button className="button button-outline" onClick={onContinueShopping}>← Home</button>
      </div>
      <div className="plant-grid">
        {plants.map((plant) => (
          <article className="plant-card" key={plant.id}>
            <img src={plant.image} alt={plant.name} loading="lazy" />
            <div className="plant-info">
              <span className="plant-category">{plant.category}</span>
              <h2>{plant.name}</h2>
              <p>{plant.description}</p>
              <div className="plant-card-bottom">
                <strong>₹{plant.price}</strong>
                <button className="button button-primary" onClick={() => dispatch(addItem(plant))}>
                  {countFor(plant.id) ? `Add more (${countFor(plant.id)})` : "Add to cart"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
