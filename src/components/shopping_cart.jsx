import React, { useEffect, useState } from 'react';
import restApi from '../server/models/restapi';

const ShoppingCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pr = await restApi.getAllUserProducts(user.id);
        setCart((prev)=>[...prev, pr]);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const getProductQuantityValue = async (productId, newQ) => {
    try {
      await restApi.updateProductUserQuantity(user.id, productId, newQ);
      setCart(prevCart => {
        const updatePr = prevCart.map((pr) =>
          pr.id === productId ? { ...pr, quantity: newQ } : pr
        );
        return updatePr;
      });
    } catch (error) {
      console.log("Error updating", error);
    }
  };
  
  const handleDelete = async (itemId) => {
    try {
      await restApi.deleteUserProduct(itemId, user.id);
      setCart(prevCart => prevCart.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleDelete(item.id)}>Remove</button>
          <input
            type="number"
            id="quantity"
            value={item.quantity}
            onChange={(e) =>
              getProductQuantityValue(item.id, parseInt(e.target.value))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
