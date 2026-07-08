import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/all"
      );

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
      alert("Failed to load products");
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added To Cart");
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

        .container{
          padding:40px;
          background:#f5f7fb;
          min-height:100vh;
        }

        .title{
          text-align:center;
          margin-bottom:30px;
          color:#2e7d32;
        }

        .search{
          width:100%;
          padding:15px;
          margin-bottom:30px;
          border-radius:10px;
          border:1px solid #ccc;
          font-size:16px;
        }

        .grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fill,minmax(280px,1fr));
          gap:25px;
        }

        .card{
          background:white;
          border-radius:15px;
          overflow:hidden;
          box-shadow:0 4px 12px rgba(0,0,0,.08);
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

        .content h3{
          margin-bottom:10px;
        }

        .price{
          color:#2e7d32;
          font-size:20px;
          font-weight:bold;
          margin-bottom:10px;
        }

        .category{
          color:#666;
          margin-bottom:5px;
        }

        .stock{
          color:#444;
          margin-bottom:15px;
        }

        button{
          width:100%;
          padding:12px;
          border:none;
          border-radius:8px;
          background:#ff9800;
          color:white;
          font-size:15px;
          cursor:pointer;
        }

        button:hover{
          background:#f57c00;
        }
      `}</style>

      <div className="container">

        <h1 className="title">
          Fresh Farm Products
        </h1>

        <input
          className="search"
          placeholder="Search Products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <div
                className="card"
                key={product.id}
              >

                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                />

                <div className="content">

                  <h3>{product.name}</h3>

                  <div className="price">
                    ₹{product.price}/{product.unit}
                  </div>

                  <div className="category">
                    Category:
                    {product.category}
                  </div>

                  <div className="stock">
                    Available:
                    {product.quantity}
                    {product.unit}
                  </div>

                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add To Cart
                  </button>

                </div>

              </div>

            ))

          ) : (

            <h2>
              No Products Available
            </h2>

          )}

        </div>

      </div>
    </>
  );
}

export default Products;