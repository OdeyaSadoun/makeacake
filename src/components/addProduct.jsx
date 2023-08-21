import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/addProduct.css';
import RestAPI from '../server/models/restapi';


const AddProduct = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [product_name, setProductName] = useState('');
    const [is_dairy, setIsDairy] = useState('');
    const [price, setPrice] = useState('');
    const [discount_percentage, setDiscountPercentage] = useState('');
    const [kosher_type, setKosherType] = useState('');
    const [comments, setComments] = useState('');
    const [sensitivity, setSensitivity] = useState('');

    const navigate = useNavigate();

    const handleAddProduct = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const newProduct = await RestAPI.addProduct(
            product_name,
            is_dairy,
            price,
            discount_percentage,
            kosher_type,
            comments,
            sensitivity
        );
        if (newProduct && newProduct.status === 201) {
            // Registration successful, navigate to the login page
            alert('הוספת מוצר בהצלחה!');
            navigate(`/products/admin/${user.username}`);

            return;
        } else {
            // Registration failed, set the registration error message
            console.log('faild to create product');
        }
    };
    const handleBackToAdminHome = () => {
        navigate(`/admin/${user.username}`);
      }; 

    return (
        <div>
            <h2>הוספת מוצר חדש</h2>
            <button className="logoutButton" onClick={handleBackToAdminHome}>
          חזרה לעמוד הראשי
        </button>
            <form>
                <div>
                    <label>שם:</label>
                    <input
                        type="text"
                        name="product_name"
                        value={product_name}
                        required
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div>
                    <label>חלבי:</label>
                    <input
                        type="checkbox"
                        name="is_dairy"
                        checked={is_dairy}
                        required
                        onChange={(e) => setIsDairy(e.target.checked)}
                        />
                </div>
                <div>
                    <label>מחיר:</label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>אחוזי הנחה:</label>
                    <input
                        type="number"
                        name="discount_percentage"
                        value={discount_percentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                </div>
                <div>
                    <label>סוג הכשרות:</label>
                    <select
                        name="kosher_type"
                        value={kosher_type}
                        required
                        onChange={(e) => setKosherType(e.target.value)}
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
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <div>
                    <label>רגישויות:</label>
                    <input
                        type="text"
                        name="sensitivity"
                        value={sensitivity}
                        onChange={(e) => setSensitivity(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleAddProduct}>הוספה</button>
            </form>
        </div>
    );
};

export default AddProduct;
