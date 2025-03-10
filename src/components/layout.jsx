import React from "react";
import "./layout.css"; // Ensure consistent styles

const Layout = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
