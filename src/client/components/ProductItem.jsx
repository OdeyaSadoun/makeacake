import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      {/* Additional product details and interactions */}
    </div>
  );
};

export default ProductItem;
   