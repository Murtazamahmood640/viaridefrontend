import React, { useState } from "react";
import "./Bookings.css";
import search from "../../../src/Assets/DispatchIcons/search.png";
import dropdown from "../../../src/Assets/DispatchIcons/expand-arrow.png";
import pickup from "../../../src/Assets/DispatchIcons/uncheck-rb.png";
import dropoff from "../../../src/Assets/DispatchIcons/loc-pic.png";
import GoogleMapReact from "google-map-react";

const TrackingBookings = () => {
  const defaultCenter = {
    lat: 24.8607,
    lng: 67.0011,
  };
  const defaultZoom = 14;

  const Marker = ({ text, icon }) => (
    <div className="marker-container">
      <img src={icon} alt={text} className="marker-icon" />
      <p className="marker-text">{text}</p>
    </div>
  );

  // State for rides, filter, search, selected ride, and modal visibility
  const [rides] = useState([
    {
      id: "VIA#747",
      vehicle: "Sedan",
      pickup: "Plot No 364 - DHA Phase 2 - Karachi",
      dropoff: "New University - Clifton - Karachi",
      status: "Active Trip",
    },
    {
      id: "VIA#234",
      vehicle: "MPV",
      pickup: "Plot No 364 - DHA Phase 2 - Karachi",
      dropoff: "New University - Clifton - Karachi",
      status: "Active Trip",
    },
    {
      id: "VIA#623",
      vehicle: "SEDAN",
      pickup: "Plot No 364 - DHA Phase 2 - Karachi",
      dropoff: "New University - Clifton - Karachi",
      status: "Active Trip",
    },
    {
      id: "VIA#123",
      vehicle: "MPV",
      pickup: "Plot No 364 - DHA Phase 2 - Karachi",
      dropoff: "New University - Clifton - Karachi",
      status: "Active Trip",
    },
    {
      id: "VIA#987",
      vehicle: "SUV",
      pickup: "Plot No 364 - DHA Phase 2 - Karachi",
      dropoff: "New University - Clifton - Karachi",
      status: "Not Active Trip",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [activeTab, setActiveTab] = useState("Trip Details");

  // Filter and search logic
  const filteredRides = rides.filter((ride) => {
    const matchesStatus =
      filterStatus === "All" || ride.status === filterStatus;
    const matchesSearch =
      ride.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="upcoming-screen">
      <div className="upcoming-rides-header">
        <h3 className="upcoming-rides-title">Tracking Bookings</h3>
      </div>

      <div className="main-content-container">
        <div className="upcoming-rides-container">
          {/* Filter and Search */}
          <div className="dis-filter-container">
            <div className="dissearch-box dis-common-box">
              <img src={search} alt="Search" className="dissearch-icon" />
              <input
                type="text"
                placeholder="Search"
                className="dissearch-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="dis-status-dropdown dis-common-box">
              <select
                className="dis-status-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">Status</option>
                <option value="Not Active Trip">🔴 Not Active Trip</option>
                <option value="Active Trip">🟢 Active Trip</option>
              </select>
            </div>
          </div>

          {filteredRides.map((ride, index) => (
            <div
              key={index}
              className={`ride-card ${
                selectedRide === ride.id ? "selected-card" : ""
              }`}
              onClick={() => {
                setSelectedRide(ride.id);
                setActiveTab("Trip Details"); // Reset the tab to Trip Details when a ride is selected
              }}
            >
              <div className="ride-card-top">
                <h4 className="ride-id">{ride.id}</h4>
                <div className="ride-status">
                  <p className="ride-status-text">{ride.status}</p>
                </div>
              </div>
              <p className="ride-vehicle">{ride.vehicle}</p>

              <div className="ride-location-container">
                <div className="pickup-section">
                  <img src={pickup} alt="Pickup" className="icon" />
                  <p className="location-text"> {ride.pickup}</p>
                </div>
                <div className="vertical-line"></div>
                <div className="dropoff-section">
                  <img src={dropoff} alt="Drop-off" className="icon" />
                  <p className="location-text"> {ride.dropoff}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="map-container">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDQDUyn3laOLwAZJCwKtxuOnBlQY_5QXi4",
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
          >
            <Marker
              lat={24.8607}
              lng={67.0011}
              text="Pickup"
              icon="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            />
            <Marker
              lat={24.8652}
              lng={67.0085}
              text="Dropoff"
              icon="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            />
          </GoogleMapReact>

          {/* Tab Container */}
          {selectedRide && (
            <div className="tab-container">
              {/* Tab Headings */}
              <div className="tab-headings">
                {["Trip Details", "Driver Info", "Passenger", "Vehicle Details", "Payment Details"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-heading ${activeTab === tab ? "active-tab" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="tab-content">
                {activeTab === "Trip Details" && selectedRide && (
                  <div className="trip-details">
                    <p>Trip ID: {selectedRide}</p>
                    <p>Booking Category: Economy</p>
                    <p>Ride Now: Yes</p>
                    <p>Booking Date and Time: 2024-12-27 10:00 AM</p>
                    <p>Kilometers: 15 km</p>
                    <p>
                      Pickup Location: {rides.find((r) => r.id === selectedRide)?.pickup}
                    </p>
                    <p>
                      Drop-off Location: {rides.find((r) => r.id === selectedRide)?.dropoff}
                    </p>
                  </div>
                )}

                {activeTab === "Driver Info" && selectedRide && (
                  <div className="driver-info">
                    <div className="driver-profile">
                      <img
                        src="https://randomuser.me/api/portraits/men/10.jpg" // Placeholder image
                        alt="Driver"
                        className="profile-pic"
                      />
                      <p>John Doe</p>
                      <p>Driver</p>
                    </div>
                    <div className="driver-details">
                      <p>Driver ID: DRV#52</p>
                      <p>Phone Number: +923182551874</p>
                      <p>Email: ahkhan@gmail.com</p>
                      <p>Ratings: ⭐⭐⭐⭐☆</p>
                      <p>Trips: 20</p>
                    </div>
                  </div>
                )}

                {activeTab === "Passenger" && selectedRide && (
                  <div className="passenger-info">
                    <div className="passenger-profile">
                      <img
                        src="https://randomuser.me/api/portraits/women/10.jpg" // Placeholder image
                        alt="Passenger"
                        className="profile-pic"
                      />
                      <p>Jane Doe</p>
                      <p>Passenger</p>
                    </div>
                    <div className="passenger-details">
                      <p>Passenger ID: PAX#52</p>
                      <p>Phone Number: +923184552345</p>
                      <p>Email: janedoe@gmail.com</p>
                      <p>Ratings: ⭐⭐⭐⭐⭐</p>
                      <p>Trips: 5</p>
                    </div>
                  </div>
                )}

                {activeTab === "Vehicle Details" && selectedRide && (
                  <div className="vehicle-details">
                    <p>Car Name: HONDA Civic 2023 BRX - 353</p>
                    <p>Vehicle ID: VEH#236</p>
                    <p>Car Type: SEDAN</p>
                    <p>Seats: 4</p>
                    <p>Fuel Type: Petrol</p>
                    <p>Engine: 1800cc</p>
                    <p>Mileage: 10,000KM</p>
                    <p>Transmission: Automatic</p>
                  </div>
                )}

                {activeTab === "Payment Details" && selectedRide && (
                  <div className="payment-details">
                    <p>Transaction ID: TRS#10034</p>
                    <p>Payment Type: Cash</p>
                    <p>Expected Fare: PKR 550</p>
                    <p>Discount: PKR 100</p>
                    <p>Total Fare: PKR 450</p>
                    <p>Payment Status: Not Received</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingBookings;
