import React from "react";
import { Link } from "react-router-dom";


function Home() {
  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: "₹30/kg",
      image:
        "https://images.unsplash.com/pho to-1546470427-e212b9f0aab8?w=500",
    },
    {
      id: 2,
      name: "Organic Potatoes",
      price: "₹25/kg",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
    },
    {
      id: 3,
      name: "Red Apples",
      price: "₹150/kg",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
    },
    {
      id: 4,
      name: "Fresh Bananas",
      price: "₹60/dozen",
      image:
        "https://images.unsplash.com/photo-1574226516831-e1dff420e37f?w=500",
    },
  ];

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
          background:#f5f5f5;
        }

        .navbar{
          background:#2e7d32;
          color:white;
          padding:15px 50px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          position:sticky;
          top:0;
          z-index:1000;
        }

        .logo{
          font-size:28px;
          font-weight:bold;
        }

        .nav-links{
          display:flex;
          gap:25px;
        }

        .nav-links a{
          color:white;
          text-decoration:none;
          font-weight:500;
        }

        .buttons{
          display:flex;
          gap:10px;
        }

        .btn{
          padding:10px 20px;
          border:none;
          border-radius:6px;
          cursor:pointer;
          font-weight:600;
        }

        .login{
          background:white;
          color:#2e7d32;
        }

        .signup{
          background:#ff9800;
          color:white;
        }

        .buttons a{
          text-decoration:none;
        }

        .hero{
          min-height:80vh;
          display:flex;
          justify-content:center;
          align-items:center;
          text-align:center;
          color:white;
          background:
          linear-gradient(
            rgba(0,0,0,.4),
            rgba(0,0,0,.4)
          ),
          url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854");
          background-size:cover;
          background-position:center;
        }

        .hero-content h1{
          font-size:60px;
          margin-bottom:20px;
        }

        .hero-content p{
          font-size:22px;
          margin-bottom:30px;
        }

        .shop-btn{
          background:#ff9800;
          color:white;
          border:none;
          padding:15px 30px;
          border-radius:8px;
          font-size:18px;
          cursor:pointer;
        }

        .hero a{
          text-decoration:none;
        }

        .section-title{
          text-align:center;
          font-size:38px;
          color:#2e7d32;
          margin-bottom:40px;
        }

        .categories{
          padding:60px 50px;
        }

        .category-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(180px,1fr));
          gap:20px;
        }

        .category-card{
          background:white;
          padding:30px;
          text-align:center;
          border-radius:15px;
          box-shadow:0 4px 10px rgba(0,0,0,.1);
        }

        .category-card h3{
          margin-top:15px;
        }

        .products{
          padding:60px 50px;
        }

        .product-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(250px,1fr));
          gap:25px;
        }

        .product-card{
          background:white;
          border-radius:15px;
          overflow:hidden;
          box-shadow:0 4px 10px rgba(0,0,0,.1);
        }

        .product-card img{
          width:100%;
          height:220px;
          object-fit:cover;
        }

        .product-content{
          padding:15px;
        }

        .price{
          color:#2e7d32;
          font-weight:bold;
          margin:10px 0;
        }

        .cart-btn{
          width:100%;
          padding:10px;
          border:none;
          background:#2e7d32;
          color:white;
          border-radius:5px;
          cursor:pointer;
        }

        .features{
          padding:70px 50px;
          background:white;
        }

        .feature-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(250px,1fr));
          gap:25px;
        }

        .feature-card{
          text-align:center;
          padding:30px;
          border-radius:15px;
          box-shadow:0 4px 10px rgba(0,0,0,.08);
        }

        .feature-card h3{
          margin:15px 0;
          color:#2e7d32;
        }

        .footer{
          background:#1b5e20;
          color:white;
          text-align:center;
          padding:30px;
        }

        @media(max-width:768px){

          .navbar{
            flex-direction:column;
            gap:15px;
            padding:20px;
          }

          .hero-content h1{
            font-size:40px;
          }

          .hero-content p{
            font-size:18px;
          }

          .nav-links{
            flex-wrap:wrap;
            justify-content:center;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo">🌱 Farm2Home</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="buttons">
          <Link to="/login">
            <button className="btn login">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="btn signup">
              Signup
            </button>
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Fresh From Farm To Home</h1>

          <p>
            Buy vegetables and fruits directly
            from farmers without middlemen.
          </p>

          <Link to="/login">
            <button className="shop-btn">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>

      <section className="categories">
        <h2 className="section-title">
          Shop By Category
        </h2>

        <div className="category-grid">
          <div className="category-card">
            🥬
            <h3>Vegetables</h3>
          </div>

          <div className="category-card">
            🍎
            <h3>Fruits</h3>
          </div>

          <div className="category-card">
            🌾
            <h3>Grains</h3>
          </div>

          <div className="category-card">
            🥛
            <h3>Dairy</h3>
          </div>
        </div>
      </section>

      <section className="products">
  <h2 className="section-title">
    Featured Products
  </h2>

  <div className="product-grid">

    {products.map((item) => (
      <div
        className="product-card"
        key={item.id}
      >
        <img
          src={
            item.image
              ? item.image
              : "https://via.placeholder.com/300x250"
          }
          alt={item.name}
        />

        <div className="product-content">
          <h3>{item.name}</h3>

          <div className="price">
            ₹{item.price}/{item.unit}
          </div>

          <p>
            Available Stock:
            {item.quantity}
          </p>

          <Link to="/products">
            <button className="cart-btn">
              View Product
            </button>
          </Link>
        </div>
      </div>
    ))}

    {/* Existing Static Products */}

    <div className="product-card">
      <img
        src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
        alt="Apple"
      />

      <div className="product-content">
        <h3>Fresh Apples</h3>

        <div className="price">
          ₹120/Kg
        </div>

        <Link to="/products">
          <button className="cart-btn">
            View Product
          </button>
        </Link>
      </div>
    </div>

    <div className="product-card">
      <img
        src="https://images.unsplash.com/photo-1546470427-e5ac89cd0b0d"
        alt="Tomato"
      />

      <div className="product-content">
        <h3>Organic Tomatoes</h3>

        <div className="price">
          ₹40/Kg
        </div>

        <Link to="/products">
          <button className="cart-btn">
            View Product
          </button>
        </Link>
      </div>
    </div>

    <div className="product-card">
      <img
        src="https://images.unsplash.com/photo-1518977676601-b53f82aba655"
        alt="Milk"
      />

      <div className="product-content">
        <h3>Fresh Milk</h3>

        <div className="price">
          ₹60/Litre
        </div>

        <Link to="/products">
          <button className="cart-btn">
            View Product
          </button>
        </Link>
      </div>
    </div>

  </div>
</section>

      <section className="features">
        <h2 className="section-title">
          Why Farm2Home?
        </h2>

        <div className="feature-grid">
          <div className="feature-card">
            🚜
            <h3>Direct Farmers</h3>
            <p>
              No middlemen between farmers and
              customers.
            </p>
          </div>

          <div className="feature-card">
            🥗
            <h3>Fresh Products</h3>
            <p>
              Fresh vegetables and fruits
              delivered to your home.
            </p>
          </div>

          <div className="feature-card">
            💰
            <h3>Best Prices</h3>
            <p>
              Better profit for farmers and
              lower prices for customers.
            </p>
          </div>

          <div className="feature-card">
            🚚
            <h3>Fast Delivery</h3>
            <p>
              Quick and reliable doorstep
              delivery.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h2>🌱 Farm2Home</h2>
        <p>
          Connecting Farmers Directly With
          Customers
        </p>
      </footer>
    </>
  );
}

export default Home;