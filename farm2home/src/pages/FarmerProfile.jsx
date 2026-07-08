import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";


function FarmerProfile() {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/profile";

  const [farmer, setFarmer] = useState({
    id: "",
    farmer_name: "",
    email: "",
    phone: "",
    farm_name: "",
    farm_location: "",
    created_at: "",
  });

  // Email Change States
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  // Password Change States
  const [newPassword, setNewPassword] = useState("");
  const [passwordOtp, setPasswordOtp] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================
  // FETCH PROFILE
  // ==========================
  const fetchProfile = async () => {
  try {
    console.log("Fetching farmer profile...");

    const res = await axios.get(
      "http://localhost:5000/api/profile/farmer",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", res.data);

    if (res.data.user) {
      setFarmer(res.data.user);
    }
  } catch (err) {
    console.log("ERROR:", err);
  } finally {
    setLoading(false);
  }
};

  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleChange = (e) => {
    setFarmer({
      ...farmer,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // UPDATE PROFILE
  // ==========================
  const updateProfile = async () => {
    try {
      const res = await axios.put(
        `${API}/farmer`,
        {
          farmer_name: farmer.farmer_name,
          phone: farmer.phone,
          farm_name: farmer.farm_name,
          farm_location: farmer.farm_location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setEditMode(false);

      fetchProfile();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Update Failed"
      );
    }
  };

  // ==========================
  // SEND EMAIL OTP
  // ==========================
  const sendEmailOTP = async () => {
    if (!newEmail) {
      alert("Please Enter New Email");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/send-email-change-otp`,
        { newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Failed To Send OTP"
      );
    }
  };

  // ==========================
  // VERIFY EMAIL OTP
  // ==========================
  const verifyEmailOTP = async () => {
    if (!emailOtp) {
      alert("Please Enter OTP");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/verify-email-change-otp`,
        {
          newEmail,
          otp: emailOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setNewEmail("");
      setEmailOtp("");

      fetchProfile();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Verification Failed"
      );
    }
  };

  // ==========================
  // SEND PASSWORD OTP
  // ==========================
  const sendPasswordOTP = async () => {
    try {
      const res = await axios.post(
        `${API}/send-password-change-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Failed To Send OTP"
      );
    }
  };
  

  // ==========================
  // VERIFY PASSWORD OTP
  // ==========================
  const verifyPasswordOTP = async () => {
    if (!newPassword) {
      alert("Enter New Password");
      return;
    }

    if (!passwordOtp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/verify-password-change-otp`,
        {
          otp: passwordOtp,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setNewPassword("");
      setPasswordOtp("");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Password Change Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
            alt="Farmer"
          />

          <h2>Farmer Profile</h2>
        </div>

        <div className="profile-body">

          <label>Farmer ID</label>
          <input
            value={farmer?.id || ""}
            disabled
          />

          <label>Farmer Name</label>
          <input
            type="text"
            name="farmer_name"
            value={farmer?.farmer_name || ""}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            value={farmer?.email || ""}
            disabled
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={farmer?.phone || ""}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Farm Name</label>
          <input
            type="text"
            name="farm_name"
            value={farmer?.farm_name || ""}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Farm Location</label>
          <input
            type="text"
            name="farm_location"
            value={farmer?.farm_location || ""}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Joined On</label>
          <input
            value={
              farmer?.created_at
                ? new Date(
                    farmer.created_at
                  ).toLocaleDateString()
                : ""
            }
            disabled
          />

          {!editMode ? (
            <button
              className="edit-btn"
              onClick={() =>
                setEditMode(true)
              }
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="save-btn"
              onClick={updateProfile}
            >
              Save Changes
            </button>
          )}
        </div>

        {/* EMAIL CHANGE */}

        <div className="security-section">
          <h3>Change Email</h3>

          <input
            type="email"
            placeholder="Enter New Email"
            value={newEmail}
            onChange={(e) =>
              setNewEmail(e.target.value)
            }
          />

          <button
            className="security-btn"
            onClick={sendEmailOTP}
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={emailOtp}
            onChange={(e) =>
              setEmailOtp(e.target.value)
            }
          />

          <button
            className="security-btn"
            onClick={verifyEmailOTP}
          >
            Verify & Change Email
          </button>
        </div>

        {/* PASSWORD CHANGE */}

        <div className="security-section">
          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <button
            className="security-btn"
            onClick={sendPasswordOTP}
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={passwordOtp}
            onChange={(e) =>
              setPasswordOtp(e.target.value)
            }
          />

          <button
            className="security-btn"
            onClick={verifyPasswordOTP}
          >
            Verify & Change Password
          </button>
        </div>

      </div>
    </div>
  );
}

export default FarmerProfile;