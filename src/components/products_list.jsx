import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import restApi from '../server/models/restapi';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [userProductsUpdate, setUserProductsUpdate] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const pr = await restApi.getAllProducts();
      setProducts(pr);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const pr = await restApi.getAllUserProducts(user.id);
      setUserProductsUpdate(pr);
      setUserProducts(pr);
    };
    fetchData();
  }, [user.id]);

  const handleLike = async (productId) => {
    const updatedItems = userProducts.map((pr) => {
      if (pr.id === productId) {
        const like = !pr.like;
        restApi.updateProductUserIsLike(user.id, productId, like);
        return { ...pr, like };
      }
      return pr;
    });
    setUserProductsUpdate(updatedItems);
  };

  const handleAddToCart = async (productid, quantity) => {
    const updatePr = userProductsUpdate.map((pr) => {
      if (pr.id === productid) {
        const q = pr.quantity;
        if (q) {
          restApi.updateProductQuantity(user.id, productid, quantity);
          return { ...pr, quantity: quantity };
        } else {
          restApi.addProductUser(user.id, productid, quantity, false);
          refreshPr();
        }
      }
      return pr;
    });
    setUserProducts(updatePr);
    setUserProductsUpdate(updatePr);
  };

  const refreshPr = async () => {
    const pr = await restApi.getAllUserProducts(user.id);
    setUserProductsUpdate(pr);
    setUserProducts(pr);
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value, 10);
              handleAddToCart(product.id, newQuantity);
            }}
          />
          <button onClick={() => handleLike(product.id)}>Like</button>
        </div>
      ))}
      <Link to="/cart">Go to Cart</Link>
      <Link to="/liked">Go to Liked Products</Link>
    </div>
  );
};

export default ProductsList;
