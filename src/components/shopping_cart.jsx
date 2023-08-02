// ShoppingCart.js
import React from 'react';
import { useState, useContext } from 'react';
import {cartContext} from '../App';

const ShoppingCart = ( ) => {
  const {cart,setCart}  = useContext(cartContext);
  const [quantity, setQuantity] = useState(1);

<<<<<<< HEAD
  const handleUpdateQuantity = (itemId, newQuantity) => {

    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) } : item))
    );
=======
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value)); // Update the quantity state when the input value changes
>>>>>>> e3629adee29838fff1e5ecb3fe7d91f261048212
  };

  const handleRemoveItem = (itemId) => {
    const arr= cart.filter((item) => item.id !== itemId);
    setCart(arr);
  };

  return (

    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={()=> handleRemoveItem(item.id)}>Remove</button> 
          <input
          type="number"
          id="quantity"
          value={quantity} // Set the input value to the quantity state
          onChange={handleQuantityChange} // Handle changes to the input value
        />
        </div>
      ))}
    </div>

  );
};
export default ShoppingCart;
