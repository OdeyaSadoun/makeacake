import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import restApi from '../server/models/restapi';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      console.log(userProducts, 'start-userProducts');
      console.log(products, 'start-products');
      const allProducts = await restApi.getAllProducts();
      setProducts(allProducts);
      const allUserProducts = await restApi.getAllUserProducts(user.id);
      setUserProducts((prev)=>[prev,allUserProducts ]);
      console.log(userProducts, 'userProducts');
      console.log(products, 'products');
    };
    fetchData();
  }, []);



  const handleQuantityChange = (event) => {
    setQuantityToAdd(parseInt(event.target.value, 10));
  };
  
  const handleLike = async (product) => {
      console.log(userProducts, 'userProducts in like');
      const updatedItems = userProducts.map((pr) => {
      console.log(pr.product_id, 'pr.product_id');
      console.log(product.id, 'product.id');
      if (pr.id === product.id) {
        const updatedItem = { ...pr, is_like: Number(!(pr.is_like ? 1 : 0)) };
        console.log(updatedItem, 'updatedItem', pr, 'pr');
        restApi.updateProductUserIsLike(user.id, product.id, updatedItem.is_like ? 1 : 0);
        return updatedItem;
      }
      return pr;
    });
      console.log(updatedItems, 'updatedItems in like');
      setUserProducts( updatedItems);
      console.log(userProducts, 'userProducts in end like');
  };

  const handleAddProduct = async (product) => {
      try {
        console.log(userProducts, 'userProductsTry')
        const updatePr = userProducts.map((pr) => {
          if (pr.id === product.id) {
            console.log(pr.id, 'pr.id', product.id, 'product.id' );
            console.log(pr.quantity, 'pr.quantity',quantityToAdd, 'quantityToAdd' );
            const q = quantityToAdd + pr.quantity;
            console.log(q, 'q');
            if (q) {
              restApi.updateProductQuantity(user.id, product.id, q);
              console.log(userProducts, 'userProductsAfterUpdate');
            } 
          }
          else {           
            console.log(userProducts, 'userProducts')
            const productToAdd = { ...product, quantity: quantityToAdd };
            console.log(productToAdd, 'productToAdd');
            console.log(user.id, product.id, quantityToAdd, 'ser.id, product.id, quantityToAdd');
            restApi.addProductUser(user.id, product.id, quantityToAdd, false);
            setQuantityToAdd(1);
            console.log(userProducts, 'userProductsAfter');
          }
        });
        console.log(updatePr, 'updatePr' );
        refreshPr();
        setQuantityToAdd(1);
        console.log(userProducts,'ufter-setUserProducts(pr)');
      } catch (error) {
        console.log("Error adding pr", error);
      }   
  };





  const refreshPr = async () => {
    const pr = await restApi.getAllUserProducts(user.id);
    setUserProducts(pr);
    console.log(userProducts,'setUserProducts(pr)');
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <label>
            Add Quantity:
            <input
              type="number"
              value={quantityToAdd}
              onChange={handleQuantityChange}
              min="1"
            />
          </label>
          <button onClick={() => handleAddProduct(product)}>Add to Cart</button>
          <button onClick={() => handleLike(product)}>Like</button>
        </div>
      ))}
      <Link to="/cart">Go to Cart</Link>
      <Link to="/liked">Go to Liked Products</Link>
    </div>
  );
};

export default ProductsList;
