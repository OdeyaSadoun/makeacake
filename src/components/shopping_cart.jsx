import React, { useEffect, useState } from 'react';
import restApi from '../server/models/restapi';
import { Buffer } from 'buffer';


const ShoppingCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [productprices, setProductPrices] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await restApi.getAllUserProducts(user.id);
        productsData.forEach((product) => {
          console.log(product.media, "before blob")
          const imageBuffer = product.media;
          const base64Image = Buffer.from(imageBuffer).toString('base64');
          const imageSrc = `data:image/jpeg;base64,${base64Image}`;
          product.image = imageSrc;
        }
        );
        setCart(productsData);
        // const pr = await restApi.getAllUserProducts(user.id);
        // setCart(pr);
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
        console.log(item.product_id, 'item.product_id');
        const name = await handleNameProduct(item.product_id);
        console.log(name, 'name', item.product_id, 'item.product_id');      
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
      console.log(productId, 'productId-priceconsole');
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

<h2>העגלה שלי</h2>  
      <table>
        <thead>
          <tr>
            <th>תמונה</th>
            <th>שם</th>
            <th>מחיר</th>
            <th>כמות</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img className='product-image' src={product.image} alt={product.product_name} />
              </td>
              <td>{productNames[product.id]}</td>
              <td>{productprices[product.id]}</td> 
              <td>
              <td>{product.quantity}</td> 
              <input
            type="number"
            id="quantity"
            value={product.quantity}
            onChange={(e) => getProductQuantityValue(product.id, parseInt(e.target.value))}
          />
          </td>
          <td>
          <button onClick={() => handleDelete(product.id)}>מחיקה מעגלה</button>
          </td>
          </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>סך הכל: ${getTotalPrice().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ShoppingCart;
