import React, { useState, useRef } from "react";
import "./SecurityScreen.css";
import {Link} from 'react-router-dom';
import { FaLanguage, FaPaintBrush, FaShieldAlt } from "react-icons/fa"; // Importing icons
import axios from "axios";


const SecurityScreen = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State for OTP inputs
  const inputs = useRef([]); // References for each OTP input
  const [email, setEmail] = useState("");

React.useEffect(() => {
  const storedEmail = localStorage.getItem("email");
  if (storedEmail) setEmail(storedEmail);
}, []);


const handleLogoutClick = async () => {
  try {
    await axios.post("http://localhost:4000/api/viaRide/info", {
      level: "INFO",
      message: `Logout confirmation modal opened by ${email}.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    await axios.post("http://localhost:4000/api/viaRide/error", {
      level: "ERROR",
      message: `Error logging logout modal open action by ${email}: ${
        error.response?.data?.message || error.message
      }`,
      timestamp: new Date().toISOString(),
    });
  } finally {
    setIsLogoutModalOpen(true); 
  }
};


  const handleConfirmLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/viaRide/info", {
        level: "INFO",
        message: `Global logout initiated by ${email}. All users will be required to re-login.`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      await axios.post("http://localhost:4000/api/viaRide/error", {
        level: "ERROR",
        message: `Failed to log global logout action by ${email}: ${
          error.response?.data?.message || error.message
        }`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLogoutModalOpen(false);
      setIsVerifyModalOpen(true);
    }
  };
  

  const handleCloseModals = () => {
    setIsLogoutModalOpen(false);
    setIsVerifyModalOpen(false);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; 
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = ""; 
      setOtp(updatedOtp);

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="security-container">
        <h1>System Settings</h1>
            <nav className="appearance-tabs">
            <Link to="/Settings/Language">
                <button>Language</button>
                </Link>
             
                <button className="active">Security</button>

            </nav>
      <header className="security-header">
        <h2>Security Setting</h2>
      </header>

      <div className="security-alert-container">
        <div className="security-alert-box">
          <span className="security-alert-message">
            <strong>You have successfully logged out everyone</strong>
            <p>Since now, everyone will need to log in again to their account.</p>
          </span>
          <button className="security-alert-close">&times;</button>
        </div>
      </div>

      <div className="security-section">
        <div className="security-setting-item">
          <div className="security-setting-description">
            <h4>Enforce two-step verification</h4>
            <p>Require a security key or code in addition to password</p>
          </div>
          <div className="security-toggle-switch">
            <input type="checkbox" id="toggleTwoStep" />
            <label htmlFor="toggleTwoStep"></label>
          </div> 
        </div>

        <div className="security-setting-item">
          <div className="security-setting-description">
            <h4>Logout everyone</h4>
            <p>This will require everyone to log in into the system</p>
          </div>
          <button className="security-logout-button" onClick={handleLogoutClick}>
            Logout everyone
          </button>
        </div>
      </div>

      <div className="security-sessions-section">
        <h4>Current sessions</h4>
        <p>These devices are currently signed in to people's accounts.</p>

        <div className="security-filter-buttons">
          <button className="security-filter-button">All people</button>
          <button className="security-filter-button">All browsers</button>
          <button className="security-filter-button">All locations</button>
        </div>

        <table className="security-sessions-table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Browser</th>
              <th>Location</th>
              <th>Most recent activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Orlando Diggs</td>
              <td>Chrome on Mac OS X</td>
              <td>United Kingdom</td>
              <td>Current session</td>
            </tr>
            <tr>
              <td>Bruce Walker</td>
              <td>Chrome on Windows 7</td>
              <td>United States</td>
              <td>Current session</td>
            </tr>
            <tr>
              <td>George Cater</td>
              <td>Chrome on Windows 10</td>
              <td>United States</td>
              <td>Yesterday, 11:21 am</td>
            </tr>
            <tr>
              <td>Lee Fowler</td>
              <td>Chrome on Mac OS X</td>
              <td>Poland</td>
              <td>Week ago</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="security-modal-overlay">
          <div className="security-alert-modal">
            <h3>
              Alert
              <button className="security-close-icon" onClick={handleCloseModals}>
                ✖
              </button>
            </h3>
            <hr />
            <p>Are you sure you want to logout everyone?</p>
            <button className="security-confirm-button" onClick={handleConfirmLogout}>
              Yes
            </button>
          </div>
        </div>
      )}

      {/* Email Verification Modal */}
      {isVerifyModalOpen && (
        <div className="security-modal-overlay">
          <div className="security-verify-modal">
            <h3>Verify your email address</h3>
            <p>Please verify your email address:</p>
            <strong>admin@gmail.com</strong>
            <div className="security-verification-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  ref={(el) => (inputs.current[index] = el)}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "18px",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
            <button className="security-verify-button" onClick={handleCloseModals}>
              Verify
            </button>
            <p>Didn't receive the code?</p>
            <button className="security-resend-button">Resend Code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityScreen;
