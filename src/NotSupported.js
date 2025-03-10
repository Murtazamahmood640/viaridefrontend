import React from "react";

const NotSupported = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f8f8",
        color: "#333",
        
      }}
    >
      <h1>App Not Supported on Mobile</h1>
      <p>
        This application is designed for desktop devices. Please use a device
        with a larger screen to access the app.
      </p>
    </div>
  );
};

export default NotSupported;
