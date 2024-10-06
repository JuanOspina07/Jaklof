import React, { useState, useRef, useEffect } from "react";
import { products as initialProducts } from "./mocks/products.json";
import { Products } from "./components/Products.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { IS_DEVELOPMENT } from "./config.js";
import { useFilters } from "./hooks/useFilters.js";
import { Cart } from "./components/Cart.jsx";
import { CartProvider } from "./context/cart.jsx";
import WelcomeConfig from "./components/Welcome/WelcomeConfig";
import Loader from "./components/Loader.jsx";
import Login from "./components/Login"; 

function App() {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(initialProducts);
  const [openShoop, setOpenShoop] = useState(false);

  const handleOpenShoop = () => {
    setOpenShoop(true);
  };

  return (
    <CartProvider>
      {!openShoop ? (
        <WelcomeConfig onShowAppContent={handleOpenShoop} />
      ) : (
        <div className="app-container"> 
          <Header />
          <Cart />
          <Login /> 
          <Products products={filteredProducts} />
          {IS_DEVELOPMENT && <Footer />}
        </div>
      )}
    </CartProvider>
  );
}

export default App;
