import React from 'react';
import { Header } from '../Header';
import { Cart } from '../Cart';
import { Products } from '../Products';
import { Footer } from '../Footer';
import WelcomeConfig from './WelcomeConfig';


const IS_DEVELOPMENT = true; 

const Welcome = ({ filteredProducts }) => {
  return (
    <div className="welcome-container">
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
      <WelcomeConfig onShowSettings={() => console.log('Mostrar Configuraciones')} />
    </div>
  );
};

export default Welcome;
