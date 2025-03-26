import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OTP.css";

const OTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP input state
  const [email, setEmail] = useState(""); // Email state
  const [resendDisabled, setResendDisabled] = useState(false); // Resend OTP button state
  const navigate = useNavigate();

  // Fetch email from localStorage when the component loads
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
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Handle OTP input on paste (allow pasting full OTP)
  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData("Text").slice(0, 6); // Get pasted OTP and limit it to 6 characters

    if (pastedOtp.length === otp.length) {
      setOtp(pastedOtp.split("")); // Split the OTP string into an array and update state
    }
  };

  // Handle Backspace event to move to previous input field
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Focus on the previous input field if Backspace is pressed and the current field is empty
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  // Handle OTP verification
  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Combine OTP digits into a single string

    try {
      const response = await axios.post(
        "https://ridebackend.vercel.app/api/ViaRide/verify-otp",
        {
          email,
          otp: enteredOtp,
        }
      );

      if (response.status === 200) {
        // Log successful OTP verification
        await axios.post("https://ridebackend.vercel.app/api/viaRide/info", {
          level: "INFO",
          message: `OTP successfully verified for ${email}`,
          timestamp: new Date().toISOString(),
        });

        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("email", email); // Store email or any other user data if needed

        alert("OTP verified successfully!");
        navigate("/dashboard"); // Navigate to dashboard on successful OTP verification
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP! Please try again.");

      // Log the failed OTP verification attempt
      await axios.post("https://ridebackend.vercel.app/api/viaRide/error", {
        level: "ERROR",
        message: `OTP verification failed for ${email}: ${error.response?.data?.message}`,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setResendDisabled(true); // Disable the resend button temporarily

    try {
      const response = await axios.post(
        "https://ridebackend.vercel.app/api/ViaRide/resend-otp",
        {
          email,
        }
      );

      if (response.status === 200) {
        alert("New OTP sent to your email!");
        setOtp(new Array(6).fill("")); // Clear the OTP input fields

        // Log the OTP resend event
        await axios.post("https://ridebackend.vercel.app/api/viaRide/info", {
          level: "INFO",
          message: `New OTP sent to ${email}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      alert("Error resending OTP. Please try again.");

      // Log the error for resend OTP
      await axios.post("https://ridebackend.vercel.app/api/viaRide/error", {
        level: "ERROR",
        message: `Error resending OTP for ${email}: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    }

    // Re-enable resend button after 30 seconds
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000); // 30 seconds cooldown
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
            <div
              className="otp-inputs"
              onPaste={handlePaste} // Handle paste event
            >
              {otp.map((digit, index) => (
                <input
                  type="text"
                  id={`otp-input-${index}`} // Assign unique ID for each input
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => handleKeyDown(e, index)} // Handle Backspace
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
