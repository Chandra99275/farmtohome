import React, { useState } from "react";
import axios from "axios";

function Checkout() {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const saveOrder = async (
    transactionId = null
  ) => {
    try {
      const orderItems =
        cart.map((item) => ({
          product_id: item.id,
          farmer_id:
            item.farmer_id,
          quantity:
            item.quantity,
          price: item.price,
        }));

      const res =
        await axios.post(
          "http://localhost:5000/api/orders/place",
          {
            customer_id:
              user.id,

            items: orderItems,

            total_amount:
              total,

            address:
              formData.address,

            city:
              formData.city,

            pincode:
              formData.pincode,

            phone:
              formData.phone,

            payment_method:
              formData.paymentMethod,

            transaction_id:
              transactionId,
          }
        );

      if (res.data.success) {
        localStorage.removeItem(
          "cart"
        );

        alert(
          "Order Placed Successfully"
        );

        window.location.href =
          "/customerorders";
      }
    } catch (err) {
      console.log(err);
      alert(
        "Failed To Place Order"
      );
    }
  };

  const placeOrder =
    async () => {
      if (
        !formData.fullName ||
        !formData.phone ||
        !formData.address
      ) {
        alert(
          "Please Fill All Details"
        );
        return;
      }

      if (
        cart.length === 0
      ) {
        alert(
          "Cart Is Empty"
        );
        return;
      }

      if (
        formData.paymentMethod ===
        "COD"
      ) {
        saveOrder();
        return;
      }

      try {
        const paymentRes =
          await axios.post(
            "http://localhost:5000/api/payment/create-order",
            {
              amount: total,
            }
          );

        const order =
          paymentRes.data;

        const options = {
          key: "rzp_test_T3SnYvtlvS3N0n",

          amount:
            order.amount,

          currency:
            order.currency,

          order_id:
            order.id,

          name:
            "Farm2Home",

          description:
            "Farm Products Payment",

          handler:
            async function (
              response
            ) {
              await saveOrder(
                response.razorpay_payment_id
              );
            },

          prefill: {
            name:
              formData.fullName,

            contact:
              formData.phone,
          },

          theme: {
            color:
              "#16a34a",
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();
      } catch (err) {
        console.log(err);
        alert(
          "Payment Failed"
        );
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
        background:#f4f6f9;
      }

      .checkout{
        max-width:900px;
        margin:40px auto;
        background:white;
        padding:30px;
        border-radius:20px;
        box-shadow:0 5px 20px rgba(0,0,0,.1);
      }

      .title{
        text-align:center;
        color:#14532d;
        margin-bottom:25px;
      }

      input,
      textarea,
      select{
        width:100%;
        padding:14px;
        margin-bottom:15px;
        border:1px solid #ddd;
        border-radius:10px;
      }

      textarea{
        height:100px;
        resize:none;
      }

      .summary{
        margin-top:20px;
        background:#f8fafc;
        padding:20px;
        border-radius:12px;
      }

      .summary h3{
        margin-bottom:15px;
      }

      .item{
        display:flex;
        justify-content:space-between;
        margin-bottom:10px;
      }

      .total{
        margin-top:15px;
        font-size:24px;
        color:#16a34a;
        font-weight:700;
      }

      .checkout-btn{
        width:100%;
        margin-top:20px;
        padding:15px;
        border:none;
        background:#16a34a;
        color:white;
        font-size:18px;
        border-radius:10px;
        cursor:pointer;
      }

      .checkout-btn:hover{
        background:#15803d;
      }
      `}</style>

      <div className="checkout">
        <h1 className="title">
          Checkout
        </h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={
            formData.fullName
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={
            formData.phone
          }
          onChange={
            handleChange
          }
        />

        <textarea
          name="address"
          placeholder="Address"
          value={
            formData.address
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={
            formData.city
          }
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={
            formData.pincode
          }
          onChange={
            handleChange
          }
        />

        <select
          name="paymentMethod"
          value={
            formData.paymentMethod
          }
          onChange={
            handleChange
          }
        >
          <option value="COD">
            Cash On Delivery
          </option>

          <option value="UPI">
            Pay Online (Razorpay)
          </option>
        </select>

        <div className="summary">
          <h3>
            Order Summary
          </h3>

          {cart.map((item, index) => (
  <div
    className="item"
    key={item.id || index}
  >
                <span>
                  {item.name}
                  {" × "}
                  {
                    item.quantity
                  }
                </span>

                <span>
                  ₹
                  {item.price *
                    item.quantity}
                </span>
              </div>
            )
          )}

          <div className="total">
            Total : ₹
            {total}
          </div>
        </div>

        <button
          className="checkout-btn"
          onClick={
            placeOrder
          }
        >
          {formData.paymentMethod ===
          "UPI"
            ? "Pay & Place Order"
            : "Place Order"}
        </button>
      </div>
    </>
  );
}

export default Checkout;