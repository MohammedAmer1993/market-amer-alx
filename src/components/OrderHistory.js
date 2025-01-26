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
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Link } from "react-router-dom";

const OrderHistory = ({
  orders,
  currentUser,
  isLoading,
  error,
  trackingError,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [returnReasonValid, setReturnReasonValid] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const dispatch = useDispatch();

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };
  // Function to format price with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Function to format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      dispatch({ type: "FETCH_ORDER_HISTORY_REQUEST" });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
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
      dispatch({ type: "CLEAR_ORDER_HISTORY_ERROR" });
      dispatch({ type: "CLEAR_TRACKING_ERROR" });
    };
  }, [dispatch, currentUser]); // Run effect when currentUser or dispatch changes

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date); // Convert order date to Date object

    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
    const isDateInRange =
      (!startDateObj || orderDate >= startDateObj) &&
      (!endDateObj || orderDate <= endDateObj);

    if (selectedStatus === "All") {
      return isDateInRange; // Show all orders within date range
    } else {
      return order.status === selectedStatus && isDateInRange;
    }
  });

  const handleTrackOrder = async (orderId) => {
    setTrackingOrder(true);
    dispatch({ type: "TRACK_ORDER_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      const trackingInfo = {
        orderId: 123,
        status: "Shipped",
        estimatedDelivery: "2024-03-15",
        trackingUrl: "https://example-courier.com/tracking/1234567890",
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
      };

      if (orderId === 2) {
        throw new Error("Failed to fetch tracking information");
      }

      dispatch({ type: "TRACK_ORDER_SUCCESS", payload: trackingInfo });
      setTrackingInfo(trackingInfo);
      toggleModal();
    } catch (error) {
      dispatch({ type: "TRACK_ORDER_FAILURE", payload: error.message });
    } finally {
      setTrackingOrder(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    setCancellingOrderId(orderId);
    dispatch({ type: "CANCEL_ORDER_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      dispatch({ type: "CANCEL_ORDER_SUCCESS", payload: orderId });
    } catch (error) {
      dispatch({ type: "CANCEL_ORDER_FAILURE", payload: error.message });
    } finally {
      setCancellingOrderId(null);
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
      dispatch({
        type: "RETURN_ORDER_SUCCESS",
        payload: { orderId, reason: returnReason },
      });
      setReturnReason("");
    } catch (error) {
      dispatch({ type: "RETURN_ORDER_FAILURE", payload: error.message });
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
      <div className="mb-3">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>{selectedStatus}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleStatusChange("All")}>
              All
            </DropdownItem>
            <DropdownItem onClick={() => handleStatusChange("In progress")}>
              In progress
            </DropdownItem>
            <DropdownItem onClick={() => handleStatusChange("Delivered")}>
              Delivered
            </DropdownItem>
            <DropdownItem onClick={() => handleStatusChange("Cancelled")}>
              Cancelled
            </DropdownItem>
            <DropdownItem onClick={() => handleStatusChange("Returned")}>
              Returned
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="mb-3">
          <InputGroup>
            <InputGroupText>From:</InputGroupText>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupText>To:</InputGroupText>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : error ? (
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{formatDate(order.date)}</td> {/* Format the date */}
                  <td>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          <Link to={`/product/${item.id}`}>
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "path/to/placeholder-image.jpg";
                              }}
                            />
                            {item.name}
                          </Link>{" "}
                          x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{formatPrice(order.total)}</td>{" "}
                  {/* Format the total price */}
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
                                onChange={(e) =>
                                  setReturnReason(e.target.value)
                                }
                                valid={returnReasonValid}
                                invalid={!returnReasonValid}
                              />
                              {!returnReasonValid && (
                                <FormFeedback>
                                  Please provide a reason for return
                                </FormFeedback>
                              )}{" "}
                            </>
                          )}
                        </>
                      )}
                    <Button onClick={() => toggleOrderDetails(order.id)}>
                      {expandedOrderId === order.id
                        ? "Hide Details"
                        : "Show Details"}
                    </Button>
                  </td>
                </tr>
                {/* Conditionally render order details */}
                {expandedOrderId === order.id && (
                  <tr>
                    <td colSpan="6">
                      <h4>Order Details</h4>
                      <p>Order ID: {order.id}</p>
                      <h5>Items:</h5>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            <Link to={`/product/${item.id}`}>{item.name}</Link>{" "}
                            x {item.quantity} - ${item.price}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
              <p>Status: {trackingInfo.status}</p>
              <p>
                Estimated Delivery: {formatDate(trackingInfo.estimatedDelivery)}
              </p>{" "}
              {/* Format the date */}
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
  isLoading: state.product.isLoading,
  error: state.product.error,
  trackingError: state.product.trackingError,
});

export default connect(mapStateToProps)(OrderHistory);
