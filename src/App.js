// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import SellerProfile from "./components/SellerProfile";
import OrderHistory from "./components/OrderHistory";
import Login from "./components/Login"; // We'll create this component soon
import { connect } from "react-redux";
import Register from "./components/Register";

function App({ isAuthenticated, logout }) {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/order-history">Order History</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>{" "}
                {/* We'll handle logout later */}
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/seller/:sellerName" element={<SellerProfile />} />
          {isAuthenticated && ( // Protect the OrderHistory route
            <Route path="/order-history" element={<OrderHistory />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Navigate to="/login" replace />} />

          {/* Add a Logout route later */}
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, // We'll add authReducer later
});

const mapDispatchToProps = (dispatch) => ({
  // ...
  logout: () => dispatch({ type: "LOGOUT" }), // Dispatch logout action
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
