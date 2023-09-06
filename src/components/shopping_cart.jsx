import React, { useEffect, useState } from 'react';
import restApi from '../server/models/restapi';

const ShoppingCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [productprices, setProductPrices] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const pr = await restApi.getAllUserProducts(user.id);
        setCart(pr);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
    // Fetch product names when cart updates
    const fetchProductNames = async () => {
      const names = {};
      const prices = {};
      console.log(cart, 'cartconsole');
      for (const item of cart) {
        const name = await handleNameProduct(item.product_id);
        names[item.id] = name;
        const price = await handlePriceProduct(item.product_id);
        prices[item.id] = price;
      }
      setProductNames(names);
      setProductPrices(prices);
    };
    fetchProductNames();
  }, [cart]);


  const getProductQuantityValue = async (productId, newQ) => {
    try {
      await restApi.updateProductQuantity(user.id, productId, newQ);
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
      await restApi.deleteUserProduct(itemId);
      setCart(prevCart => prevCart.filter((item) => item.id !== itemId));
      // const updatedProducts = products.filter((product) => product.id !== productId);
      // setProducts(updatedProducts);
    } catch (error) {
      console.log("Error deleting", error);
    }   
  };

  const handleNameProduct = async (productId) => {
    try {
      const product =await restApi.getProductById(productId);
      console.log(product,'handleNameProduct product' );
      console.log(product.product_name,'product.product_name' );
      return product.product_name;
    } catch (error) {
      console.log("Error getting product name", error);
      return 0;
    }  
  };

  const handlePriceProduct = async (productId) => {
    try {
      console.log(productprices, 'productpriceconsole');
      const product =await restApi.getProductById(productId);
      console.log(product,'handleNameProduct product' );
      console.log(product.product_name,'product.product_name' );
      return product.price;
    } catch (error) {
      console.log("Error getting product price", error);
      return 0;
    }  
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    console.log(cart, 'cart-97');
    for (const product of cart) {
      console.log(product, 'product-98');
      console.log(product.quantity, 'product.quantity');
      console.log(productprices[product.id], 'productprices[product.id]');
      totalPrice += Number(productprices[product.id] * product.quantity);
    }
    return totalPrice;
  };



  
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>Product Name: {productNames[item.id]}</p>
          <p>Product Price: {productprices[item.id]}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleDelete(item.id)}>Remove</button>
          <input
            type="number"
            id="quantity"
            value={item.quantity}
            onChange={(e) => getProductQuantityValue(item.id, parseInt(e.target.value))}
          />
        </div>
      ))}
      <div>
        <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ShoppingCart;
