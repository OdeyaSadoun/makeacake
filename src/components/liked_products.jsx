// LikedProducts.js
import React from 'react';
import { Link } from 'react-router-dom';


const LikedProducts = ({ likedProducts }) => {
  return (

    <div>
      <h2>Liked Products</h2>
      {likedProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
      <Link to="/">Go Back to Products</Link>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};

export default LikedProducts;
