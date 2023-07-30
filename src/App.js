import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./client/pages/loginPage";
import Register from "./client/pages/registerPage";
import Toolbar from "./client/components/toolbar";
import Home from "./client/pages/home";
import Shop from "./client/pages/shop";
import Cart from "./client/pages/cart";
import LikedProductsPage from "./client/pages/likedProductsPage";
import AdminPage from "./client/pages/adminPage";

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
    <div>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" Component={Register} />
        <Route path="/:username" Component={Home} />
        

        <Route path="/:username/shop" element={<Shop />} />
        <Route path="/:username/cart" element={<Cart />} />
        <Route path="/:username/liked-products" element={<LikedProductsPage />} />
        <Route path="/admin/:username" element={<AdminPage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
