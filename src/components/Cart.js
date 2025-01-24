// src/components/Cart.js
import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, placeOrder }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now(), // Generate a unique ID for the order
      date: new Date(),
      items: cart.map((item) => ({ ...item, quantity: 1 })), // Assuming quantity is 1 for now
      total: calculateTotal(),
    };

    placeOrder(order);
    navigate("/order-history"); // Redirect to order history after placing order
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Table>{/* ... (table remains the same) */}</Table>
          <p>Total: ${calculateTotal()}</p>
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
