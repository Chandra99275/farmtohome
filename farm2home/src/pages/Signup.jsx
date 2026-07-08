import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    farm_name: "",
    farm_location: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api/auth";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendOTP = async () => {
    try {
      if (!formData.email) {
        alert("Please enter email first");
        return;
      }

      setLoading(true);

      const res = await axios.post(`${API}/send-otp`, {
        email: formData.email,
      });

      setOtpSent(true);
      alert(res.data.message);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      if (!otp) {
        alert("Enter OTP");
        return;
      }

      setLoading(true);

      const res = await axios.post(`${API}/verify-otp`, {
        email: formData.email,
        otp,
      });

      setVerified(true);

      alert(res.data.message);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "OTP Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify your email first");
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/signup`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        farm_name: formData.farm_name,
        farm_location: formData.farm_location,
      });

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "customer",
        farm_name: "",
        farm_location: "",
      });

      setOtp("");
      setOtpSent(false);
      setVerified(false);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1 className="logo">
          🌱 Farm2Home
        </h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <div className="otp-row">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={sendOTP}
                disabled={loading}
              >
                Send OTP
              </button>
            </div>
          </div>

          {otpSent && (
            <div className="form-group">

              <label>Email OTP</label>

              <div className="otp-row">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={verifyOTP}
                  disabled={loading}
                >
                  Verify
                </button>
              </div>

              {verified && (
                <p className="verified">
                  ✅ Email Verified
                </p>
              )}
            </div>
          )}

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="customer">
                Customer
              </option>

              <option value="farmer">
                Farmer
              </option>
            </select>
          </div>

          {formData.role === "farmer" && (
            <>
              <div className="form-group">
                <label>Farm Name</label>

                <input
                  type="text"
                  name="farm_name"
                  placeholder="Enter Farm Name"
                  value={formData.farm_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Farm Location</label>

                <input
                  type="text"
                  name="farm_location"
                  placeholder="Enter Farm Location"
                  value={formData.farm_location}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="signup-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : "Create Account"}
          </button>

        </form>

        <div className="login-link">
          Already have an account?
          <a href="/login"> Login</a>
        </div>

      </div>
    </div>
  );
}

export default Signup;