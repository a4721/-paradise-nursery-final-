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
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            <nav style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#4CAF50', color: 'white'}}>
                <div onClick={() => setShowCart(false)} style={{cursor:'pointer'}}><h3>e-plantShopping</h3></div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <a href="#" onClick={() => setShowCart(false)} style={{color: 'white', marginRight: '20px', textDecoration:'none'}}>Plants</a>
                    <div onClick={() => setShowCart(true)} style={{cursor:'pointer'}}>
                        <span className="cart_quantity_count">{totalItems}</span>🛒
                    </div>
                </div>
            </nav>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category) => (
                        <div key={category.category}>
                            <h1>{category.category}</h1>
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                                {category.plants.map((plant) => (
                                    <div className="product-card" key={plant.name} style={{border: '1px solid #ccc', padding: '10px'}}>
                                        <img src={plant.image} alt={plant.name} style={{width: '150px'}} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-price">{plant.cost}</div>
                                        <button 
                                            className="product-button"
                                            disabled={cartItems.some(item => item.name === plant.name)}
                                            onClick={() => handleAddToCart(plant)}>
                                            {cartItems.some(item => item.name === plant.name) ? 'Added' : 'Add to Cart'}
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