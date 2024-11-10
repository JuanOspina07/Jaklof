import { useState, useRef, useEffect, useCallback } from 'react';
import "../styles/Products.css";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { useCart } from "../hooks/useCart.js";
import { useFilters } from '../hooks/useFilters.js';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
};

export function Products() {
  const { addToCart, removeFromCart, cart } = useCart();
  const { filters } = useFilters(); 

  const audioRef = useRef(null); 

  const checkProductInCart = (product) => cart.some((item) => item.id === product.id);

  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(10); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const lastProductRef = useRef();

  const loadMoreProducts = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10); 
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setProducts(data); 
        } else {
          console.error('La respuesta no es un array de productos:', data);
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  const filteredProducts = products
    .filter(product => product.price >= filters.minPrice)
    .filter(product => filters.category === "all" || product.category === filters.category);

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

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <main className="products">
      <ul>
        {filteredProducts.slice(0, visibleProducts).map((product, index) => {
          const isProductInCart = checkProductInCart(product);
          const isLastProduct = index === visibleProducts - 1;

          return (
            <li
              key={product.id}
              ref={isLastProduct ? lastProductRef : null}
              onMouseEnter={() => setHoveredProductId(product.id)} 
              onMouseLeave={() => setHoveredProductId(null)}
            >
              {hoveredProductId === product.id ? (
                <div className="product-description">
                  <p>{product.description}</p>
                </div>
              ) : (
                <img src={product.thumbnail} alt={product.title} />
              )}

              <div>
                <strong>{product.title}</strong> - {formatCurrency(product.price)}
              </div>

              <div>
                <span>Tallas: {product.talla}</span>
              </div>

              <div>
                <button
                  className="shadow__btn"
                  style={{ backgroundColor: isProductInCart ? "red" : "rgb(0,153,117)" }}
                  onClick={() => {
                    playSound();
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
