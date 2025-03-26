import React, { useState } from "react";
import { FaMotorcycle, FaCar, FaCarSide, FaCarAlt } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { IoMdCar } from "react-icons/io";
import axios from "axios";


import "./PriceModel.css";

const PriceModel = () => {
  const [showNewVehicleModal, setShowNewVehicleModal] = useState(false);
  const [showNewKmRangeModal, setShowNewKmRangeModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // To track the active modal
  const [email, setEmail] = useState("");

React.useEffect(() => {
  const storedEmail = localStorage.getItem("email");
  if (storedEmail) setEmail(storedEmail);
}, []);


const handleSaveClick = async () => {
  try {
    // Log INFO: Save button clicked
    await axios.post("https://ridebackend.vercel.app/api/viaRide/info", {
      level: "INFO",
      message: `Price model configuration saved by ${email}.`,
      timestamp: new Date().toISOString(),
    });

    // You can put any real save logic here in future
    alert("Price model saved and logged successfully.");
  } catch (error) {
    console.error("Error logging save action:", error);

    // Log ERROR
    await axios.post("https://ridebackend.vercel.app/api/viaRide/error", {
      level: "ERROR",
      message: `Failed to log price model save action by ${email}: ${
        error.response?.data?.message || error.message
      }`,
      timestamp: new Date().toISOString(),
    });

    alert("Failed to log save action.");
  }
};


  const openNewVehicleModal = () => {
    setActiveModal("newVehicle");
  };

  const closeNewVehicleModal = () => {
    if (activeModal === "newVehicle") {
      setActiveModal(null);
    }
    setSelectedFile(null);
  };

  const openNewKmRangeModal = () => {
    setActiveModal("newKmRange");
  };

  const closeNewKmRangeModal = () => {
    if (activeModal === "newKmRange") {
      setActiveModal(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = () => {
    setActiveModal(null);
    window.location.reload();
  };

  const handleKmRangeSubmit = () => {
    setActiveModal(null);
    window.location.reload();
  };

  return (
    <div className="priceModel">
      <div className="priceModelHeader">
        <h3>Rides Price Model</h3>
        <div className="priceModelHeaderButtons">
          <button className="newVehicleButton" onClick={openNewVehicleModal}>
            New Vehicle Category
          </button>
          
          <button className="saveButton" onClick={handleSaveClick}>Save</button>

        </div>
      </div>

      <div className="vehicleCategories">
        <h4>Vehicle Categories</h4>
        <div className="vehicleCardsWrapper">
          <div className="vehicleCard">
            <button className="vehicleCircleButton">
              <FaMotorcycle className="vehicleIcon" />
            </button>
            <div className="vehicleName">Bike</div>
            <div className="vehicleSeats">(1 seat)</div>
            <button className="removeButton">Remove</button>
          </div>

          <div className="vehicleCard">
            <button className="vehicleCircleButton">
              <IoMdCar className="vehicleIcon" />
            </button>
            <div className="vehicleName">Car</div>
            <div className="vehicleSeats">(4 seats)</div>
            <button className="removeButton">Remove</button>
          </div>

          <div className="vehicleCard">
            <button className="vehicleCircleButton">
              <FaCarAlt className="vehicleIcon" />
            </button>
            <div className="vehicleName">Car X</div>
            <div className="vehicleSeats">(4 seats)</div>
            <button className="removeButton">Remove</button>
          </div>

          <div className="vehicleCard">
            <button className="vehicleCircleButton">
              <IoCarSportSharp className="vehicleIcon" />
            </button>
            <div className="vehicleName">Premium</div>
            <div className="vehicleSeats">(6 seats)</div>
            <button className="removeButton">Remove</button>
          </div>
        </div>
      </div>

      <div className="pricingDetails">
        <div className="baseFare">
          <h4>Base Fare </h4>
          <div className="inputGroup">
            <span className="rangeColon">:</span>
            <input type="number" placeholder="80" />
            <input type="number" placeholder="250" />
            <input type="number" placeholder="450" />
            <input type="number" placeholder="750" />
          </div>
        </div>

        <div className="kmRange">
          <h4>Kilometer Range</h4>
          <div className="kmLines">
            <div className="kmLine">
              <span className="rangeNum">0</span>
              <span className="rangeText">to</span>
              <span className="rangeNum">10</span>
              <span className="rangeColon">:</span>
              <input type="number" placeholder="2" />
              <input type="number" placeholder="2" />
              <input type="number" placeholder="2" />
              <input type="number" placeholder="2" />
            </div>
            <div className="kmLine">
              <span className="rangeNum">10</span>
              <span className="rangeText">to</span>
              <span className="rangeNum">20</span>
              <span className="rangeColon">:</span>
              <input type="number" placeholder="5" />
              <input type="number" placeholder="5" />
              <input type="number" placeholder="5" />
              <input type="number" placeholder="5" />
            </div>
          </div>
        </div>

        <div className="addKmRange">
          <button className="addKmRangeButton" onClick={openNewKmRangeModal}>
            Add New KM Range
          </button>
        </div>

        <div className="extraDetails">
          <h4>Extra Details</h4>
          <div className="extraLines">
            <div className="extraLine">
              <span className="extraLabel">Extra Fare</span>
              <span className="rangeColon">:</span>
              <input type="number" placeholder="50" />
              <input type="number" placeholder="50" />
              <input type="number" placeholder="50" />
              <input type="number" placeholder="50" />
            </div>
            <div className="extraLine">
              <span className="extraLabel">Peak Hour</span>
              <span className="rangeColon">:</span>
              <input type="number" placeholder="5%" />
              <input type="number" placeholder="5%" />
              <input type="number" placeholder="5%" />
              <input type="number" placeholder="5%" />
            </div>
          </div>
        </div>
      </div>

      {/* New Vehicle Modal */}
      {activeModal === "newVehicle" && (
        <div className="modalOverlay">
          <div className="modalContent">
            <div className="modalHeader">
              <h4>New Vehicle Category</h4>
              <button className="closeButton" onClick={closeNewVehicleModal}>
                X
              </button>
            </div>
            <hr />
            <div className="modalBody">
              <h5>Vehicle Image</h5>
              <div
                className="modalImageUploadBox"
                onClick={handleImageUploadClick}
              >
                <div className="uploadIcon">📷+</div>
                {selectedFile && <span>{selectedFile.name}</span>}
              </div>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />

              <label className="modalFieldLabel">Vehicle Type</label>
              <input
                type="text"
                className="modalInput"
                placeholder="Enter vehicle type"
              />

              <label className="modalFieldLabel">Seats</label>
              <select className="modalSelect">
                <option>2 Seats</option>
                <option>4 Seats</option>
                <option>6 Seats</option>
              </select>
            </div>
            <div className="modalFooter">
              <button className="modalButton" onClick={handleSubmit}>
                Submit
              </button>
              <button
                className="modalButton cancel"
                onClick={closeNewVehicleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New KM Range Modal */}
      {activeModal === "newKmRange" && (
        <div className="modalOverlay">
          <div className="modalContent">
            <div className="modalHeader">
              <h4>Add New KM Range</h4>
              <button className="closeButton" onClick={closeNewKmRangeModal}>
                X
              </button>
            </div>
            <hr />
            <div className="modalBody">
              <div className="modalInputGroup">
                <label>Start KM</label>
                <input
                  type="number"
                  className="modalInput"
                  placeholder="Enter start KM"
                />
              </div>
              <div className="modalInputGroup">
                <label>End KM</label>
                <input
                  type="number"
                  className="modalInput"
                  placeholder="Enter end KM"
                />
              </div>
            </div>
            <div className="modalFooter">
              <button className="modalButton" onClick={handleKmRangeSubmit}>
                Submit
              </button>
              <button
                className="modalButton cancel"
                onClick={closeNewKmRangeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceModel;
