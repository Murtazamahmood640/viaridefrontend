import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OTP.css";

const OTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const navigate = useNavigate();

  // Fetch email from localStorage when component loads
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      alert("No email found! Redirecting...");
      navigate("/login"); // Redirect to login if no email found
    }
  }, [navigate]);

  // Handle OTP input changes
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const otpArray = [...otp];
    otpArray[index] = element.value;
    setOtp(otpArray);

    // Move to the next input if not empty
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP verification
  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Combine OTP digits

    try {
      const response = await axios.post(
        "http://localhost:4000/api/ViaRide/verify-otp",
        {
          email,
          otp: enteredOtp,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("email", email);  // Store email or any other user data if needed

        alert("OTP verified successfully!");
        navigate("/dashboard"); // Navigate on successful OTP verification
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP! Please try again.");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setResendDisabled(true); // Disable the resend button temporarily

    try {
      const response = await axios.post(
        "http://localhost:4000/api/ViaRide/resend-otp",
        {
          email,
        }
      );

      if (response.status === 200) {
        alert("New OTP sent to your email!");
      }
    } catch (error) {
      alert("Error resending OTP. Please try again.");
    }

    // Re-enable resend button after 30 seconds
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000);
  };

  return (
    <div className="otp-page">
      <div className="otp-content">
        <div className="otp-card">
          <h2>Verify your email address</h2>
          <p>Please verify your email address</p>
          <p>
            <strong>{email}</strong>
          </p>
          <form onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  required
                />
              ))}
            </div>
            <p className="resend-link">
              Didn’t receive the code?{" "}
              <a
                href="#resend"
                onClick={handleResendOtp}
                disabled={resendDisabled}
              >
                Resend code
              </a>
            </p>
            <button type="submit" className="otp-button">
              VERIFY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
