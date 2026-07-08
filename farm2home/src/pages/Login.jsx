import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api/auth";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${API}/login`, {
        email: formData.email,
        password: formData.password,
        role: role,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful");

      if (role === "customer") {
        navigate("/userdashboard");
      } else {
        navigate("/farmerdashboard");
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Poppins',sans-serif;
        }

        .login-container{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#2e7d32,#66bb6a);
          padding:20px;
        }

        .login-card{
          width:100%;
          max-width:450px;
          background:white;
          border-radius:20px;
          padding:40px;
          box-shadow:0 10px 30px rgba(0,0,0,0.2);
        }

        .logo{
          text-align:center;
          font-size:34px;
          font-weight:700;
          color:#2e7d32;
          margin-bottom:10px;
        }

        .title{
          text-align:center;
          color:#444;
          margin-bottom:25px;
        }

        .role-container{
          display:flex;
          gap:10px;
          margin-bottom:20px;
        }

        .role-btn{
          flex:1;
          padding:12px;
          border:2px solid #2e7d32;
          border-radius:10px;
          text-align:center;
          cursor:pointer;
          font-weight:600;
          transition:0.3s;
        }

        .active{
          background:#2e7d32;
          color:white;
        }

        .input-group{
          margin-bottom:18px;
        }

        .input-group label{
          display:block;
          margin-bottom:6px;
          font-weight:600;
          color:#555;
        }

        .input-group input{
          width:100%;
          padding:12px;
          border:1px solid #ddd;
          border-radius:8px;
          outline:none;
        }

        .input-group input:focus{
          border-color:#2e7d32;
        }

        .forgot-password{
          text-align:right;
          margin-bottom:15px;
        }

        .forgot-password a{
          text-decoration:none;
          color:#2e7d32;
        }

        .login-btn{
          width:100%;
          padding:14px;
          border:none;
          border-radius:8px;
          background:#ff9800;
          color:white;
          font-size:16px;
          font-weight:600;
          cursor:pointer;
        }

        .login-btn:hover{
          opacity:0.9;
        }

        .footer-text{
          text-align:center;
          margin-top:20px;
        }

        .footer-text a{
          color:#2e7d32;
          text-decoration:none;
          font-weight:600;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">

          <div className="logo">
            🌱 Farm2Home
          </div>

          <h2 className="title">
            Welcome Back
          </h2>

          <div className="role-container">

            <div
              className={`role-btn ${
                role === "customer" ? "active" : ""
              }`}
              onClick={() => setRole("customer")}
            >
              Customer
            </div>

            <div
              className={`role-btn ${
                role === "farmer" ? "active" : ""
              }`}
              onClick={() => setRole("farmer")}
            >
              Farmer
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="footer-text">
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;