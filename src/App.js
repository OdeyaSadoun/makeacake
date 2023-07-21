import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./client/pages/LoginPage";
import Register from "./client/pages/RegisterPage";
import Toolbar from "./client/components/Toolbar";
import Home from "./client/pages/Home";
import Shop from "./client/pages/Shop";
import Cart from "./client/pages/Cart";
import LikedProductsPage from "./client/pages/LikedProductsPage";
import AdminPage from "./client/pages/AdminPage";

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
      <h1>Make a Cack</h1>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" Component={Register} />
        <Route path="/:username" Component={Home} />

        {loggedIn ? (
          <>
            <Toolbar onLogout={handleLogout} />
            <Route path="/:username" Component={Home} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/liked-products" element={<LikedProductsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
