import React, { useEffect, useState } from 'react';
import restApi from '../server/models/restapi';


const LikedProducts = async ( ) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [like, setLike] = useState([]);
  const [productNames, setProductNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const likePr = await restApi.getAllLikeUserProducts(user.id);
        setLike(likePr);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch product names when cart updates
    const fetchProductNames = async () => {
      const names = {};
      for (const item of like) {
        try {
          const name = await handleNameProduct(item.product_id);
          names[item.id] = name;
        } catch (error) {
          console.log("Error getting product name", error);
        }
      }
      setProductNames(names);
    };
    fetchProductNames();
  }, [like]);






  const handleNameProduct = async (productId) => {
    try {
      const product =await restApi.getProductById(productId);
      console.log(product,'handleNameProduct product' );
      console.log(product.product_name,'product.product_name' );
      
      return product.product_name;
    } catch (error) {
      console.log("Error getting product name", error);
      return 0;
    }  
  };


  const handleDelete = async (item) => {
    try {
      const productid=item.product_id
      await restApi.deleteLikeProduct(productid, user.id);
      setLike(prevLike => prevLike.filter((pr) => pr.id !== productid));
    } catch (error) {
      console.log("Error deleting", error);
    }   
  };



  return (
    <div>
      <h2>like products</h2>
      {like.map((item) => (
        <div key={item.id}>
          <p>Product Name: {productNames[item.id]}</p>
          <p>Like: {item.is_like}</p>
          <button onClick={() => handleDelete(item)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
export default LikedProducts;

