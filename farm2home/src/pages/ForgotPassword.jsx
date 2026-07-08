import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [otpVerified, setOtpVerified] =
    useState(false);

  const sendOTP = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password/send-otp",
        { email }
      );

      alert(res.data.message);

      setOtpSent(true);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-forgot-otp",
        {
          email,
          otp,
        }
      );

      alert(res.data.message);

      setOtpVerified(true);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid OTP"
      );
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password/reset",
        {
          email,
          otp,
          newPassword,
        }
      );

      alert(res.data.message);

      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Password Reset Failed"
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
        font-family:'Poppins',sans-serif;
      }

      .forgot-container{
        min-height:100vh;
        background:linear-gradient(135deg,#11998e,#38ef7d);
        display:flex;
        justify-content:center;
        align-items:center;
        padding:20px;
      }

      .forgot-card{
        width:100%;
        max-width:450px;
        background:white;
        padding:40px;
        border-radius:25px;
        box-shadow:0 15px 40px rgba(0,0,0,0.2);
        text-align:center;
      }

      .forgot-card h1{
        color:#2e7d32;
        margin-bottom:10px;
      }

      .forgot-card p{
        color:#666;
        margin-bottom:25px;
      }

      .forgot-card input{
        width:100%;
        padding:14px;
        margin-bottom:15px;
        border:2px solid #ddd;
        border-radius:10px;
        font-size:15px;
        outline:none;
      }

      .forgot-card input:focus{
        border-color:#2e7d32;
      }

      .btn{
        width:100%;
        padding:14px;
        border:none;
        border-radius:10px;
        cursor:pointer;
        font-size:16px;
        font-weight:600;
        margin-bottom:15px;
        transition:.3s;
      }

      .send-btn{
        background:#2196f3;
        color:white;
      }

      .send-btn:hover{
        background:#1976d2;
      }

      .verify-btn{
        background:#ff9800;
        color:white;
      }

      .verify-btn:hover{
        background:#f57c00;
      }

      .reset-btn{
        background:#2e7d32;
        color:white;
      }

      .reset-btn:hover{
        background:#1b5e20;
      }

      .success{
        background:#e8f5e9;
        color:#2e7d32;
        padding:10px;
        border-radius:8px;
        margin-bottom:15px;
        font-weight:600;
      }

      .lock-icon{
        font-size:60px;
        margin-bottom:15px;
      }
      `}</style>

      <div className="forgot-container">
        <div className="forgot-card">

          <div className="lock-icon">
            🔐
          </div>

          <h1>Forgot Password</h1>

          <p>
            Verify your email and reset
            your password securely
          </p>

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            className="btn send-btn"
            onClick={sendOTP}
          >
            Send OTP
          </button>

          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <button
                className="btn verify-btn"
                onClick={verifyOTP}
              >
                Verify OTP
              </button>
            </>
          )}

          {otpVerified && (
            <>
              <div className="success">
                ✅ OTP Verified Successfully
              </div>

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
              />

              <button
                className="btn reset-btn"
                onClick={resetPassword}
              >
                Reset Password
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default ForgotPassword;