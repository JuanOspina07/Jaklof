import React, { useState } from "react";
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

function App() {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(initialProducts);
  // const [loader, setLoader] = useState(false);
  const [openShoop, setOpenShoop] = useState(false);

  const handleOpenShoop = () => {
    setOpenShoop(true);
  //   setLoader(true);
  // };
  // const loaderComponent = () => {
  //   <div
  //     style={{
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       height: "100vh",
  //     }}
  //   >
  //     <Loader />
  //   </div>;
  };

  return (
    <CartProvider>
      {!openShoop ? (
        <WelcomeConfig onShowAppContent={handleOpenShoop} />
      ) : (
        <div>
          <Header />
          <Cart />
          <Products products={filteredProducts} />
          {IS_DEVELOPMENT && <Footer />}
        </div>
      )}
    </CartProvider>
  );
}

export default App;
