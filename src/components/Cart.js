import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Table, Button, Input, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, placeOrder, isLoading }) => {
  const dispatch = useDispatch();
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

  const handlePlaceOrder = async () => {
    // Make handlePlaceOrder async
    dispatch({ type: "PLACE_ORDER_REQUEST" }); // Dispatch request action
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      // In a real app, send order details to your backend API
      const order = {
        // ... order details ...
      };
      dispatch({ type: "PLACE_ORDER_SUCCESS", payload: order });
      navigate("/order-history");
    } catch (error) {
      dispatch({ type: "PLACE_ORDER_FAILURE", payload: error.message });
    }
  };

  const handleRemoveFromCart = async (productId) => {
    // Make handleRemoveFromCart async
    dispatch({ type: "REMOVE_FROM_CART_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call delay
      // In a real app, send the productId to your backend API to remove from cart
      dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: productId });
      removeFromCart(productId); // This might be redundant if you update the cart in the reducer
    } catch (error) {
      dispatch({ type: "REMOVE_FROM_CART_FAILURE", payload: error.message });
    }
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
          {isLoading ? ( // Show spinner while placing order
            <Spinner color="primary" />
          ) : (
            <>
              <Button color="primary" onClick={handlePlaceOrder}>
                Place Order
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.product.cart,
  isLoading: state.product.isLoading, // Get isLoading from Redux store
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
  placeOrder: (order) => dispatch({ type: "PLACE_ORDER", payload: order }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
