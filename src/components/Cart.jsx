import '../styles/Cart.css';
import { useId, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useCart } from '../hooks/useCart.js';
import Pay from './Pay';

function CartItem({ thumbnail, price, title, quantity, addToCart, removeFromCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>Cantidad: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart, removeFromCart } = useCart();
  const [isPayVisible, setPayVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isLoading, setLoading] = useState(false); // Para mostrar el loader durante el proceso de pago

  const formatPrice = (price) => {
    return price.toLocaleString('es-CO'); // Formato de precio en pesos colombianos
  };

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Función que maneja la acción de proceder al pago
  const handleProceedToPay = () => {
    setLoading(true); // Muestra el loader cuando se procede al pago
    setTimeout(() => {
      setPayVisible(true); // Muestra el formulario de pago después de un pequeño delay
      setLoading(false); // Deja de cargar después del delay
    }, 5000); // El delay es para simular el tiempo de procesamiento
  };

  // Función para cerrar el formulario de pago
  const handleClosePay = () => {
    setPayVisible(false);
  };

  // Función para alternar la visibilidad del carrito
  const toggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  return (
    <>
      <label className='cart-button neon' htmlFor={cartCheckboxId} onClick={toggleCartVisibility}>
        <ShoppingCartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className={`cart ${isCartVisible ? 'show' : ''}`}>
        <ul>
          {cart.map(product => (
            <CartItem 
              key={product.id} 
              addToCart={() => addToCart(product)} 
              removeFromCart={() => removeFromCart(product)} 
              {...product} 
            />
          ))}
        </ul>

        <div className="cart-total">
          <strong>Total: ${formatPrice(total)}</strong>
        </div>

        <button onClick={clearCart}>
          <RemoveShoppingCartIcon />
        </button>

        {cart.length > 0 && (
          <button onClick={handleProceedToPay}>
            Proceder al Pago
          </button>
        )}
      </aside>

      {isPayVisible && <Pay onClose={handleClosePay} cart={cart} clearCart={clearCart} />}


      {/* Fullscreen loader */}
      {isLoading && (
        <div className="loader-wrapper">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        </div>
      )}
    </>
  );
}
