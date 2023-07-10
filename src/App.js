import React, { useState } from 'react';
import {Route, Routes, useNavigate } from 'react-router-dom';
import Login from './client/components/Login';
import Register from './client/components/Register';
import Toolbar from './client/components/Toolbar';
import Home from './client/pages/Home';
import Shop from './client/pages/Shop';
import Cart from './client/pages/Cart';
import LikedProductsPage from './client/pages/LikedProductsPage';
import AdminPage from './client/pages/AdminPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    
      <div>
        <h1>MAKEACAKE</h1>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          {loggedIn ? (
            <>
              <Toolbar onLogout={handleLogout} />
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/liked-products" element={<LikedProductsPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </>
          ) : (
            <Route path="/" element={<Login/>} />
          )}
        </Routes>
      </div>
    
  );
};

export default App;
