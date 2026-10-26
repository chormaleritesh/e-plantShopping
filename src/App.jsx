import React, { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs.jsx";
import ProductList from "./ProductList.jsx";
import CartItem from "./CartItem.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showHome = () => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const showPlants = () => { setPage("plants"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const showCart = () => { setPage("cart"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="app-shell">
      <header className="navbar">
        <button className="brand" onClick={showHome} aria-label="Paradise Nursery home">
          <span className="brand-icon">🌿</span><span>Paradise<span className="brand-light">Nursery</span></span>
        </button>
        <nav>
          <button className={page === "home" ? "nav-link active" : "nav-link"} onClick={showHome}>Home</button>
          <button className={page === "plants" ? "nav-link active" : "nav-link"} onClick={showPlants}>Shop Plants</button>
          <button className="nav-link cart-nav" onClick={showCart}>🛒 Cart <span className="cart-count">{cartCount}</span></button>
        </nav>
      </header>

      {page === "home" && (
        <>
          <main className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <span className="hero-pill">GROW SOMETHING GOOD</span>
              <h1>Bring nature<br />into your <em>home.</em></h1>
              <p>Thoughtfully chosen plants to make your space calmer, brighter, and more alive.</p>
              <button className="button button-light" onClick={showPlants}>Get Started <span>→</span></button>
              <div className="hero-note">🌱 Easy-care plants · Green living made simple</div>
            </div>
          </main>
          <section className="benefits">
            <div><span>🌿</span><h3>Healthy plants</h3><p>Selected with care for your home.</p></div>
            <div><span>🚚</span><h3>Careful delivery</h3><p>Plants packed with extra love.</p></div>
            <div><span>💚</span><h3>Beginner friendly</h3><p>Find the right plant for your lifestyle.</p></div>
          </section>
          <AboutUs />
          <section className="home-cta"><h2>Your greener home starts here.</h2><button className="button button-primary" onClick={showPlants}>Explore our plants →</button></section>
        </>
      )}
      {page === "plants" && <ProductList onContinueShopping={showHome} />}
      {page === "cart" && <CartItem onContinueShopping={showPlants} />}

      <footer className="footer"><span>🌿 Paradise Nursery</span><span>Grow joy. Live green.</span><span>© {new Date().getFullYear()} Paradise Nursery</span></footer>
    </div>
  );
}
