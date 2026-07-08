import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "Fresh Tomato",
      price: 30,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1546470427-e212b9f0aab8?w=500",
    },
    {
      id: 2,
      name: "Potato",
      price: 25,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
    },
    {
      id: 3,
      name: "Onion",
      price: 40,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500",
    },
    {
      id: 4,
      name: "Carrot",
      price: 50,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500",
    },
    {
      id: 5,
      name: "Apple",
      price: 150,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
    },
    {
      id: 6,
      name: "Banana",
      price: 60,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1574226516831-e1dff420e37f?w=500",
    },
    {
      id: 7,
      name: "Orange",
      price: 120,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=500",
    },
    {
      id: 8,
      name: "Mango",
      price: 180,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500",
    },
    {
      id: 9,
      name: "Cabbage",
      price: 35,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500",
    },
    {
      id: 10,
      name: "Cauliflower",
      price: 45,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=500",
    },
    {
      id: 11,
      name: "Pomegranate",
      price: 200,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=500",
    },
    {
      id: 12,
      name: "Papaya",
      price: 70,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=500",
    },
    {
      id: 13,
      name: "Spinach",
      price: 20,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500",
    },
    {
      id: 14,
      name: "Brinjal",
      price: 45,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1603048719539-9ecb7b7447af?w=500",
    },
    {
      id: 15,
      name: "Grapes",
      price: 110,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500",
    },
    {
      id: 16,
      name: "Guava",
      price: 80,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=500",
    },
    {
      id: 17,
      name: "Beans",
      price: 55,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1566842600175-97dca489844f?w=500",
    },
    {
      id: 18,
      name: "Capsicum",
      price: 65,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500",
    },
    {
      id: 19,
      name: "Watermelon",
      price: 50,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=500",
    },
    {
      id: 20,
      name: "Pineapple",
      price: 90,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500",
    },
    {
      id: 21,
      name: "Cucumber",
      price: 30,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1604977046800-5f84d4ef6cf5?w=500",
    },
    {
      id: 22,
      name: "Beetroot",
      price: 55,
      category: "Vegetable",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500",
    },
    {
      id: 23,
      name: "Kiwi",
      price: 250,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=500",
    },
    {
      id: 24,
      name: "Strawberry",
      price: 300,
      category: "Fruit",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500",
    },
  ];

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
          background:#f1f3f6;
        }

        .navbar{
          background:#2e7d32;
          padding:15px 30px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          color:white;
          position:sticky;
          top:0;
          z-index:100;
        }

        .logo{
          font-size:28px;
          font-weight:700;
        }

        .search{
          width:45%;
          padding:12px;
          border:none;
          border-radius:8px;
          outline:none;
        }

        .nav-icons{
          display:flex;
          gap:20px;
          font-size:18px;
          font-weight:600;
        }

        .categories{
          display:flex;
          justify-content:center;
          gap:25px;
          background:white;
          padding:20px;
          flex-wrap:wrap;
        }

        .category{
          background:#e8f5e9;
          padding:10px 20px;
          border-radius:20px;
          cursor:pointer;
          font-weight:600;
        }

        .banner{
          margin:20px;
          background:linear-gradient(to right,#2e7d32,#4caf50);
          color:white;
          padding:60px;
          border-radius:15px;
          text-align:center;
        }

        .banner h1{
          font-size:42px;
          margin-bottom:10px;
        }

        .section{
          padding:20px;
        }

        .section h2{
          margin-bottom:20px;
          color:#333;
        }

        .grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fill,minmax(240px,1fr));
          gap:20px;
        }

        .card{
          background:white;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 3px 10px rgba(0,0,0,.1);
          transition:.3s;
        }

        .card:hover{
          transform:translateY(-5px);
        }

        .card img{
          width:100%;
          height:220px;
          object-fit:cover;
        }

        .content{
          padding:15px;
        }

        .price{
          color:#2e7d32;
          font-size:20px;
          font-weight:bold;
          margin:10px 0;
        }

        .rating{
          color:#ff9800;
          margin-bottom:10px;
        }

        .btn{
          width:100%;
          padding:10px;
          border:none;
          background:#ff9800;
          color:white;
          border-radius:6px;
          cursor:pointer;
        }

        .footer{
          margin-top:40px;
          background:#1b5e20;
          color:white;
          text-align:center;
          padding:25px;
        }

        @media(max-width:768px){
          .navbar{
            flex-direction:column;
            gap:15px;
          }

          .search{
            width:100%;
          }

          .banner h1{
            font-size:28px;
          }
        }
          .nav-icons{
  display:flex;
  align-items:center;
  gap:15px;
}

.nav-btn{
  display:flex;
  align-items:center;
  gap:8px;
  text-decoration:none;
  background:white;
  color:#2e7d32;
  padding:10px 18px;
  border-radius:30px;
  font-weight:600;
  box-shadow:0 4px 12px rgba(0,0,0,.1);
  transition:.3s;
  border:2px solid transparent;
}

.nav-btn:hover{
  background:#2e7d32;
  color:white;
  transform:translateY(-3px);
  box-shadow:0 8px 20px rgba(46,125,50,.3);
}

.nav-btn span{
  font-size:15px;
}

@media(max-width:768px){
  .nav-icons{
    flex-wrap:wrap;
    justify-content:center;
  }

  .nav-btn{
    width:100%;
    justify-content:center;
  }
}
  .section{
  padding:40px 20px;
}

.section h2{
  font-size:32px;
  margin-bottom:25px;
  color:#14532d;
}

.products{
  margin-top:20px;
}

.section-title{
  text-align:center;
  font-size:36px;
  font-weight:700;
  color:#14532d;
  margin-bottom:35px;
}

.product-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:25px;
}

.product-card{
  background:white;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 5px 20px rgba(0,0,0,.1);
  transition:all .3s ease;
  position:relative;
}

.product-card:hover{
  transform:translateY(-10px);
  box-shadow:0 15px 35px rgba(0,0,0,.15);
}

.product-card img{
  width:100%;
  height:220px;
  object-fit:cover;
  transition:.4s;
}

.product-card:hover img{
  transform:scale(1.05);
}

.product-content{
  padding:20px;
}

.product-content h3{
  font-size:22px;
  color:#222;
  margin-bottom:10px;
}

.price{
  font-size:24px;
  font-weight:700;
  color:#16a34a;
  margin-bottom:12px;
}

.product-content p{
  color:#666;
  margin-bottom:15px;
  font-size:15px;
}

.cart-btn{
  width:100%;
  padding:12px;
  border:none;
  border-radius:10px;
  background:linear-gradient(
    135deg,
    #16a34a,
    #22c55e
  );
  color:white;
  font-size:16px;
  font-weight:600;
  cursor:pointer;
  transition:.3s;
}

.cart-btn:hover{
  background:linear-gradient(
    135deg,
    #15803d,
    #16a34a
  );
  transform:scale(1.03);
}

.product-card::before{
  content:"🌱 Fresh";
  position:absolute;
  top:15px;
  left:15px;
  background:#16a34a;
  color:white;
  padding:5px 12px;
  border-radius:20px;
  font-size:12px;
  font-weight:bold;
}

@media(max-width:768px){

  .section-title{
    font-size:28px;
  }

  .product-grid{
    grid-template-columns:1fr;
  }

  .product-card img{
    height:200px;
  }
}
      `}</style>

      <div className="navbar">
        <div className="logo">🌱 Farm2Home</div>

        <input
          className="search"
          placeholder="Search vegetables, fruits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="nav-icons">

  <Link to="/cart" className="nav-btn">
    🛒 <span>Cart</span>
  </Link>

  <Link
    to="/customerorders"
    className="nav-btn"
  >
    📦 <span>My Orders</span>
  </Link>

  <Link
    to="/customerprofile"
    className="nav-btn"
  >
    👤 <span>Profile</span>
  </Link>


        </div>
      </div>

      <div className="categories">
        <div className="category">🥬 Vegetables</div>
        <div className="category">🍎 Fruits</div>
        <div className="category">🌾 Grains</div>
        <div className="category">🥛 Dairy</div>
      </div>

      <div className="banner">
        <h1>Fresh From Farmers To Your Home</h1>
        <p>Buy Fresh Organic Products Directly From Farmers</p>
      </div>

      <div className="section">
        <h2>🔥 Trending Products</h2>

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
        
      </div>

      <div className="footer">
        <h2>🌱 Farm2Home</h2>
        <p>Connecting Farmers Directly With Customers</p>
      </div>
    </>
  );
}

export default UserDashboard;