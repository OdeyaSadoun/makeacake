import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../css/Toolbar.css';

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
    navigate(`/${user.username}/Shop`);
  };

  const handleCartClick = () => {
    navigate(`/${user.username}/Cart`);
  };

  const handleLikedProductsClick = () => {
    navigate(`/${user.username}/LikedProducts`);
  };

  return (
    <div className="container">
      <h2>{user.first_last_name} שלום</h2>
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
        {/* Add more buttons for other navigation links */}
      </nav>

      <button onClick={handleLogout}>יציאה</button>

    </div>
  );
};

export default Toolbar;
