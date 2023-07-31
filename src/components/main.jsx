// App.js
import React, { createContext,useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductsList from './ProductsList';
import ShoppingCart from './ShoppingCart';
import LikedProducts from './LikedProducts';

const cartContext = React.createContext();


function Main () {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    // ... more products
  ];

  const handleAddToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity }]);
  };

  const handleLike = (product, isLiked) => {
    if (isLiked) {
      setLikedProducts([...likedProducts, product]);
    } else {
      setLikedProducts(likedProducts.filter((likedProduct) => likedProduct.id !== product.id));
    }


};



  return (
    <div>
    <div>
    <h2>Product List</h2>
    {products.map((product) => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <button onClick={() => handleAddToCart(product, 1)}>Add to Cart</button>
        <button onClick={() => handleLike(product, true)}>Like</button>
      </div>
    ))}
    <Link to="/cart">Go to Cart</Link>
    <Link to="/liked">Go to Liked Products</Link>
  </div>
    <cartContext.Provider value={{cart, setCart }}>
      <ShoppingCart>
      </ShoppingCart>  
    </cartContext.Provider>  
    </div>
  );
};

export default Main;
