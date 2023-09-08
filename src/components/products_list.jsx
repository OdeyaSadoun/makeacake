import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import restApi from '../server/models/restapi';
import { Buffer } from 'buffer';


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
      const productsData = await restApi.getAllProducts();
      productsData.forEach((product) => {
        console.log(product.media, "before blob")
        const imageBuffer = product.media;
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        const imageSrc = `data:image/jpeg;base64,${base64Image}`;
        product.image = imageSrc;
      }
      );
      setProducts(productsData);

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
          console.log(cartProducts[i].product_id, 'cartProducts[i].product_id', product.id, 'product.id' );
          console.log(cartProducts[i].quantity, 'cartProducts[i].quantity',quantityToAdd, 'quantityToAdd' );
          const q = quantityToAdd + cartProducts[i].quantity;
          console.log(q, 'q');
          if (q!==null) {
            restApi.updateMainProductQuantity(user.id, product.id, q);
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
      <h2>המוצרים</h2>   
      <Link to="/cart">לעגלה שלי</Link>
      <Link to="/liked">מוצרים שאהבתי</Link>
      <table>
        <thead>
          <tr>
            <th>תמונה</th>
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
              <td>
                <img className='product-image' src={product.image} alt={product.product_name} />
              </td>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td>{product.kosher_type}</td>
              <td>{product.is_dairy}</td>
              <td>{product.discount_percentage}</td>
              <td>{product.sensitivity}</td>
              <td>{product.comments}</td>
              <td>
                <label>
            בחירת כמות:
            <input
              type="number"
              value={quantityToAdd}
              onChange={handleQuantityChange}
              min="1"
            />
          </label>
          <button onClick={() => handleAddProduct(product)}>הוספה לעגלה</button>
          <button onClick={() => handleLike(product)}>אהבתי</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
