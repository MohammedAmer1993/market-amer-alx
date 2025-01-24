import React, { useState } from "react"; // Import useState
import { connect } from "react-redux";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"; // Import Modal components
import { Link } from "react-router-dom";

const OrderHistory = ({ orders }) => {
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [trackingInfo, setTrackingInfo] = useState(null); // State to store tracking info

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleTrackOrder = (orderId) => {
    // ... (fetch tracking information from backend or simulate) ...

    // Update trackingInfo state
    setTrackingInfo({
      orderId: orderId,
      status: "Shipped",
      estimatedDelivery: "January 28, 2025",
      trackingUrl: "#", // Replace with actual tracking URL from your backend
    });

    toggleModal(); // Open the modal
  };
  return (
    <div className="container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
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
          {trackingInfo ? (
            <div>
              <p>Order ID: {trackingInfo.orderId}</p>
              {/* Display other tracking details */}
              <p>Status: {trackingInfo.status}</p>
              <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
              {/* ... */}
            </div>
          ) : (
            <p>Loading tracking information...</p>
          )}
        </ModalBody>
        <ModalFooter>
          {trackingInfo && (
            <a
              href={trackingInfo.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Courier Website
            </a>
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
});

export default connect(mapStateToProps)(OrderHistory);
