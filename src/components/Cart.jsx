import '../styles/Cart.css';
import { useId, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useCart } from '../hooks/useCart.js';
import Pay from './Pay';

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
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
  const { cart, clearCart, addToCart } = useCart();
  const [isPayVisible, setPayVisible] = useState(false);

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const handleProceedToPay = () => {
    setPayVisible(true); 
  };

  const handleClosePay = () => {
    setPayVisible(false);
  };

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <ShoppingCartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem key={product.id} addToCart={() => addToCart(product)} {...product} />
          ))}
        </ul>

        <div className="cart-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>

        <button onClick={clearCart}>
          <RemoveShoppingCartIcon />
        </button>

        <button onClick={handleProceedToPay}>
          Proceder al Pago
        </button>
      </aside>

      {isPayVisible && <Pay onClose={handleClosePay} cart={cart} />}
    </>
  );
}
