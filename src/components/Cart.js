import React, { useState } from "react";
import { connect } from "react-redux";
import { Table, Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, placeOrder }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const calculateTotal = () => {
    let total = cart.reduce((total, item) => total + item.price, 0);
    // Apply promo code logic here (e.g., if promoCode === 'DISCOUNT10', apply 10% discount)
    if (promoCode === "DISCOUNT10") {
      total *= 0.9; // Apply 10% discount
    }
    return total;
  };

  const handlePlaceOrder = () => {
    // ... (rest of the handlePlaceOrder function remains the same) ...
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Table>{/* ... (table remains the same) ... */}</Table>
          {/* Promo Code Input */}
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
          <p>Total: ${calculateTotal().toFixed(2)}</p>{" "}
          {/* Display total with 2 decimal places */}
          <Button color="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.product.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
  placeOrder: (order) => dispatch({ type: "PLACE_ORDER", payload: order }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
