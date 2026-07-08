import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function CustomerProfile() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    created_at: "",
  });

  // Email Change
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  // Password Change
  const [newPassword, setNewPassword] = useState("");
  const [passwordOtp, setPasswordOtp] = useState("");

  const API = "http://localhost:5000/api/profile";

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================
  // FETCH PROFILE
  // ==========================
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${API}/customer`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data && res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // UPDATE PROFILE
  // ==========================
  const updateProfile = async () => {
    try {
      const res = await axios.put(
        `${API}/customer`,
        {
          name: user.name,
          phone: user.phone,
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
      alert("Enter New Email");
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

      setPasswordOtp("");
      setNewPassword("");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Password Change Failed"
      );
    }
  };

  // ==========================
  // LOADING
  // ==========================
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
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Customer"
          />

          <h2>Customer Profile</h2>
        </div>

        <div className="profile-body">

          <label>Customer ID</label>
          <input
            value={user?.id || ""}
            disabled
          />

          <label>Full Name</label>
          <input
            name="name"
            value={user?.name || ""}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            value={user?.email || ""}
            disabled
          />

          <label>Phone</label>
          <input
            name="phone"
            value={user?.phone || ""}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Joined On</label>
          <input
            value={
              user?.created_at
                ? new Date(
                    user.created_at
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

        {/* CHANGE EMAIL */}

        <div className="security-section">
          <h3>Change Email</h3>

          <input
            type="email"
            placeholder="New Email"
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

        {/* CHANGE PASSWORD */}

        <div className="security-section">
          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="New Password"
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

export default CustomerProfile;