import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div style={{padding: '20px'}}>
      <h2 style={{textAlign:'center'}}>Total Carrito: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div key={item.name} style={{display:'flex', justifyContent:'space-between', borderBottom: '1px solid #eee', padding: '15px'}}>
          <img src={item.image} alt={item.name} style={{width:'100px'}} />
          <div>
            <h3>{item.name}</h3>
            <p>Precio: ${item.cost}</p>
            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Subtotal: ${item.cost * item.quantity}</p>
            <button onClick={() => handleRemove(item)} style={{color:'red'}}>Eliminar</button>
          </div>
        </div>
      ))}
      <div style={{marginTop:'20px', textAlign:'center'}}>
        <button onClick={onContinueShopping} style={{marginRight:'10px'}}>Continuar Comprando</button>
        <button onClick={() => alert('Funcionalidad de pago próxima')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;