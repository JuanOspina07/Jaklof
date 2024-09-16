import { useState, useRef } from 'react';
import "../styles/Products.css";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { useCart } from "../hooks/useCart.js";

// Función para formatear la moneda a pesos colombianos (COP)
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
};

export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const audioRef = useRef(null); // Crear una referencia para el elemento de audio

  // Función para comprobar si el producto está en el carrito
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  // Función para reproducir sonido
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // Estado para gestionar la imagen o la descripción
  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Verificar si la lista de productos está cargada o vacía
  if (!products || products.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <main className="products">
      <ul>
        {products.map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li
              key={product.id}
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
