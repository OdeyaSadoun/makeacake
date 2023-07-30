// ShoppingCart.js
import React from 'react';
import Main from '../components/Main'
import { useContext } from 'react';
import {cart} from './Main'

const ShoppingCart = () => {
  const cart = useContext(cartContext);

  const handleUpdateQuantity = (itemId, newQuantity) => {
<<<<<<< HEAD
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) } : item))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };
=======
    // Implement logic to update the quantity of the item in the cart
  };   
>>>>>>> 4d957511c6a645f9b19f6c5e0499601dcc1d234e

  return (
    <cartContext.Consumer>
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={handleRemoveItem(item.id)}>Remove</button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
          />
        </div>
      ))}
    </div>
    </cartContext.Consumer>
  );
};


export default ShoppingCart;
