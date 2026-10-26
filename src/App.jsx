import React, { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs.jsx";
import ProductList from "./ProductList.jsx";
import CartItem from "./CartItem.jsx";

export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const goHome = () => { setShowProductList(false); setShowCart(false); window.scrollTo(0, 0); };
  const goPlants = () => { setShowProductList(true); setShowCart(false); window.scrollTo(0, 0); };
  const goCart = () => { setShowCart(true); setShowProductList(false); window.scrollTo(0, 0); };
  return (
    <div className="app-container app-shell">
      <header className="navbar">
        <button className="brand" onClick={goHome} aria-label="Paradise Nursery home"><span className="brand-icon">🌿</span><span>Paradise<span className="brand-light">Nursery</span></span></button>
        <nav aria-label="Main navigation">
          <button className="nav-link" onClick={goHome}>Home</button>
          <button className="nav-link" onClick={goPlants}>Plants</button>
          <button className="nav-link cart-nav" onClick={goCart}>🛒 Cart <span className="cart-count">{cartCount}</span></button>
        </nav>
      </header>
      {!showProductList && !showCart && <>
        <main className="hero background-image">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="hero-pill">GROW SOMETHING GOOD</span>
            <h1>Welcome to Paradise Nursery</h1>
            <p>Thoughtfully chosen plants to make your space calmer, brighter, and more alive.</p>
            <button className="button button-light" onClick={goPlants}>Get Started <span>→</span></button>
            <div className="hero-note">🌱 Easy-care plants · Green living made simple</div>
          </div>
        </main>
        <section className="benefits"><div><span>🌿</span><h3>Healthy plants</h3><p>Selected with care for your home.</p></div><div><span>🚚</span><h3>Careful delivery</h3><p>Plants packed with extra love.</p></div><div><span>💚</span><h3>Beginner friendly</h3><p>Find the right plant for your lifestyle.</p></div></section>
        <AboutUs />
        <section className="home-cta"><h2>Your greener home starts here.</h2><button className="button button-primary" onClick={goPlants}>Explore our plants →</button></section>
      </>}
      {showProductList && <ProductList onContinueShopping={goHome} onShowCart={goCart} onShowPlants={goPlants} />}
      {showCart && <CartItem onContinueShopping={goPlants} />}
      <footer className="footer"><span>🌿 Paradise Nursery</span><span>Grow joy. Live green.</span><span>© {new Date().getFullYear()} Paradise Nursery</span></footer>
    </div>
  );
}
