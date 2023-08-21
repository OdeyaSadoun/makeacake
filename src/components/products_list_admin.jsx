import React, { useState, useEffect } from 'react';
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
    try {
      await RestAPI.deleteProduct(productId);
      console.log('after delete product from db');
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updatePrice = (product) => {
    const newPrice = window.prompt("מה המחיר החדש שאותו רוצים לעדכן?", product.price);
    if (newPrice && newPrice.trim() !== "") {
      handleUpdatePrice(product.id, newPrice);
    }
  };

  const handleUpdatePrice = async (productId, newPrice) => {
    try {
      await RestAPI.updateProductPrice(productId, newPrice);
      const updatedPrice = products.map((product) => {
        if (product.id === productId) {
          return { ...product, price: newPrice };
        }
        return product;
      });
      setProducts(updatedPrice);
    } catch (error) {
      console.log("Error updating price:", error);
    }
  };

  const handleUpdateName = async (productId, newName) => {
    try {
      await RestAPI.updateProductName(productId, newName);

    } catch (error) {
      console.error('Error updating product name:', error);
    }
  };

  const handleUpdateDiscount = async (productId, newDiscount) => {
    try {
      await RestAPI.updateProductDiscount(productId, newDiscount);

    } catch (error) {
      console.error('Error updating discount:', error);
    }
  };

  const handleUpdateIsDairy = async (productId, newIsDairy) => {
    try {
      await RestAPI.updateProductIsDairy(productId, newIsDairy);

    } catch (error) {
      console.error('Error updating dairy status:', error);
    }
  };


  return (
    <div>
      <h2>Products List</h2>
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>מחיר</th>
            <th>כשרות</th>
            <th>חלבי</th>
            <th>אחוזי הנחה</th>
            <th>רגישויות</th>
            <th>הערות</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td>{product.kosher_type}</td>
              <td>{product.is_dairy}</td>
              <td>{product.discount_percentage}</td>
              <td>{product.sensitivity}</td>
              <td>{product.comments}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>מחיקה</button>
                <button onClick={() => updatePrice(product)}>עדכון מחיר</button>
                <button onClick={() => handleUpdateName(product.id)}>עדכון שם</button>
                <button onClick={() => handleUpdateDiscount(product.id)}>עדכון הנחה</button>
                <button onClick={() => handleUpdateIsDairy(product.id)}>עדכון חלבי</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListAdmin;
