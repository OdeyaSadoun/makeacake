import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import restApi from '../server/models/restapi';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [likeProducts, setLikeProducts] = useState([]);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      console.log(cartProducts, 'start-cartProducts');
      console.log(products, 'start-products');
      console.log(likeProducts, 'start-likeProducts');
      const allProducts = await restApi.getAllProducts();
      setProducts(allProducts);
      const allCartProducts = await restApi.getAllUserProducts(user.id);
      setCartProducts(allCartProducts);
      const allLikeProducts = await restApi.getAllLikeUserProducts(user.id);//
      setLikeProducts(allLikeProducts);
      console.log(cartProducts, 'cartProducts');
      console.log(products, 'products');
      console.log(likeProducts, 'likeProducts');
    };
    fetchData();
  }, []);



  const handleQuantityChange = (event) => {
    setQuantityToAdd(parseInt(event.target.value, 10));
  };

const handleLike = async (product) => {
  try {
    console.log(likeProducts, 'likeProducts');
    for(let i=0; i<likeProducts.length; i++){
      console.log('start');
      if (likeProducts[i].product_id === product.id) {
        console.log(likeProducts[i].product_id, 'likeProducts[i].product_id', product.id, 'product.id' );
        restApi.deleteLikeProduct(product.id, user.id);
        return;
      }
      console.log('end');
    }
    console.log(user.id, product.id, 1, 'user.id, product.id, 1 -productToAdd');
    restApi.addLikeProductUser(user.id, product.id, 1);
    refresh();
  } catch (error) {
    console.log("Error adding pr", error);
  }   
};


  const handleAddProduct = async (product) => {
    try {
      console.log(cartProducts, 'cartProductsTry');
      for(let i=0; i<cartProducts.length; i++){
        console.log('start');
        if (cartProducts[i].product_id === product.id) {
          console.log(cartProducts[i].id, 'cartProducts[i].id', product.id, 'product.id' );
          console.log(cartProducts[i].quantity, 'cartProducts[i].quantity',quantityToAdd, 'quantityToAdd' );
          const q = quantityToAdd + cartProducts[i].quantity;
          console.log(q, 'q');
          if (q!==null) {
            restApi.updateProductQuantity(user.id, product.id, q);
            console.log(cartProducts, 'cartProductsAfterUpdate');
            return;
          } 
        }
        console.log(cartProducts[i].product_id, 'cartProducts[i].product_id', product.id, 'product.id', 'end' );
        console.log('end');
      }
     
      const productToAdd = { ...product, quantity: quantityToAdd };
      console.log(productToAdd, 'productToAdd');
      console.log(user.id, product.id, quantityToAdd, 'user.id, product.id, quantityToAdd');
      restApi.addProductUser(user.id, product.id, quantityToAdd);
      setQuantityToAdd(1); 
      refreshPr();
      console.log(cartProducts,'ufter-setUserProducts(pr)');
    } catch (error) {
      console.log("Error adding pr", error);
    }   
};

const refresh = async () => {
  const pr = await restApi.getAllLikeUserProducts(user.id);
  setCartProducts(pr);
  console.log(cartProducts,'setCartProducts(pr)');
};

  const refreshPr = async () => {
    const pr = await restApi.getAllUserProducts(user.id);
    setLikeProducts(pr);
    console.log(cartProducts,'setCartProducts(pr)');
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.product_name}</p>
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
