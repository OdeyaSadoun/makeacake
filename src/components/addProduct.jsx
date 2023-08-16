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

    const [product, setProduct] = useState({
        product_name: '',
        is_dairy: false,
        price: 0,
        discount_percentage: 0,
        kosher_type: 'bet_yosef',
        comments: '',
        sensitivity: '',
    });


    const handleAddProduct = async () => {
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
                        required
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div>
                    <label>חלבי:</label>
                    <input
                        type="checkbox"
                        name="is_dairy"
                        checked={product.is_dairy}
                        required
                        onChange={(e) => setIsDairy(e.target.value)}
                    />
                </div>
                <div>
                    <label>מחיר:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>אחוזי הנחה:</label>
                    <input
                        type="number"
                        name="discount_percentage"
                        value={product.discount_percentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                </div>
                <div>
                    <label>סוג הכשרות:</label>
                    <select
                        name="kosher_type"
                        value={product.kosher_type}
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
                        value={product.comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <div>
                    <label>רגישויות:</label>
                    <input
                        type="text"
                        name="sensitivity"
                        value={product.sensitivity}
                        onChange={(e) => setSensitivity(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleAddProduct}>הוספה</button>
            </form>
        </div>
    );
};

export default AddProduct;
