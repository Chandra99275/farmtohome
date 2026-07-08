
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(items);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

    setCart(updated);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Poppins',sans-serif;
        }

        body{
          background:#f4f7fb;
        }

        .cart-container{
          min-height:100vh;
          padding:40px;
        }

        .cart-header{
          background:linear-gradient(135deg,#2e7d32,#66bb6a);
          padding:30px;
          border-radius:20px;
          color:white;
          margin-bottom:30px;
          box-shadow:0 10px 25px rgba(0,0,0,.15);
        }

        .cart-header h1{
          font-size:36px;
        }

        .cart-header p{
          margin-top:10px;
          opacity:.9;
        }

        .cart-grid{
          display:grid;
          gap:25px;
        }

        .cart-card{
          background:white;
          border-radius:20px;
          padding:20px;
          display:flex;
          gap:20px;
          align-items:center;
          box-shadow:0 5px 15px rgba(0,0,0,.08);
          transition:.3s;
        }

        .cart-card:hover{
          transform:translateY(-5px);
          box-shadow:0 10px 25px rgba(0,0,0,.15);
        }

        .cart-card img{
          width:150px;
          height:150px;
          object-fit:cover;
          border-radius:15px;
        }

        .product-info{
          flex:1;
        }

        .product-info h2{
          color:#222;
          margin-bottom:10px;
        }

        .price{
          color:#2e7d32;
          font-size:22px;
          font-weight:700;
          margin-bottom:10px;
        }

        .qty{
          display:inline-block;
          background:#e8f5e9;
          color:#2e7d32;
          padding:8px 15px;
          border-radius:20px;
          font-weight:600;
          margin-bottom:15px;
        }

        .subtotal{
          font-size:18px;
          font-weight:600;
          color:#444;
          margin-bottom:15px;
        }

        .remove-btn{
          background:#e53935;
          color:white;
          border:none;
          padding:12px 20px;
          border-radius:10px;
          cursor:pointer;
          font-weight:600;
          transition:.3s;
        }

        .remove-btn:hover{
          background:#c62828;
        }

        .summary{
          margin-top:30px;
          background:white;
          border-radius:20px;
          padding:25px;
          box-shadow:0 5px 15px rgba(0,0,0,.08);
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .summary h2{
          color:#333;
        }

        .total{
          color:#2e7d32;
          font-size:32px;
          font-weight:700;
        }

        .btn-group{
          display:flex;
          gap:15px;
        }

        .buy-btn{
          background:#ff9800;
          color:white;
          border:none;
          padding:15px 35px;
          border-radius:12px;
          font-size:16px;
          font-weight:600;
          cursor:pointer;
          transition:.3s;
        }

        .buy-btn:hover{
          background:#f57c00;
        }

        .checkout-btn{
          background:#2e7d32;
          color:white;
          border:none;
          padding:15px 35px;
          border-radius:12px;
          font-size:16px;
          font-weight:600;
          cursor:pointer;
          transition:.3s;
        }

        .checkout-btn:hover{
          background:#1b5e20;
        }

        .empty-cart{
          background:white;
          padding:60px;
          text-align:center;
          border-radius:20px;
          box-shadow:0 5px 15px rgba(0,0,0,.08);
        }

        .empty-cart h2{
          color:#777;
          margin-top:15px;
        }

        .empty-cart span{
          font-size:80px;
        }

        @media(max-width:768px){

          .cart-card{
            flex-direction:column;
            text-align:center;
          }

          .summary{
            flex-direction:column;
            gap:20px;
          }

          .btn-group{
            flex-direction:column;
            width:100%;
          }

          .cart-header h1{
            font-size:28px;
          }
        }
      `}</style>

      <div className="cart-container">

        <div className="cart-header">
          <h1>🛒 Shopping Cart</h1>
          <p>
            Review your fresh farm products before checkout
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span>🛒</span>
            <h2>Your Cart Is Empty</h2>
          </div>
        ) : (
          <>
            <div className="cart-grid">
              {cart.map((item) => (
                <div
                  className="cart-card"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="product-info">
                    <h2>{item.name}</h2>

                    <div className="price">
                      ₹{item.price}/kg
                    </div>

                    <div className="qty">
                      Quantity : {item.quantity}
                    </div>

                    <div className="subtotal">
                      Subtotal : ₹
                      {item.price * item.quantity}
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary">

              <div>
                <h2>Total Amount</h2>

                <div className="total">
                  ₹{total}
                </div>
              </div>

              <div className="btn-group">

                <button
                  className="buy-btn"
                  onClick={() =>
                    navigate("/checkout")
                  }
                >
                  Buy Now
                </button>

                

              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;

