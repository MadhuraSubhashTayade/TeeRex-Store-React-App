import Header from "./components/Header";
import HomeWrapper from "./components/HomeWrapper";
import "./index.css";
import "./queries.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CartComponent from "./components/CartComponent";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  // 1. Add to cart
  const addToCart = (product) => {
    const copy = cartItems.find((x) => x.product.id === product.id);
    if (copy) {
      copy.quantity = copy.quantity + 1;
      alert(`${product.name} already exists, quantity incremented!`);
    } else {
      const item = {
        product: product,
        quantity: 1,
      };
      setCartItems([...cartItems, item]);
      alert(`${product.name} added to cart!`);
    }
  };

  // 2. Remove from cart
  const removeFromCart = (cartItem) => {
    const item = cartItems.find((x) => x.product.id === cartItem.id);
    setCartItems(cartItems.filter((x) => x !== item));
    alert(`${item.product.name} removed to cart!`);
  };

  const incrementQuantity = (id) => {
    const item = cartItems.find((x) => x.product.id === id);
    const max = item.product.quantity;
    if (item.quantity === max) {
      alert("Maximum order quantity reached !");
      return;
    }
    item.quantity = max === item.quantity ? max : item.quantity + 1;
    setCartItems([...cartItems]);
  };

  const decrementQuantity = (id) => {
    const item = cartItems.find((x) => x.product.id === id);
    if (item.quantity === 1) {
      alert("Minimum order quantity should be 1 !");
      return;
    }
    item.quantity = item.quantity === 1 ? 1 : item.quantity - 1;
    setCartItems([...cartItems]);
  };

  return (
    <div className="container">
      <header className="header-container">
        <Header cartCount={cartItems.length} />
      </header>
      <Routes>
        <Route path="/" element={<HomeWrapper addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <section className="cart-section-container">
              <CartComponent
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            </section>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
