import React, { useState } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: '',
    is_dairy: false,
    price: 0,
    discount_percentage: 0,
    kosher_type: 'bet_yosef',
    comments: '',
    sensitivity: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: inputValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the product data to your server API using fetch or axios
    console.log('Submitting product:', product);
  };

  return (
    <div>
      <h2>הוספת מוצר חדש</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם:</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>חלבי:</label>
          <input
            type="checkbox"
            name="is_dairy"
            checked={product.is_dairy}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>מחיר:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>אחוזי הנחה:</label>
          <input
            type="number"
            name="discount_percentage"
            value={product.discount_percentage}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>סוג הכשרות:</label>
          <select
            name="kosher_type"
            value={product.kosher_type}
            onChange={handleInputChange}
          >
            <option value="bet_yosef">בית יוסף</option>
            <option value="haeda_hacharedit">בד"ץ העדה החרדית</option>
            <option value="chatam_sofer_bnei_brak">חתם סופר בני ברק</option>
          </select>
        </div>
        <div>
          <label>הערות:</label>
          <input
            type="text"
            name="comments"
            value={product.comments}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>רגישויות:</label>
          <input
            type="text"
            name="sensitivity"
            value={product.sensitivity}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">הוספה</button>
      </form>
    </div>
  );
};

export default AddProduct;
