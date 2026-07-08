import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

useEffect(() => {

  fetchOrders();

  socket.on("newOrder", () => {
    fetchOrders();
  });

  socket.on("orderUpdated", () => {
    fetchOrders();
  });

  return () => {
    socket.off("newOrder");
    socket.off("orderUpdated");
  };

}, []);
  const fetchOrders = async () => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/api/orders/customer/${user.id}`
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        background:#f5f7fa;
      }

      .orders{
        max-width:1000px;
        margin:40px auto;
        padding:20px;
      }

      .title{
        text-align:center;
        margin-bottom:30px;
        color:#14532d;
      }

      .card{
        background:white;
        border-radius:18px;
        padding:25px;
        margin-bottom:25px;
        box-shadow:0 10px 25px rgba(0,0,0,.08);
      }

      .header{
        display:flex;
        justify-content:space-between;
        margin-bottom:20px;
      }

      .header h2{
        color:#14532d;
      }

      .date{
        color:#777;
      }

      .product{
        display:flex;
        justify-content:space-between;
        padding:10px 0;
        border-bottom:1px solid #eee;
      }

      .total{
        margin-top:15px;
        font-size:22px;
        font-weight:700;
        color:#16a34a;
      }

      .status-container{
        margin-top:25px;
        display:flex;
        flex-direction:column;
        gap:10px;
      }

      .step{
        padding:12px;
        border-radius:10px;
        background:#f3f4f6;
        color:#666;
        font-weight:600;
        transition:.3s;
      }

      .step.active{
        background:#dcfce7;
        color:#166534;
        border-left:6px solid #16a34a;
      }

      .step.current{
        background:#fef3c7;
        color:#92400e;
        border-left:6px solid orange;
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

      .empty{
        text-align:center;
        padding:60px;
        color:#777;
      }

      @media(max-width:768px){

        .header{
          flex-direction:column;
          gap:10px;
        }

        .product{
          flex-direction:column;
        }

      }

      `}</style>

      <div className="orders">

        <h1 className="title">
          📦 My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="empty">
            <h2>No Orders Yet</h2>
          </div>

        ) : (

          orders.map((order) => (

            <div
              className="card"
              key={`${order.id}-${order.product_id}`}
            >

              <div className="header">

                <div>

                  <h2>
                    Order #{order.id}
                  </h2>

                  <p className="date">
                    {new Date(
                      order.created_at
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="total">
                  ₹{order.total_amount}
                </div>

              </div>

              <div className="product">

                <div>
                  <strong>
                    {order.product_name}
                  </strong>
                </div>

                <div>
                  Qty : {order.quantity}
                </div>

                <div>
                  ₹{order.price}
                </div>

              </div>

              <div className="status-container">

                <div className={`step ${
                  order.order_status === "pending"
                  ? "current"
                  : "active"
                }`}>
                  ✔ Order Placed
                </div>

                <div className={`step ${
                  order.order_status === "processing"
                  ? "current"
                  : ["shipped","delivered"].includes(order.order_status)
                  ? "active"
                  : ""
                }`}>
                  👨‍🌾 Farmer Accepted
                </div>

                <div className={`step ${
                  order.order_status === "shipped"
                  ? "current"
                  : order.order_status === "delivered"
                  ? "active"
                  : ""
                }`}>
                  📦 Packing
                </div>

                <div className={`step ${
                  order.order_status === "shipped"
                  ? "active"
                  : ""
                }`}>
                  🛵 Out For Delivery
                </div>

                <div className={`step ${
                  order.order_status === "delivered"
                  ? "active"
                  : ""
                }`}>
                  ✅ Delivered
                </div>

              </div>

            </div>

          ))

        )}

      </div>
    </>
  );
}

export default CustomerOrders;