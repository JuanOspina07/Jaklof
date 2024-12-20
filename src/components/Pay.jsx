import React, { useState } from 'react';
import '../styles/Pay.css';
import Loader2 from '../components/Loader2';

const Pay = ({ refresh,onClose, cart, clearCart }) => {
  const [address, setAddress] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleCardTypeChange = (e) => setCardType(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    const productIds = cart.map((item) => item.id);

    try {
      // Verificar stock
      const stockResponse = await fetch("http://localhost:4000/check-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds }),
      });

      const stockData = await stockResponse.json();

      if (!stockResponse.ok) {
        throw new Error(stockData.error || "Error al verificar el stock.");
      }

      if (!validateCardDetails()) {
        setNotification("Datos de tarjeta incorrectos o campos incompletos.");
        setLoading(false);
        return;
      }

      // Actualizar stock
      const updateResponse = await fetch("http://localhost:4000/update-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          }))
        ),
      });

      const updateData = await updateResponse.json();

      if (!updateResponse.ok) {
        throw new Error(updateData.error || "Error al actualizar el stock.");
      }

      // Enviar correo
      const emailText = `Gracias por tu compra. Detalles:\n${cart
        .map((item) => `- ${item.title} x${item.quantity}`)
        .join("\n")}`;

      const mailResponse = await fetch("http://localhost:4000/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Confirmación de compra",
          text: emailText,
        }),
      });

      const mailData = await mailResponse.json();

      if (!mailResponse.ok) {
        throw new Error(mailData.error || "Error al enviar el correo.");
      }

      setNotification("Pago y confirmación por correo exitosos!");
      setPaymentSuccess(true);
      setTimeout(() => {
        onClose();
        clearCart();
        setLoading(false);
      }, 5000);
    } catch (error) {
      setNotification(error.message || "Error inesperado.");
      setLoading(false);
    }
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
                <span>{item.title}</span> - ${item.price.toLocaleString('es-CO')} x {item.quantity}
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <strong>Total: ${total.toLocaleString('es-CO')}</strong>
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
            Email
            <input
              type="text"
              placeholder="Ingrese su Correo"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>

          <label>
            Tipo de Tarjeta
            <div className="bank-selection">
              <div className="bank-option">
                <input
                  type="radio"
                  id="bancolombia"
                  name="cardType"
                  value="bancolombia"
                  onChange={handleCardTypeChange}
                />
                <label htmlFor="bancolombia">
                  <img src="/bancolombia2.png" alt="Bancolombia" />
                </label>
              </div>
              <div className="bank-option">
                <input
                  type="radio"
                  id="davivienda"
                  name="cardType"
                  value="davivienda"
                  onChange={handleCardTypeChange}
                />
                <label htmlFor="davivienda">
                  <img src="/BANCODAVIVIENDA.jpg" alt="Davivienda" />
                </label>
              </div>
              <div className="bank-option">
                <input
                  type="radio"
                  id="mastercard"
                  name="cardType"
                  value="mastercard"
                  onChange={handleCardTypeChange}
                />
                <label htmlFor="mastercard">
                  <img src="/mastercard.png" alt="Mastercard" />
                </label>
              </div>
            </div>
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

          <button className="bt6" type="submit">
            Pagar
          </button>
          <button className="bt5" type="button" onClick={onClose}>
            Cerrar
          </button>
        </form>

        {loading && <Loader2 />}
        {notification && <p className={notification === "Pago y confirmación por correo exitosos!" ? "success" : "error"}>{notification}</p>}
      </div>

      {paymentSuccess && <Loader2 fullScreen />}
    </div>
  );
};

export default Pay;
