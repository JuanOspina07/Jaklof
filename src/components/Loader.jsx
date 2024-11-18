// Loader.js
import React from 'react';
import '../styles/Loader.css'; // Asegúrate de tener el archivo CSS con el estilo para el loader

const Loader = ({ show }) => {
  return (
    show && (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;
