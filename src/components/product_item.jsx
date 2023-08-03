import React, { useState } from 'react';
// ProductItem.js
const ProductItem = ({ product, onAddToCart, onLike }) => {
  const { id, name, price } = product;
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState([]);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike(product, !liked);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
      <label htmlFor={`quantity-${id}`}>Quantity:</label>
      <input type="number" value={quantity} onChange={handleQuantityChange} />
    </div>
  );
};

export default ProductItem;
   
