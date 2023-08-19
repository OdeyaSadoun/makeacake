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
      const pr = await restApi.getAllUserProducts(user.id);
      console.log(pr, 'userProduct');     
      setUserProducts((prev)=> [...prev, pr]);
      console.log(userProducts, 'getAllUserProducts');
    };
    fetchData();
  }, [user.id]);


  useEffect(() => {
    const fetchData = async () => {
      const pr = await restApi.getAllProducts();
      console.log(pr, 'pr');
      setProducts(pr);
    };
    fetchData();
  }, []);



  const handleQuantityChange = (event) => {
    setQuantityToAdd(parseInt(event.target.value, 10));
  };



  const handleLike = async (product) => {
    const updatedItems = userProducts.map((pr) => {
      if (pr.product_id === product.id) {
        const relike = !pr.like;
        restApi.updateProductUserIsLike(user.id, product.id, relike);
        return { ...pr, like: relike};
      }
    });
    setUserProducts((prev)=> [...prev, updatedItems]);
  };

  const handleAddProduct = async (product) => {
      try {
        console.log(userProducts, 'userProductsTry')
        const updatePr = userProducts.map((pr) => {
          if (pr.product_id === product.id) {
            console.log(pr.product_id, 'pr.product_id', product.id, 'product.id' );
            const q = quantityToAdd + pr.quantity;
            console.log(q);
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
            setUserProducts((prev)=> [...prev, updatePr]);;
            refreshPr();
            console.log(userProducts, 'userProductsAfter');
          }
        });
        setQuantityToAdd(1);


      } catch (error) {
        console.log("Error adding pr", error);
      }   
  };








  const refreshPr = async () => {
    const pr = await restApi.getAllUserProducts(user.id);
    setUserProducts((prev)=> [...prev, pr]);
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
