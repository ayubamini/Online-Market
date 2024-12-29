import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyAccountNavBar from "../../component/MyAccountNavBar";
import { apiUrl } from "../../server-config";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/orders/customer/${userId}`);
        if (!response.ok) {
          //throw new Error(`Failed to fetch orders: Status ${response.status}`);
          setOrders([]);
          setLoading(true);
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container w-50">
      <MyAccountNavBar active={1} />

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active my-3"
          id="nav-orders"
          role="tabpanel"
          aria-labelledby="nav-orders-tab"
          tabindex="0"
        >
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="card rounded-0">
                <div className="card-body row align-items-center">
                  <div className="col-auto col-md-9">
                    <h5 className="card-title">
                      Order Number: {order.orderNo}
                      <span className="ms-3 badge bg-secondary-subtle text-secondary">
                        {order.Status}
                      </span>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      Date: {order.orderDate}
                    </h6>
                    <p className="card-text">
                      Order Type: {order.orderType}
                      <br />
                      {order.orderType === "Delivery"
                        ? "Address: " + order.DeliveryAddress
                        : "Pickup Date: " + order.PickupDateTime}
                    </p>
                  </div>
                  <div className="col-auto col-md-3">
                    <Link
                      to={`/myaccount/orderhistory/${order.orderNo}`}
                      className="btn btn-custom-primary"
                    >
                      Order Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="row p-5">
                <div className="col-12 text-center">
                    No orders found
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
