// src/components/OrderHistory.js
import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const OrderHistory = ({ orders }) => {
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

              {/* Add more columns as needed (e.g., status, shipping address) */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date.toDateString()}</td>{" "}
                {/* Assuming date is a Date object */}
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity}
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.product.orders,
});

export default connect(mapStateToProps)(OrderHistory);
