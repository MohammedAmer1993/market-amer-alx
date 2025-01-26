import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import SellerProfile from "./components/SellerProfile";
import OrderHistory from "./components/OrderHistory";
import Login from "./components/Login";
import Register from "./components/Register";

const AppRoutes = ({ isAuthenticated }) => (
  <Routes>
    <Route path="/" element={<ProductList />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product/:productId" element={<ProductDetails />} />
    <Route path="/seller/:sellerName" element={<SellerProfile />} />
    {isAuthenticated && (
      <Route path="/order-history" element={<OrderHistory />} />
    )}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/logout" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRoutes;
