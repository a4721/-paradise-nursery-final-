import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        const cost = parseFloat(item.cost.replace('$', ''));
        return total + (cost * item.quantity);
    }, 0);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
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
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div className="cart-item" key={item.name} style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
          <img className="cart-item-image" src={item.image} alt={item.name} style={{width: '100px'}} />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="cart-item-quantity">
              <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div className="cart-item-total">Total: ${parseFloat(item.cost.replace('$', '')) * item.quantity}</div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}
      <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
      <button className="get-started-button" onClick={() => alert('Functionality Coming Soon')}>Checkout</button>
    </div>
  );
};

export default CartItem;