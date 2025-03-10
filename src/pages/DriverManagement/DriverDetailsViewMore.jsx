import React, { useState } from "react";
import './DriverDetailsViewMore.css'
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import VehicleRegistration from "../../Assets/SidebarDropdownIcons/Vehicle_Registration.png";
import Insurance from "../../Assets/SidebarDropdownIcons/Insurance.png";
import CarImage from "../../Assets/SidebarDropdownIcons/Car_Image.png";

const DriverDetailsViewMore = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedDocument, setSelectedDocument] = useState("Vehicle Registration Book (Front)");
  const [activeTab, setActiveTab] = useState("car-details");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "driver-trips") {
      navigate("/drivers/trips");
    }
  };

  const documents = {
    "Vehicle Registration Book (Front)": {
      image: VehicleRegistration,
      label: "Vehicle Registration Book (Front)",
    },
    "Insurance (if any)": {
      image: Insurance,
      label: "Insurance (if any)",
    },
  };

  const updatedData = location.state?.updatedData || {
    name: "Toyota Yaris",
    rating: 3.8,
    reviews: 16,
    licenceId: "BET-123",
    carType: "Sedan",
    seat: "4",
    fuelType : 'Petrol',
    transmission: "Automatic",
  };

  return (
    <div className="driverdetails-container">
      <div className="driverdetails-content">
        <main className="driverdetails-main">
          <div className="header-container">
            <h3>Drivers Details / View More</h3>
            <div className="tabs-container" style={{ display: "flex" }}>
      <button
        className={`tab-button ${activeTab === "car-details" ? "active" : ""}`}
        onClick={() => handleTabClick("car-details")}
      >
        Car Details
      </button>
      <button
        className={`tab-button ${activeTab === "driver-trips" ? "active" : ""}`}
        onClick={() => handleTabClick("driver-trips")}
      >
        Driver Trips
      </button>
    </div>
          </div>
          <div className="driverdetails-card">
            <div className="user-pic-text">
              <img src={CarImage} alt="Car" className="car-pic" />
              <div className="driver-info">
                <p className="driver-name">{updatedData.name}</p>
                  <div className="driver-details-row">
              <div>
                <p>License Plate No:</p>
                <p>
                  <strong>{updatedData.licenceId}</strong>
                </p>
              </div>
              <div>
                <p>Car Type:</p>
                <p>
                  <strong>{updatedData.carType}</strong>
                </p>
              </div>
              <div>
                <p>Seat:</p>
                <p>
                  <strong>{updatedData.seat}</strong>
                </p>
              </div>
              <div>
                <p>Fuel Type:</p>
                <p>
                  <strong>{updatedData.fuelType}</strong>
                </p>
              </div>
              <div>
                <p>Transmission:</p>
                <p>
                  <strong>{updatedData.transmission}</strong>
                </p>
              </div>
            </div>
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
                <p>{documents[selectedDocument].label}</p>
                <img
                  src={documents[selectedDocument].image}
                  alt={selectedDocument}
                  className="document-image"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverDetailsViewMore;
