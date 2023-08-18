import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestAPI from '../server/models/restapi';

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsData = await RestAPI.getAllProducts();
      setProducts(productsData);
    }
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    // Call RestAPI function to delete the product
    // After deletion, refresh the product list
  };

  const handleUpdatePrice = async (productId) => {
    // Call RestAPI function to update the price of the product
    // After update, refresh the product list
  };

  const handleUpdateName = async (productId) => {
    // Call RestAPI function to update the name of the product
    // After update, refresh the product list
  };

  const handleUpdateDiscount = async (productId) => {
    // Call RestAPI function to update the discount percentage of the product
    // After update, refresh the product list
  };

  const handleUpdateDairy = async (productId) => {
    // Call RestAPI function to update the dairy status of the product
    // After update, refresh the product list
  };

  const handleUpdateKosher = async (productId) => {
    // Call RestAPI function to update the kosher type of the product
    // After update, refresh the product list
  };

  const handleUpdateSensitivities = async (productId) => {
    // Call RestAPI function to update the sensitivities of the product
    // After update, refresh the product list
  };

  return (
    <div>
      <h2>Products List</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => handleUpdatePrice(product.id)}>Update Price</button>
                <button onClick={() => handleUpdateName(product.id)}>Update Name</button>
                <button onClick={() => handleUpdateDiscount(product.id)}>Update Discount</button>
                <button onClick={() => handleUpdateDairy(product.id)}>Update Dairy</button>
                <button onClick={() => handleUpdateKosher(product.id)}>Update Kosher</button>
                <button onClick={() => handleUpdateSensitivities(product.id)}>Update Sensitivities</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListAdmin;
