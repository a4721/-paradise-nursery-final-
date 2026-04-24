import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const ProductList = () => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Purificadoras de Aire",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: 15 },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: 12 },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2014/12/10/21/00/lily-563507_1280.jpg", cost: 18 },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/fern-5114414_1280.jpg", cost: 20 },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", cost: 17 },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283100_1280.jpg", cost: 14 }
      ]
    },
    {
      category: "Aromáticas",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", cost: 20 },
        { name: "Mint", image: "https://images.unsplash.com/photo-1501004318641-729e8e26bd05", cost: 10 },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515589177017-76231a13794e", cost: 15 },
        { name: "Basil", image: "https://images.unsplash.com/photo-1618376168163-0579a36de2c7", cost: 9 },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1594761053841-844a292552fc", cost: 12 },
        { name: "Oregano", image: "https://images.unsplash.com/photo-1621506289937-e8e498c0b36b", cost: 11 }
      ]
    }
  ];

  return (
    <div>
      <nav style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#4CAF50', color: 'white'}}>
        <div onClick={() => setShowCart(false)} style={{cursor:'pointer'}}>e-plantShopping</div>
        <div style={{display:'flex', alignItems:'center'}}>
          <a href="#" onClick={() => setShowCart(false)} style={{color: 'white', marginRight: '20px', textDecoration:'none'}}>Tienda</a>
          <div onClick={() => setShowCart(true)} style={{cursor:'pointer', fontSize:'1.5rem'}}>
            🛒 <span className="cart_quantity_count">{totalItems}</span>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div style={{padding: '20px'}}>
          {plantsArray.map(cat => (
            <div key={cat.category}>
              <h2 style={{textAlign:'center', margin:'30px 0'}}>{cat.category}</h2>
              <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'center', gap: '20px'}}>
                {cat.plants.map(plant => (
                  <div key={plant.name} style={{border: '1px solid #ccc', padding: '15px', borderRadius:'10px', width:'250px'}}>
                    <img src={plant.image} alt={plant.name} style={{width:'100%', height:'200px', objectFit:'cover'}} />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button 
                      style={{backgroundColor: cartItems.some(item => item.name === plant.name) ? '#ccc' : '#4CAF50', color:'white', border:'none', padding:'10px', width:'100%', borderRadius:'5px'}}
                      disabled={cartItems.some(item => item.name === plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {cartItems.some(item => item.name === plant.name) ? 'Agregado' : 'Agregar al Carrito'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default ProductList;