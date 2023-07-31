import React, { useEffect, useState } from 'react';

const ProductsInOrders = ({ orderId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products for the given order ID from the server
    // Update the 'products' state with the fetched data
  }, [orderId]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>Name: {product.name}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsInOrders;
   