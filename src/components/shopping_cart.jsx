import React, { useEffect, useState } from 'react';
import restApi from '../server/models/restapi';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';


const ShoppingCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [productprices, setProductPrices] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();


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

  const handleClick= async () =>  {
    setShowMessage(true);
    setCart([]);   
    await restApi.deleteAllUserProduct(user.id);
  };



  const getProductQuantityValue = async (productId, newQ) => {
    try {
      console.log(productId, 'prid');
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
      const updatedProducts = cart.filter((product) => product.id !== itemId);
      setCart(updatedProducts);
      await restApi.deleteUserProduct(itemId);
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
      console.log(product.price, 'productprice');
      console.log(product.discount_percentage, 'price-dis');
      console.log(product.price * ((100-product.discount_percentage) / 100), 'priceafterdis');
      if(Number(product.discount_percentage)!==0){
        console.log('ariive');
        return (product.price * ((100-product.discount_percentage) / 100));
      }
      return product.price
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

  const handleLogout = () => {
    // Remove the user from local storage
    localStorage.removeItem('user');
    navigate('/Login', { replace: true });
  };



  const handleBackHome = () => {
    navigate(`/${user.username}/ProductsList`);
  };
  
  return (
    <div>
<h2>העגלה שלי</h2>
      <div>
        <button className="logoutButton" onClick={handleBackHome}>
        חזרה לחנות
        </button>
        <button className="logoutButton" onClick={handleLogout}>
          יציאה
        </button>
      </div>


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
        <h3>סך הכל: ₪ {getTotalPrice().toFixed(2)}</h3>
      </div>
      <div>
      <button onClick={handleClick}>לתשלום</button>
      {showMessage && (
        <div className="message-window">
          <p>תודה שקניתם אצלינו!</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ShoppingCart;
