import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Alert,
  Input,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

const OrderHistory = ({
  orders,
  currentUser,
  isLoading,
  error,
  trackingError,
}) => {
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [trackingInfo, setTrackingInfo] = useState(null); // State to store tracking info
  const [trackingOrder, setTrackingOrder] = useState(false); // State for tracking order
  const [cancellingOrderId, setCancellingOrderId] = useState(null); // State for cancelling order
  const [returnReason, setReturnReason] = useState(""); // State for return reason
  const [returnReasonValid, setReturnReasonValid] = useState(true); // State for return reason validation

  const dispatch = useDispatch();

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      dispatch({ type: "FETCH_ORDER_HISTORY_REQUEST" });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
        // In a real app, fetch order history from your API based on currentUser
        dispatch({ type: "FETCH_ORDER_HISTORY_SUCCESS", payload: orders });
      } catch (error) {
        dispatch({
          type: "FETCH_ORDER_HISTORY_FAILURE",
          payload: error.message,
        });
      }
    };

    fetchOrderHistory();
    return () => {
      dispatch({ type: "CLEAR_ORDER_HISTORY_ERROR" }); // New action to clear order history errors
      dispatch({ type: "CLEAR_TRACKING_ERROR" }); // New action to clear tracking errors
    };
  }, [dispatch, currentUser]); // Run effect when currentUser or dispatch changes

  const handleTrackOrder = async (orderId) => {
    setTrackingOrder(true); // Set trackingOrder to true
    dispatch({ type: "TRACK_ORDER_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      // In a real app, fetch tracking information from your backend API
      const trackingInfo = {
        // ... tracking details ...
      };

      // Simulate an error if orderId is 2 (for demonstration)
      if (orderId === 2) {
        throw new Error("Failed to fetch tracking information");
      }

      dispatch({ type: "TRACK_ORDER_SUCCESS", payload: trackingInfo });
      setTrackingInfo(trackingInfo);
      toggleModal();
    } catch (error) {
      dispatch({ type: "TRACK_ORDER_FAILURE", payload: error.message });
      // You can display the error message in the modal or use another approach
      alert(error.message);
    } finally {
      setTrackingOrder(false); // Set trackingOrder to false in finally block
    }
  };

  const handleCancelOrder = async (orderId) => {
    setCancellingOrderId(orderId); // Set cancellingOrderId to the order ID
    dispatch({ type: "CANCEL_ORDER_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      // In a real app, send the orderId to your backend API to cancel the order
      dispatch({ type: "CANCEL_ORDER_SUCCESS", payload: orderId });
      // Update the orders array in the Redux store (you might need to fetch the updated order history)
      // ...
    } catch (error) {
      dispatch({ type: "CANCEL_ORDER_FAILURE", payload: error.message });
      // ... (display error message) ...
    } finally {
      setCancellingOrderId(null); // Reset cancellingOrderId in finally block
    }
  };

  const handleReturnOrder = async (orderId) => {
    const isValid = returnReason.trim() !== "";
    setReturnReasonValid(isValid);

    if (!isValid) {
      return; // Don't proceed with return if validation fails
    }

    dispatch({ type: "RETURN_ORDER_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      // In a real app, send the orderId and returnReason to your backend API to return the order
      dispatch({
        type: "RETURN_ORDER_SUCCESS",
        payload: { orderId, reason: returnReason },
      });
      // Update the orders array in the Redux store (you might need to fetch the updated order history)
      // ...
      setReturnReason(""); // Clear the return reason input
    } catch (error) {
      dispatch({ type: "RETURN_ORDER_FAILURE", payload: error.message });
      // ... (display error message) ...
    }
  };
  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner color="primary" />
      </div>
    );
  }
  return (
    <div className="container">
      <h2>Order History</h2>
      {isLoading ? (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : error ? ( // Show error message if there's an error fetching order history
        <Alert color="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th> {/* Add a new column for actions */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date.toDateString()}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <Link to={`/product/${item.id}`}>{item.name}</Link> x{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.total}</td>
                <td>
                  {order.date.getTime() > Date.now() - 86400000
                    ? "In progress"
                    : "Delivered"}
                </td>
                <td>
                  <Button onClick={() => handleTrackOrder(order.id)}>
                    Track Order
                  </Button>
                  {order.status !== "Cancelled" && ( // Only show Cancel button if order is not cancelled
                    <>
                      {isLoading || cancellingOrderId === order.id ? ( // Show spinner while cancelling
                        <Spinner size="sm" color="danger" />
                      ) : (
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </>
                  )}
                  {order.status !== "Cancelled" &&
                    order.status !== "Returned" && ( // Show Return button if order is not cancelled or returned
                      <>
                        {isLoading ? ( // Show spinner while returning
                          <Spinner size="sm" color="warning" />
                        ) : (
                          <>
                            <Button
                              color="warning"
                              size="sm"
                              onClick={() => handleReturnOrder(order.id)}
                            >
                              Return Order
                            </Button>
                            {/* Input for return reason */}
                            <Input
                              type="text"
                              placeholder="Reason for return"
                              value={returnReason}
                              onChange={(e) => setReturnReason(e.target.value)}
                              valid={returnReasonValid} // Add valid prop
                              invalid={!returnReasonValid} // Add invalid prop
                            />
                            {!returnReasonValid && (
                              <FormFeedback>
                                Please provide a reason for return
                              </FormFeedback>
                            )}{" "}
                            {/* Show feedback */}
                          </>
                        )}
                      </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Order Tracking</ModalHeader>
        <ModalBody>
          {isLoading || trackingOrder ? ( // Show spinner while fetching tracking information
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : trackingInfo ? (
            <div>
              <p>Order ID: {trackingInfo.orderId}</p>
              {/* Display other tracking details */}
              <p>Status: {trackingInfo.status}</p>
              <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
              <h4>User Details:</h4>
              <p>Name: {trackingInfo.user.name}</p>{" "}
              <p>Email: {trackingInfo.user.email}</p>{" "}
            </div>
          ) : (
            <p>Loading tracking information...</p>
          )}
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : trackingError ? ( // Show error message if there's an error tracking the order
            <Alert color="danger">{trackingError}</Alert>
          ) : (
            trackingInfo && (
              <a
                href={trackingInfo.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Courier Website
              </a>
            )
          )}
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  orders: state.product.orders,
  currentUser: state.auth.user,
  isLoading: state.product.isLoading, // Get isLoading from Redux store
  error: state.product.error, // Get error from productReducer
  trackingError: state.product.trackingError, // Add trackingError
});

export default connect(mapStateToProps)(OrderHistory);
