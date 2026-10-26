import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice.jsx";

const plantsArray = [
  {
    id: 1,
    name: "Snake Plant",
    category: "Indoor Plants",
    price: 399,
    cost: 399,
    description: "A hardy, low-maintenance plant for any room.",
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Monstera Deliciosa",
    category: "Indoor Plants",
    price: 699,
    cost: 699,
    description: "Beautiful split leaves with a tropical appearance.",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Rubber Plant",
    category: "Indoor Plants",
    price: 599,
    cost: 599,
    description: "Glossy green leaves for bright indoor spaces.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "ZZ Plant",
    category: "Indoor Plants",
    price: 449,
    cost: 449,
    description: "A resilient plant that tolerates low-light conditions.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Peace Lily",
    category: "Indoor Plants",
    price: 499,
    cost: 499,
    description: "An elegant plant with deep-green leaves and white blooms.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Areca Palm",
    category: "Indoor Plants",
    price: 799,
    cost: 799,
    description: "A tropical palm that adds greenery to your home.",
    image: "https://images.unsplash.com/photo-1597055181300-a8f3a1c1a4c4?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Aloe Vera",
    category: "Outdoor Plants",
    price: 249,
    cost: 249,
    description: "A sun-loving succulent that needs little watering.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Jade Plant",
    category: "Outdoor Plants",
    price: 299,
    cost: 299,
    description: "A compact succulent with thick, glossy leaves.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 9,
    name: "Bougainvillea",
    category: "Outdoor Plants",
    price: 549,
    cost: 549,
    description: "A colourful flowering plant for sunny gardens.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 10,
    name: "Hibiscus",
    category: "Outdoor Plants",
    price: 399,
    cost: 399,
    description: "A flowering plant that adds colour to outdoor spaces.",
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 11,
    name: "Croton",
    category: "Outdoor Plants",
    price: 449,
    cost: 449,
    description: "A colourful foliage plant for a sunny garden.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 12,
    name: "Fern",
    category: "Outdoor Plants",
    price: 349,
    cost: 349,
    description: "A lush green plant that grows well in shaded spaces.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 13,
    name: "Mint",
    category: "Herbs",
    price: 89,
    cost: 89,
    description: "Fresh aromatic leaves for drinks and cooking.",
    image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 14,
    name: "Rosemary",
    category: "Herbs",
    price: 149,
    cost: 149,
    description: "Fragrant evergreen leaves for everyday cooking.",
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 15,
    name: "Thyme",
    category: "Herbs",
    price: 129,
    cost: 129,
    description: "A compact herb with aromatic leaves.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 16,
    name: "Coriander",
    category: "Herbs",
    price: 79,
    cost: 79,
    description: "Fresh green leaves for garnishes and curries.",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 17,
    name: "Oregano",
    category: "Herbs",
    price: 139,
    cost: 139,
    description: "A classic culinary herb with a rich aroma.",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 18,
    name: "Basil",
    category: "Herbs",
    price: 99,
    cost: 99,
    description: "A fragrant kitchen herb for salads and sauces.",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=700&q=80"
  }
];

const categories = [
  "Indoor Plants",
  "Outdoor Plants",
  "Herbs"
];

export default function ProductList({
  onContinueShopping,
  onShowCart,
  onShowPlants
}) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const addedToCart = {};

  cartItems.forEach((item) => {
    addedToCart[item.name] = true;
  });

  const handleAddToCart = (plant) => {
    if (!addedToCart[plant.name]) {
      dispatch(addItem(plant));
    }
  };

  return (
    <main
      className="page-container products-page app-container"
      id="plants"
    >
      <nav
        className="products-rubric-nav navbar"
        aria-label="Plant shop navigation"
      >
        <button
          type="button"
          className="nav-link"
          onClick={onContinueShopping}
        >
          Home
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={onShowPlants}
        >
          Plants
        </button>

        <button
          type="button"
          className="nav-link cart-nav"
          onClick={onShowCart}
        >
          🛒 Cart
          <span className="cart-count cart_quantity">
            {cartCount}
          </span>
        </button>
      </nav>

      <div className="section-heading">
        <div>
          <p className="eyebrow">FIND YOUR GREEN</p>

          <h1>Plants for Every Space</h1>

          <p className="muted">
            Choose your favourites and make your space feel alive.
          </p>
        </div>
      </div>

      {categories.map((category) => {
        const categoryPlants = plantsArray.filter(
          (plant) => plant.category === category
        );

        return (
          <section
            className="plant-category-section"
            key={category}
          >
            <h2 className="category-heading">
              {category}
            </h2>

            <div className="plant-grid plantsArray">
              {categoryPlants.map((plant) => (
                <article
                  className="plant-card"
                  key={plant.id}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                  />

                  <div className="plant-info">
                    <span className="plant-category">
                      {plant.category}
                    </span>

                    <h3>{plant.name}</h3>

                    <p>{plant.description}</p>

                    <div className="plant-card-bottom">
                      <strong>₹{plant.cost}</strong>

                      <button
                        type="button"
                        className="button button-primary"
                        disabled={Boolean(addedToCart[plant.name])}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {addedToCart[plant.name]
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}