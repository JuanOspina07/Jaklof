import "../styles/Products.css";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { useCart } from "../hooks/useCart.js";

export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <span> Tallas: {product.talla}</span>
              </div>
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
