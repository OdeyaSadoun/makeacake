// LikedProducts.js
import React from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD

const LikedProducts = ({ likedProducts }) => {
  return (

=======
const LikedProducts = () => {
  return (
>>>>>>> e3629adee29838fff1e5ecb3fe7d91f261048212
    <div>
      <h2>Liked Products</h2>
      {LikedProducts.map((product) => (
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
