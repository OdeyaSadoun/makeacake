// AdminPage.js
import React from 'react';
import UserManagement from './user_management';
import AddProduct from './addProduct';
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate(`/admin/${user.username}/add-product`);
  };

  const handleViewProducts = () => {
    navigate(`/admin/${user.username}/products-list`);

  };

  const handleLogout = () => {
    // Remove the user from local storage
    localStorage.removeItem('user');
    navigate('/Login', { replace: true });
  };

  return (
    <div>
      <div className="header">
        <p>שלום {user.first_last_name}</p>

      <button className="addProductButton" onClick={handleViewProducts}>
        רשימת המוצרים
      </button>
      <button className="addProductButton" onClick={handleAddProduct}>
        הוסף מוצר
      </button>
      <button className="logoutButton" onClick={handleLogout}>
          יציאה
        </button>

      </div>
      <UserManagement />
    </div>
  );
};

export default AdminPage;
