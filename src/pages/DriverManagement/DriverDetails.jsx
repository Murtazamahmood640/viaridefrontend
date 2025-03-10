import React, { useState } from "react";
import "./DriverDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserPic from "../../Assets/SidebarDropdownIcons/user.png";
import BankAccount from "../../Assets/SidebarDropdownIcons/bank_account.png";
import DriverLicense from "../../Assets/SidebarDropdownIcons/driver_license.png";
import CNIC from "../../Assets/SidebarDropdownIcons/cnic_card.png";

const DriverDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState("Bank Account Details");
  const [bank, setBank] = useState('');
  const [accountNum, setAccountNum] = useState('');

  const documents = {
    "Bank Account Details": {
      label: "Bank Account Details",
      bank: "Bank Al Habib",
      accountNum: "1234-5678-9101-1123",
    },
    "Profile Picture": {
      image: UserPic,
      label: "Profile Picture",
    },
    "Driver License": {
      image: DriverLicense,
      label: "Driver License",
    },
    "CNIC Card": {
      image: CNIC,
      label: "CNIC Card",
    },
  };

  const updatedData = location.state?.updatedData || {
    name: "John Ray",
    rating: 3.8,
    reviews: 16,
    driverId: "DVR001",
    mobile: "+923124563389",
    email: "john@gmail.com",
    city: "Karachi, Pakistan",
    registerDate: "7 Nov 2024 at 8:08:54",
  };

  return (
    <div className="driverdetails-container">
      <div className="driverdetails-content">
        <main className="driverdetails-main">
          <div className="header-container">
            <h3>Driver's Details</h3>
            <button
              className="view-more-btn"
              onClick={() => navigate("/drivermanagement/viewmore")}
            >
              View More
            </button>
          </div>
          <div className="driverdetails-card">
            <div className="user-pic-text">
              <img src={UserPic} alt="User" className="user-pic" />
              <div className="driverinfo">
                <p className="driver-name">{updatedData.name}</p>
                <p className="driver-reviews">
                  {updatedData.rating} ⭐ {updatedData.reviews} Reviews
                </p>
              </div>
            </div>
            <button className="online-btn">Online</button>
            <div className="driver-details-row">
              <div>
                <p>Driver ID:</p>
                <p><strong>{updatedData.driverId}</strong></p>
              </div>
              <div>
                <p>Mobile Number:</p>
                <p><strong>{updatedData.mobile}</strong></p>
              </div>
              <div>
                <p>Email ID:</p>
                <p><strong>{updatedData.email}</strong></p>
              </div>
              <div>
                <p>City Drive in:</p>
                <p><strong>{updatedData.city}</strong></p>
              </div>
              <div>
                <p>Register Date:</p>
                <p><strong>{updatedData.registerDate}</strong></p>
              </div>
            </div>
            <div className="documents-section">
              <h3 className="documents-heading">Documents Details</h3>
              <div className="separator-line"></div>
            </div>
            <div className="document-box">
              <div className="document-sidebar">
                {Object.keys(documents).map((doc) => (
                  <div
                    key={doc}
                    className={`document-item ${
                      selectedDocument === doc ? "active" : ""
                    }`}
                    onClick={() => setSelectedDocument(doc)}
                  >
                    {doc}
                  </div>
                ))}
              </div>
              <div className="document-content">
                {selectedDocument === "Bank Account Details" ? (
                  <div>
                    <p style={{fontSize:22, color:"black" }}>{documents[selectedDocument].label}</p>
                    <p style={{fontSize:16, color:"#333131" }}>Bank: {documents[selectedDocument].bank}</p>
                    <p style={{fontSize:16, color:"#333131" }}>Account Number: {documents[selectedDocument].accountNum}</p>
                  </div>
                ) : (
                  <div>
                    <p style={{fontSize:22, color:"black" }}>{documents[selectedDocument].label}</p>
                    <img
                      src={documents[selectedDocument].image}
                      alt={selectedDocument}
                      className="document-image"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverDetails;
