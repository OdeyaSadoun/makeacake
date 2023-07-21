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
    navigate(`/${user.username}/Shop`);
  };

  const handleCartClick = () => {
    navigate(`/${user.username}/Cart`);
  };

  const handleLikedProductsClick = () => {
    navigate(`/${user.username}/LikedProducts`);
  };

  return (
    <>
      <div>
      <h2>Hello, {user.first_last_name}!</h2>
        <nav className="navbar">
          <button className="NavLinkButton" onClick={handleHomeClick}>
            Home
          </button>
          <br />
          <button className="NavLinkButton" onClick={handleShopClick}>
            Shop
          </button>
          <br />
          <button className="NavLinkButton" onClick={handleCartClick}>
            Cart
          </button>
          <br />
          <button className="NavLinkButton" onClick={handleLikedProductsClick}>
            Liked Products
          </button>
          <br />
          {/* Add more buttons for other navigation links */}
        </nav>

      </div>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </>
  );
};

export default Toolbar;
