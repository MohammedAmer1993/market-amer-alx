import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Table, Button, Input, Spinner, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, placeOrder, isLoading, error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);

  const calculateTotal = () => {
    let total = cart.reduce((total, item) => total + item.price, 0);
    if (promoCode === "DISCOUNT10") {
      total *= 0.9;
    }
    return total;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });
    setPlacingOrder(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const order = {};
      dispatch({ type: "PLACE_ORDER_SUCCESS", payload: order });
      navigate("/order-history");
    } catch (error) {
      dispatch({ type: "PLACE_ORDER_FAILURE", payload: error.message });
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setRemovingItemId(productId);
    dispatch({ type: "REMOVE_FROM_CART_REQUEST" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: productId });
      removeFromCart(productId);
    } catch (error) {
      dispatch({ type: "REMOVE_FROM_CART_FAILURE", payload: error.message });
    } finally {
      setRemovingItemId(null);
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_CART_ERROR" });
    };
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <div>
          <Table bordered hover responsive className="mb-4">
            <thead className="table-light">
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
                  <td>{formatPrice(item.price)}</td>
                  <td>1</td>
                  <td>
                    {isLoading || placingOrder ? (
                      <Spinner color="primary" size="sm" />
                    ) : (
                      <Button
                        color="success"
                        size="sm"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    )}
                    {isLoading || removingItemId === item.id ? (
                      <Spinner size="sm" color="danger" className="ms-2" />
                    ) : (
                      <Button
                        color="danger"
                        size="sm"
                        className="ms-2"
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

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-50 me-2"
            />
            <p className="fw-bold mb-0">
              Total: {formatPrice(calculateTotal())}
            </p>
          </div>

          {error && <Alert color="danger">{error}</Alert>}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.product.cart,
  isLoading: state.product.isLoading,
  error: state.product.error,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
  placeOrder: (order) => dispatch({ type: "PLACE_ORDER", payload: order }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
