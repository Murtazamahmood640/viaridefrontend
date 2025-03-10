import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Unauthorized.css'; // Add styling if needed

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); // Redirect to the login page or any other page you'd like
  };

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-message">
        <h1>403 - Unauthorized Access</h1>
        <p>You do not have permission to view this page.</p>
        <button onClick={handleRedirect} className="btn-go-back">
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
