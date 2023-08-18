import React, { createContext, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import UserManagement from './components/user_management'
import LikedProducts from './components/liked_products'
import Shopping_cart from './components/shopping_cart';
import Products_list from './components/products_list';
import Toolbar from './components/toolbar';
import AdminPage from "./components/admin_page";
import AddProduct from './components/addProduct';
import ProductListAdmin from './components/products_list_admin'




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

    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/:username" element={<Toolbar/>} />
      <Route path="/:username/ShoppingCart" element={<Shopping_cart />} />
      <Route path="/:username/ProductsList" element={<Products_list />} />
      <Route path="/:username/liked-products" element={<LikedProducts />} />
      <Route path="/admin/:username" element={<AdminPage />} />
      <Route path="/products/admin/:username" element={<Products_list />} />
      <Route path="/" element={<Login />} />
      <Route path="/admin/:username/add-product" element={<AddProduct/>} />
      <Route path="/admin/:username/products-list" element={<ProductListAdmin/>} />
    </Routes>


  );
};

export default App;
