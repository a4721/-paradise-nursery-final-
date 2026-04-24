import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Tu rincón verde en casa</p>
          <button className="get-started-button" onClick={() => setShowProductList(true)}>
            Comenzar
          </button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;