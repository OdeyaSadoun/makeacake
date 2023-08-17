// ShoppingCart.js
import React from 'react';
import { useEffect, useState } from 'react';
import restApi from '../server/models/restapi';


const ShoppingCart = async ( ) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pr = await restApi.getAllUserProducts(user.id);
      setCart(pr);
    };
    fetchData();
  }, []);


  const getProductQuantityValue = async (productId, e) => {
    try {
      const newQ = parseInt(e.target.value);
      await restApi.updateProductUserQuantity(user.id, productId, newQ );
      const updatePr = cart.map((pr) => {
        if (pr.id === productId) {
          return { ...pr, quantity: newQ };
        }
        return pr;
      });
      setCart(updatePr);
    } catch (error) {
      console.log("Error updating", error);
    }
  };

  const handleDelete = async (itemId) => {
    await restApi.deleteUserProduct(itemId, user.id);
    const updatePr = cart.filter((item) => item.id !== itemId);
    setCart(updatePr);
  };

  return (

    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>      
          <p>Quantity: {item.quantity}</p>
          <button onClick={()=> handleDelete(item.id)}>Remove</button> 
          <input
          type="number"
          id="quantity"
          value={item.quantity} // Set the input value to the quantity state
          onChange={(e)=> getProductQuantityValue(e)} // Handle changes to the input value
        />
        </div>
      ))}
    </div>

  );
};
export default ShoppingCart;
