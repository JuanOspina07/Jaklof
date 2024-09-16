import React from 'react';

const WelcomeConfig = ({ onShowAppContent }) => {
  return (
    <div className="welcome-config-container">
      <h1>Holi</h1>
      <p>que chimba los culos y la plata .</p>
      <button onClick={onShowAppContent}>mamame el bicho </button>
    </div>
  );
};

export default WelcomeConfig;
