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
  const dispatch = useDispatch();

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleTrackOrder = async (orderId) => {
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
    }
  };
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
  }, [dispatch, currentUser]); // Run effect when currentUser or dispatch changes

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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Order Tracking</ModalHeader>
        <ModalBody>
          {isLoading ? ( // Show spinner while fetching tracking information
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
