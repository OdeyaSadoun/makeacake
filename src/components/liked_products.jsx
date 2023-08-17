// LikedProducts.js
import React from 'react';
import { useEffect, useState } from 'react';
import restApi from '../server/models/restapi';



const LikedProducts = async ( ) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [like, setLike] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const likePr = await restApi.getAllLikeUserProducts(user.id);
      setLike(likePr);
    };
    fetchData();
  }, []);


  const handleEdit = async (productId) => {
    const updatedItems = like.map((pr) => {
      if (pr.id === productId) {
        const like = !pr.like;
        restApi.updateProductUserIsLike(user.id,productId, like );
        return { ...pr, like };
      }
      return pr;
    });
    setLike(updatedItems);
  };



  return (

    <div>
      <h2>Like Products</h2>
      {like.map((item) => (
        <div key={item.id}>      
          <p>Quantity: {item.quantity}</p>
          <button onClick={()=> handleEdit(item.id)}>Remove</button> 
        </div>
      ))}
    </div>

  );
};
export default LikedProducts;

