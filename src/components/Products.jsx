import "../styles/Products.css";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { useCart } from "../hooks/useCart.js";

export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();

  // Función para comprobar si el producto está en el carrito
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

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
            <li key={product.id}>
              {/* Mostrar la imagen del producto */}
              <img src={product.thumbnail} alt={product.title} />

              {/* Información del producto */}
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>

              {/* Mostrar tallas */}
              <div>
                <span>Tallas: {product.talla}</span>
              </div>

              {/* Botón para añadir o quitar del carrito */}
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
                  onClick={() => {
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
    </main>
  );
}
