import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Toolbar from './components/toolbar';
import UserManagement from './components/user_management'
import LikedProducts from './components/liked_products'
import Shopping_cart from './components/shopping_cart';
import Products_list from './components/products_list';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <cartContext.Provider value={{cart, setCart }}>
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/:username" element={<Toolbar/>} />
      <Route path="/:username/shop" element={<Shopping_cart setCart={setCart}/>} />
      <Route path="/:username/cart" element={<Products_list setCart={setCart}/>} />
      <Route path="/:username/liked-products" element={<LikedProducts />} />
      <Route path="/admin/:username" element={<UserManagement />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </cartContext.Provider>    

  );
};

export default App;
