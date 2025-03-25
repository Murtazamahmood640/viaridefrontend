import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Login.css";
import logo from "../../Assets/Logo/Via-Logo-004.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Log the login attempt
    console.log("Login attempt", { email, timestamp: new Date() });

    try {
      // Make a POST request to your backend API for login
      const response = await axios.post(
        "http://localhost:4000/api/ViaRide/signin",
        {
          email,
          password,
        }
      );
      console.log("Login success response:", response.data);

      // Log successful login to your logs API
      await axios.post("http://localhost:4000/api/viaRide/info", {
        level: "INFO",
        message: `User ${email} successfully logged in.`,
        timestamp: new Date().toISOString(),
      });

      // Store user data in localStorage
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("ID", response.data.id);
      localStorage.setItem("Role", response.data.role);

      // Navigate to OTP page
      navigate("/otp", { state: { email } });

    } catch (err) {
      console.error("Login error:", err);

      // Log error to your logs API
      const errorMsg = err.response?.data?.message || err.message; // Catch network or other errors
      await axios.post("http://localhost:4000/api/viaRide/error", {
        level: "ERROR",
        message: `Login failed for ${email}: ${errorMsg}`,
        timestamp: new Date().toISOString(),
      });

      // Handle error message display
      if (errorMsg === "Please Sign Up first!") {
        setError("Email not found");
      } else if (errorMsg === "Invalid Password") {
        setError("Invalid Password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-content">
        <div className="login-card">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">ID</label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
