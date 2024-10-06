import { useState, useRef, useEffect, useCallback } from 'react';
import "../styles/Products.css";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { useCart } from "../hooks/useCart.js";

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
};

export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const audioRef = useRef(null); 

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const [hoveredProductId, setHoveredProductId] = useState(null);
  
  const [visibleProducts, setVisibleProducts] = useState(5); 
  
  const lastProductRef = useRef(); 

  const loadMoreProducts = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10); 
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreProducts, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1,
    });

    if (lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }

    return () => {
      if (lastProductRef.current) {
        observer.unobserve(lastProductRef.current);
      }
    };
  }, [loadMoreProducts]);

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <main className="products">
      <ul>
        {products.slice(0, visibleProducts).map((product, index) => {
          const isProductInCart = checkProductInCart(product);

          const isLastProduct = index === visibleProducts - 1;

          return (
            <li
              key={product.id}
              ref={isLastProduct ? lastProductRef : null}
              onMouseEnter={() => setHoveredProductId(product.id)} // Cambia al pasar el mouse
              onMouseLeave={() => setHoveredProductId(null)} // Regresa a la imagen cuando se quita el mouse
            >
              {/* Mostrar la imagen o la descripción según el estado del hover */}
              {hoveredProductId === product.id ? (
                <div className="product-description">
                  <p>{product.description}</p>
                </div>
              ) : (
                <img src={product.thumbnail} alt={product.title} />
              )}

              {/* Información del producto */}
              <div>
                <strong>{product.title}</strong> - {formatCurrency(product.price)}
              </div>

              {/* Mostrar tallas */}
              <div>
                <span>Tallas: {product.talla}</span>
              </div>

              {/* Botón para añadir o quitar del carrito */}
              <div>
                <button
                  className="shadow__btn"
                  style={{ backgroundColor: isProductInCart ? "red" : "rgb(0,153,117)" }}
                  onClick={() => {
                    playSound(); // Reproducir sonido al hacer clic
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {isProductInCart ? <RemoveShoppingCart /> : <ShoppingCart />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <audio ref={audioRef} preload="auto">
        <source src="/audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
}
