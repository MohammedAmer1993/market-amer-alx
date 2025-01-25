import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Table, Button, Input, Spinner, Alert } from "reactstrap"; // Import Alert
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, placeOrder, isLoading, error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false); // State for placing order
  const [removingItemId, setRemovingItemId] = useState(null); // State for removing item

  const calculateTotal = () => {
    let total = cart.reduce((total, item) => total + item.price, 0);
    // Apply promo code logic here (e.g., if promoCode === 'DISCOUNT10', apply 10% discount)
    if (promoCode === "DISCOUNT10") {
      total *= 0.9; // Apply 10% discount
    }
    return total;
  };

  // Function to format price with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    // Make handlePlaceOrder async
    dispatch({ type: "PLACE_ORDER_REQUEST" }); // Dispatch request action
    setPlacingOrder(true); // Set placingOrder to true

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
    } finally {
      setPlacingOrder(false); // Set placingOrder to false in finally block
    }
  };

  const handleRemoveFromCart = async (productId) => {
    // Make handleRemoveFromCart async
    setRemovingItemId(productId); // Set removingItemId to the product ID

    dispatch({ type: "REMOVE_FROM_CART_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call delay
      // In a real app, send the productId to your backend API to remove from cart
      dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: productId });
      removeFromCart(productId); // This might be redundant if you update the cart in the reducer
    } catch (error) {
      dispatch({ type: "REMOVE_FROM_CART_FAILURE", payload: error.message });
    } finally {
      setRemovingItemId(null); // Reset removingItemId in finally block
    }
  };

  useEffect(() => {
    // Clear the error message when the component unmounts
    return () => {
      dispatch({ type: "CLEAR_CART_ERROR" }); // Dispatch a new action to clear cart errors
    };
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)}</td> {/* Format the price */}
                  <td>1</td> {/* For now, we'll assume quantity is 1 */}
                  <td>
                    {isLoading || placingOrder ? ( // Show spinner while placing order
                      <Spinner color="primary" />
                    ) : (
                      <Button color="primary" onClick={handlePlaceOrder}>
                        Place Order
                      </Button>
                    )}
                    {isLoading || removingItemId === item.id ? ( // Show spinner while removing
                      <Spinner size="sm" color="danger" />
                    ) : (
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Promo Code Input */}
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
          {error && <Alert color="danger">{error}</Alert>}{" "}
          {/* Display error message */}
          {/* Display total with 2 decimal places */}
          <p>Total: ${calculateTotal().toFixed(2)}</p>{" "}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.product.cart,
  isLoading: state.product.isLoading, // Get isLoading from Redux store
  error: state.product.error, // Get error from productReducer
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
  placeOrder: (order) => dispatch({ type: "PLACE_ORDER", payload: order }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
