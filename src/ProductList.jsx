import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice.jsx";

const plantCategories = [
  {
    name: "Indoor Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 399, description: "Hardy, upright leaves for an easy-care indoor green companion.", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7a?auto=format&fit=crop&w=700&q=80" },
      { id: 2, name: "Monstera Deliciosa", price: 699, description: "Iconic split leaves bring a tropical look to your room.", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80" },
      { id: 3, name: "Rubber Plant", price: 599, description: "Glossy leaves make a bold statement in bright indoor spaces.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
      { id: 4, name: "ZZ Plant", price: 449, description: "A resilient plant that is forgiving when watering is irregular.", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80" },
      { id: 5, name: "Areca Palm", price: 799, description: "Feathery fronds create a relaxed, tropical atmosphere.", image: "https://images.unsplash.com/photo-1597055181300-a8f3a1c1a4c4?auto=format&fit=crop&w=700&q=80" },
      { id: 6, name: "Peace Lily", price: 499, description: "Elegant green leaves and beautiful white blooms.", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80" }
    ]
  },
  {
    name: "Flowering Plants",
    plants: [
      { id: 7, name: "Anthurium", price: 549, description: "Shiny leaves and colourful heart-shaped blooms.", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80" },
      { id: 8, name: "Orchid", price: 649, description: "Elegant flowers add a graceful touch to a bright room.", image: "https://images.unsplash.com/photo-1566907225472-514a36f9a7e7?auto=format&fit=crop&w=700&q=80" },
      { id: 9, name: "African Violet", price: 299, description: "A compact flowering plant for a sunny windowsill.", image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=700&q=80" },
      { id: 10, name: "Kalanchoe", price: 349, description: "Cheerful clusters of flowers with simple care needs.", image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=80" },
      { id: 11, name: "Jasmine", price: 399, description: "A fragrant flowering favourite for a bright balcony.", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80" },
      { id: 12, name: "Bougainvillea", price: 459, description: "Vibrant colour for sunny patios and outdoor spaces.", image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=700&q=80" }
    ]
  },
  {
    name: "Succulents & Cacti",
    plants: [
      { id: 13, name: "Aloe Vera", price: 249, description: "A sun-loving succulent with fleshy, sculptural leaves.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
      { id: 14, name: "Echeveria", price: 199, description: "A rosette-shaped succulent for desks and sunny shelves.", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=700&q=80" },
      { id: 15, name: "Jade Plant", price: 299, description: "A long-lived succulent with thick, rounded leaves.", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80" },
      { id: 16, name: "Barrel Cactus", price: 229, description: "A sculptural cactus for a bright, sunny spot.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
      { id: 17, name: "Haworthia", price: 279, description: "A compact patterned succulent that suits small spaces.", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=700&q=80" },
      { id: 18, name: "String of Pearls", price: 379, description: "Trailing bead-like leaves look lovely on a high shelf.", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80" }
    ]
  }
];

export default function ProductList({ onContinueShopping, onShowCart, onShowPlants }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const addedIds = new Set(items.map((item) => item.id));

  return (
    <main className="page-container products-page" id="plants">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FIND YOUR GREEN</p>
          <h1>Plants for every space</h1>
          <p className="muted">Explore our collection, grouped to help you find your perfect plant.</p>
        </div>
        <button className="button button-outline" onClick={onContinueShopping}>← Home</button>
      </div>
      {plantCategories.map((category) => (
        <section className="plant-category-section" key={category.name}>
          <div className="category-heading">
            <h2>{category.name}</h2>
            <span>{category.plants.length} plants</span>
          </div>
          <div className="plant-grid">
            {category.plants.map((plant) => (
              <article className="plant-card" key={plant.id}>
                <img src={plant.image} alt={plant.name} loading="lazy" />
                <div className="plant-info">
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <div className="plant-card-bottom">
                    <strong>₹{plant.price}</strong>
                    <button
                      className="button button-primary"
                      disabled={addedIds.has(plant.id)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {addedIds.has(plant.id) ? "Added to cart ✓" : "Add to cart"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
