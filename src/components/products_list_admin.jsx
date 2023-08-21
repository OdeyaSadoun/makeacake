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
    try {
      await RestAPI.deleteProduct(productId);
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

  const updateDiscount = (product) => {
    const newDiscount = window.prompt("מהו אחוז ההנחה לעדכון?", product.discount_percentage);
    if (newDiscount && newDiscount.trim() !== "") {
      handleUpdateDiscount(product.id, newDiscount);
    }
  };

  const handleUpdateDiscount = async (productId, newDiscount) => {
    try {
      await RestAPI.updateProductDiscount(productId, newDiscount);
      const updatedDiscount = products.map((product) => {
        if (product.id === productId) {
          return { ...product, discount_percentage: newDiscount };
        }
        return product;
      });
      setProducts(updatedDiscount);
    } catch (error) {
      console.log("Error updating discount:", error);
    }
  };

  const updateIsDairy = (product) => {
    const dairy = !product.is_dairy;
    handleUpdateIsDairy(product.id, dairy);

  };

  const handleUpdateIsDairy = async (productId) => {
    try {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          const updatedProduct = { ...product, is_dairy: !product.is_dairy };
          RestAPI.updateIsAdminByUserId(productId, updatedProduct.is_dairy ? 1 : 0);
          return updatedProduct;
        }
        return product;
      });
      setProducts(updatedProducts);
    } catch (error) {
      console.log("Error updating is dairy:", error);
    }
  };
  


  return (
    <div>
      <h2>המוצרים שלנו</h2>
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
                <button onClick={() => updateDiscount(product)}>עדכון אחוז הנחה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListAdmin;
