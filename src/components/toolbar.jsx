import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


const Toolbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the user from local storage
    localStorage.removeItem('user');
    // Perform any other logout actions, such as clearing other data or redirecting

    // Redirect to the login page without rendering the Toolbar component
    navigate('/Login', { replace: true });
  };

  const handleHomeClick = () => {
    navigate(`/${user.username}`);
  };
  
  const handleShopClick = () => {
    navigate(`/${user.username}/ProductsList`);
  };

  const handleCartClick = () => {
    navigate(`/${user.username}/ShoppingCart`);
  };

  const handleLikedProductsClick = () => {
    navigate(`/${user.username}/LikedProducts`);
  };

  const handlePrivatPageClick = () => {
    navigate(`/${user.username}/PrivatPage`);
  };
  

  return (
    <div className="tollbarcontainer" dir="rtl">
      <h2>{user.first_last_name}</h2>
      <nav className="navbar">
        <button className="NavLinkButton" onClick={handleHomeClick}>
          ראשי
        </button>
        <button className="NavLinkButton" onClick={handleShopClick}>
          חנות
        </button>
        <button className="NavLinkButton" onClick={handleCartClick}>
          עגלה
        </button>
        <button className="NavLinkButton" onClick={handleLikedProductsClick}>
          אהבתי
        </button>
        <button className="NavLinkButton" onClick={handlePrivatPageClick}>
          אזור אישי
        </button>
      </nav>
      <button className="logoutButton" onClick={handleLogout}>
        יציאה
      </button>
    </div>
  );
};

export default Toolbar;
