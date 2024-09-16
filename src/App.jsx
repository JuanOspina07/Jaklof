import React, { useState, useRef, useEffect} from "react";
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

  
  const songs = ["/sisisi.mp3", "/competencia.mp3", "/wya.mp3"];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Referencia para el elemento <audio>
  const audioRef = useRef(null);

  // Efecto para reiniciar la reproducción cuando cambia la canción
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Recarga la canción actual
      audioRef.current.play(); // Inicia la reproducción
    }
  }, [currentSongIndex]);

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
  const sonde = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length); // Cambia al siguiente índice o vuelve al primero
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
          <audio
            ref={audioRef} // Referencia al elemento <audio>
            autoPlay
            loop={false} // No repetir la misma canción
            onEnded={sonde} // Cambiar canción cuando termine
          >
            <source src={songs[currentSongIndex]} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </CartProvider>
  );
}

export default App;
