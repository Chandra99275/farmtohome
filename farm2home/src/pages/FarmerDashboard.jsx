import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FarmerLocation from "../components/FarmerLocation";


function FarmerDashboard() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    category: "",
    name: "",
    price: "",
    unit: "Kg",
    quantity: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/api/products/farmer/${user.id}`
      );

      setProducts(res.data.products || res.data || []);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        image: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const categoryMap = {
        Vegetables: 1,
        Fruits: 2,
        Grains: 3,
        Pulses: 4,
        Dairy: 5,
        Spices: 6,
      };

      const formData = new FormData();

      formData.append("farmer_id", user.id);
      formData.append("category_id", categoryMap[product.category]);
      formData.append("name", product.name);
      formData.append("description", "");
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("unit", product.unit);

      if (product.image) {
        formData.append("image", product.image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Product Added Successfully");

        setProduct({
          category: "",
          name: "",
          price: "",
          unit: "Kg",
          quantity: "",
          image: null,
        });

        fetchProducts();
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed To Add Product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
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
          background:#edf7ed;
        }

        .dashboard{
          min-height:100vh;
          padding:35px;
          background:linear-gradient(135deg,#eef9ee,#f5fff5);
        }

        .title{
          text-align:center;
          font-size:38px;
          color:#2e7d32;
          margin-bottom:25px;
          font-weight:700;
        }

        .nav-links{
          display:flex;
          justify-content:center;
          gap:20px;
          margin-bottom:35px;
        }

        .nav-links a{
          text-decoration:none;
          background:#2e7d32;
          color:#fff;
          padding:12px 24px;
          border-radius:8px;
          transition:.3s;
          font-weight:600;
        }

        .nav-links a:hover{
          background:#1b5e20;
        }

        .form-card{
          max-width:900px;
          margin:auto;
          background:#fff;
          padding:30px;
          border-radius:18px;
          box-shadow:0 10px 30px rgba(0,0,0,.08);
          margin-bottom:40px;
        }

        .form-card h2{
          color:#2e7d32;
          margin-bottom:20px;
        }

        .form-card form{
          display:flex;
          flex-direction:column;
          gap:15px;
        }

        .form-card input,
        .form-card select{
          padding:14px;
          border:1px solid #ccc;
          border-radius:8px;
          font-size:15px;
          outline:none;
        }

        .row{
          display:flex;
          gap:15px;
        }

        .row input{
          flex:2;
        }

        .row select{
          flex:1;
        }

        .add-btn{
          padding:14px;
          background:#2e7d32;
          color:white;
          border:none;
          border-radius:8px;
          cursor:pointer;
          font-size:16px;
          transition:.3s;
        }

        .add-btn:hover{
          background:#1b5e20;
        }

        .products-title{
          text-align:center;
          margin-bottom:30px;
          color:#333;
          font-size:30px;
        }

        .products{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(270px,1fr));
          gap:25px;
        }

        .card{
          background:white;
          border-radius:15px;
          overflow:hidden;
          box-shadow:0 10px 25px rgba(0,0,0,.08);
          transition:.35s;
        }

        .card:hover{
          transform:translateY(-8px);
          box-shadow:0 20px 35px rgba(0,0,0,.18);
        }

        .card img{
          width:100%;
          height:220px;
          object-fit:cover;
        }

        .details{
          padding:20px;
        }

        .details h3{
          color:#2e7d32;
          margin-bottom:10px;
        }

        .details p{
          margin:8px 0;
          color:#555;
        }

        .delete-btn{
          width:100%;
          margin-top:15px;
          padding:12px;
          background:#e53935;
          color:white;
          border:none;
          border-radius:8px;
          cursor:pointer;
          font-size:15px;
        }

        .delete-btn:hover{
          background:#b71c1c;
        }

        @media(max-width:768px){

          .dashboard{
            padding:20px;
          }

          .title{
            font-size:30px;
          }

          .nav-links{
            flex-direction:column;
            align-items:center;
          }

          .row{
            flex-direction:column;
          }

        }
      `}</style>

      <div className="dashboard">

        <h1 className="title">🌱 Farmer Dashboard</h1>

        <div className="nav-links">
  <Link to="/farmerprofile">
    Profile
  </Link>

  <Link to="/farmerorders">
    Orders Information
  </Link>
</div>


<div className="form-card">

<FarmerLocation/>

</div>

        <div className="form-card">

          <h2>Add Product</h2>

          <form onSubmit={addProduct}>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
              <option>Pulses</option>
              <option>Dairy</option>
              <option>Spices</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
            />

         <div
  style={{
    display: "flex",
    gap: "15px",
    alignItems: "center",
  }}
>
  <div
    style={{
      position: "relative",
      flex: 2,
    }}
  >
    <span
      style={{
        position: "absolute",
        left: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#2e7d32",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      ₹
    </span>

    <input
      type="number"
      name="price"
      placeholder="Price"
      value={product.price}
      onChange={handleChange}
      min="1"
      required
      style={{
        width: "100%",
        padding: "14px 14px 14px 40px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px",
      }}
    />
  </div>

  <select
    name="unit"
    value={product.unit}
    onChange={handleChange}
    style={{
      flex: 1,
      padding: "14px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    }}
  >
    <option value="Kg">Per Kg</option>
    <option value="Gram">Per Gram</option>
    <option value="Quintal">Per Quintal</option>
    <option value="Ton">Per Ton</option>
    <option value="Litre">Per Litre</option>
    <option value="ml">Per ml</option>
    <option value="Piece">Per Piece</option>
    <option value="Dozen">Per Dozen</option>
    <option value="Bag">Per Bag</option>
    <option value="Box">Per Box</option>
    <option value="Packet">Per Packet</option>
    <option value="Bundle">Per Bundle</option>
    <option value="Tray">Per Tray</option>
    <option value="Sack">Per Sack</option>
  </select>
</div>
            <div className="row">

              <input
                type="number"
                name="quantity"
                placeholder="Available Stock"
                value={product.quantity}
                onChange={handleChange}
                required
              />

              <select
                name="unit"
                value={product.unit}
                onChange={handleChange}
              >
                <option value="Kg">Kg</option>
                <option value="Litre">Litre</option>
                <option value="Piece">Piece</option>
                <option value="Dozen">Dozen</option>
                <option value="Bag">Bag</option>
              </select>

            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            <button className="add-btn" type="submit">
              Add Product
            </button>

          </form>

        </div>

        <h2 className="products-title">
          My Products ({products.length})
        </h2>

        <div className="products">
                    {products.length > 0 ? (
            products.map((item) => (
              <div className="card" key={item.id}>
                <img
                  src={
                    item.image
                      ? `http://localhost:5000/uploads/${item.image}`
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={item.name}
                />

                <div className="details">
                  <h3>{item.name}</h3>

                  <p>
                    <strong>Category:</strong>{" "}
                    {item.category_name || product.category || "Farm Product"}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{item.price}/{item.unit}
                  </p>

                  <p>
                    <strong>Available Stock:</strong> {item.quantity}{" "}
                    {item.unit}
                  </p>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(item.id)}
                  >
                    🗑 Delete Product
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                background: "#fff",
                padding: "50px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)",
              }}
            >
              <h2 style={{ color: "#2e7d32", marginBottom: "10px" }}>
                🌱 No Products Available
              </h2>

              <p style={{ color: "#666" }}>
                Add your first product using the form above.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FarmerDashboard;