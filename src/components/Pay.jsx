import React, { useState } from 'react';
import '../styles/Pay.css';

const Pay = ({ onClose, cart }) => {
  const [address, setAddress] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleCardTypeChange = (e) => setCardType(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.match(/.{1,4}/g)?.join('-') || '';
    return formattedValue.slice(0, 19);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const validateCardDetails = () => {
    const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    return (
      address.trim() !== '' &&
      cardType.trim() !== '' &&
      cardNumberPattern.test(cardNumber) &&
      expiryDatePattern.test(expiryDate) &&
      cvvPattern.test(cvv)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    setTimeout(() => {
      if (validateCardDetails()) {
        setNotification(true);
      } else {
        setNotification(false);
      }
      setLoading(false);
    }, 3000);
  };

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="pay-modal">
      <div className="pay-content">
        <h2>Datos de Pago</h2>

        <div className="cart-summary">
          <h3>Resumen de Compra</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span> - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Dirección
            <input
              type="text"
              placeholder="Ingrese su dirección"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </label>

          <label>
            Tipo de Tarjeta
            <select value={cardType} onChange={handleCardTypeChange} required>
              <option value="">Seleccione una tarjeta</option>
              <option value="bancolombia">Bancolombia</option>
              <option value="davivienda">Davivienda</option>
              <option value="mastercard">Mastercard</option>
            </select>
          </label>

          <label>
            Número de Tarjeta
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19"
              required
            />
          </label>

          <label>
            Fecha de Expiración
            <input
              type="text"
              placeholder="MM/AA"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              maxLength="5"
              required
            />
          </label>

          <label>
            CVV
            <input
              type="text"
              placeholder="XXX"
              value={cvv}
              onChange={handleCvvChange}
              maxLength="3"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Procesando...' : 'Pagar'}
          </button>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </form>

        {notification === true && <p className="success">Pago exitoso!</p>}
        {notification === false && <p className="error">Datos de tarjeta incorrectos o campos incompletos.</p>}
      </div>
    </div>
  );
};

export default Pay;
