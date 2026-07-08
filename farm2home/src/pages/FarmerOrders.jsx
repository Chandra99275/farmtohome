import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState(false);

  useEffect(() => {
    fetchOrders();

    socket.on("connect", () => {
      console.log("✅ Socket Connected :", socket.id);
    });

    socket.on("newOrder", () => {
      console.log("🔥 New Order Received");

      setNewOrder(true);

      fetchOrders();

      setTimeout(() => {
        setNewOrder(false);
      }, 5000);
    });

    socket.on("orderUpdated", () => {
      console.log("📦 Order Updated");
      fetchOrders();
    });

    return () => {
      socket.off("connect");
      socket.off("newOrder");
      socket.off("orderUpdated");
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/api/orders/farmer/${user.id}`
      );

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/status/${orderId}`,
        {
          status,
        }
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const activeOrders = orders.filter(
    (item) => item.order_status !== "delivered"
  );

  const totalCustomers = new Set(
    activeOrders.map((item) => item.customer_id)
  ).size;

  const totalRevenue = activeOrders.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  return (
    <>
      <style>{`

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Poppins,sans-serif;
}

body{
background:#eef2f7;
}

.container{
padding:30px;
max-width:1400px;
margin:auto;
}

.title{
font-size:34px;
font-weight:700;
margin-bottom:25px;
color:#166534;
}

.notification{
background:#16a34a;
color:white;
padding:18px;
border-radius:12px;
margin-bottom:25px;
font-size:18px;
font-weight:600;
text-align:center;
animation:blink 1s infinite;
}

@keyframes blink{

0%{
opacity:1;
}

50%{
opacity:.4;
}

100%{
opacity:1;
}

}

.stats{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(250px,1fr));

gap:20px;

margin-bottom:35px;

}

.card{

background:white;

padding:25px;

border-radius:18px;

box-shadow:0 8px 20px rgba(0,0,0,.08);

transition:.3s;

}

.card:hover{

transform:translateY(-5px);

}

.card h4{

color:#555;

margin-bottom:10px;

}

.card h2{

font-size:30px;

color:#16a34a;

}

.refresh-btn{

background:#2563eb;

color:white;

border:none;

padding:12px 25px;

border-radius:10px;

cursor:pointer;

font-size:16px;

margin-bottom:30px;

}

.refresh-btn:hover{

background:#1d4ed8;

}

.orders-grid{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(350px,1fr));

gap:25px;

}

.order-card{

background:white;

border-radius:18px;

padding:25px;

box-shadow:0 8px 20px rgba(0,0,0,.08);

transition:.3s;

}

.order-card:hover{

transform:translateY(-5px);

}

.order-card h3{

margin-bottom:15px;

color:#14532d;

}

.order-card p{

margin:8px 0;

font-size:16px;

}

.status{

display:inline-block;

margin-top:15px;

padding:8px 18px;

border-radius:30px;

font-weight:bold;

text-transform:capitalize;

}

.status.pending{

background:#fef3c7;

color:#92400e;

}

.status.accepted{

background:#dcfce7;

color:#166534;

}

.status.delivered{

background:#dbeafe;

color:#1d4ed8;

}

.accept-btn{

width:100%;

margin-top:20px;

padding:14px;

background:#16a34a;

color:white;

border:none;

border-radius:10px;

cursor:pointer;

font-size:17px;

font-weight:600;

transition:.3s;

}

.accept-btn:hover{

background:#15803d;

}

.deliver-btn{

width:100%;

margin-top:20px;

padding:14px;

background:#2563eb;

color:white;

border:none;

border-radius:10px;

cursor:pointer;

font-size:17px;

font-weight:600;

transition:.3s;

}

.deliver-btn:hover{

background:#1d4ed8;

}

.empty{

text-align:center;

padding:80px;

font-size:28px;

color:#777;

}

`}</style>

      <div className="container">

        <h1 className="title">
          📦 Farmer Orders Dashboard
        </h1>

        {newOrder && (
          <div className="notification">
            🔔 New Order Received
          </div>
        )}

        <div className="stats">

          <div className="card">
            <h4>Total Customers</h4>
            <h2>{totalCustomers}</h2>
          </div>

          <div className="card">
            <h4>Active Orders</h4>
            <h2>{activeOrders.length}</h2>
          </div>

          <div className="card">
            <h4>Total Revenue</h4>
            <h2>₹{totalRevenue}</h2>
          </div>

        </div>

        <button
          className="refresh-btn"
          onClick={fetchOrders}
        >
          🔄 Refresh Orders
        </button>

        <div className="orders-grid">
                    {activeOrders.length === 0 ? (

            <div className="empty">
              No Active Orders
            </div>

          ) : (

            activeOrders.map((item) => (

              <div
                className="order-card"
                key={item.id}
              >

                <h3>
                  Order #{item.order_id}
                </h3>

                <p>
                  <strong>Customer ID :</strong>{" "}
                  {item.customer_id}
                </p>

                <p>
                  <strong>Product :</strong>{" "}
                  {item.product_name}
                </p>

                <p>
                  <strong>Quantity :</strong>{" "}
                  {item.quantity}
                </p>

                <p>
                  <strong>Price :</strong>{" "}
                  ₹{item.price}
                </p>

                <p>
                  <strong>Total :</strong>{" "}
                  ₹{item.subtotal}
                </p>

                <p>
                  <strong>Ordered On :</strong>{" "}
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>

                <span
                  className={`status ${item.order_status}`}
                >
                  {item.order_status}
                </span>

                {item.order_status === "pending" && (

                  <button
                    className="accept-btn"
                    onClick={() =>
                      updateStatus(
                        item.order_id,
                        "accepted"
                      )
                    }
                  >
                    ✅ Accept Order
                  </button>

                )}

                {item.order_status === "accepted" && (

                  <button
                    className="deliver-btn"
                    onClick={() =>
                      updateStatus(
                        item.order_id,
                        "delivered"
                      )
                    }
                  >
                    🚚 Mark as Delivered
                  </button>

                )}

              </div>

            ))

          )}

        </div>

      </div>

    </>
  );
}

export default FarmerOrders;