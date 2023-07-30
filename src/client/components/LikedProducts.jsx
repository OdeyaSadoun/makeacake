import React, { useEffect, useState } from 'react';

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    // Fetch liked products for the user from the server
    // Update the 'likedProducts' state with the fetched data
  }, []);

  const handleRemoveLikedProduct = (productId) => {
    // Implement logic to remove the product from the liked list
  };

  return (   
    <div>
      {likedProducts.map((product) => (
        <div key={product.id}>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <button onClick={() => handleRemoveLikedProduct(product.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default LikedProducts;
