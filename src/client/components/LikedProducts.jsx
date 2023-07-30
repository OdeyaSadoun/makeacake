// LikedProducts.js
import React from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
const LikedProducts = ({ likedProducts }) => {
  return (
=======
  return (   
>>>>>>> 4d957511c6a645f9b19f6c5e0499601dcc1d234e
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
