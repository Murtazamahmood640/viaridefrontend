import React from "react";
import "./TripDetails.css"; // Ensure you import the CSS file
import UserImage from "../../Assets/SidebarDropdownIcons/Image_User.png";
import CostumerImage from "../../Assets/SidebarDropdownIcons/costumer_image.png";
import Download from "../../Assets/SidebarDropdownIcons/download.png";
import CarImage from "../../Assets/SidebarDropdownIcons/Car_Image.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Location from '../../Assets/SidebarDropdownIcons/location.png'
import Navigation from '../../Assets/SidebarDropdownIcons/navigation.png'
import Route from '../../Assets/SidebarDropdownIcons/route.png'
import { useNavigate } from "react-router-dom";



const TripDetails = () => {
  const navigate = useNavigate();

  const handleInvoiceDownload = () => {
    navigate("/invoice/generated");
  };
  return (
    <div className="tripdetail-main-container">
      <div className="main-heading">
        <h2>Trip #100032</h2>
      </div>
      <div className="tripdetail-content">
        <div className="tripdetail-right-container">
          <div className="row">
            <div className="box-driver-details-box">
              <h4>Trip Details</h4>
              <div className="driver-details-content">
                <img className="user-image" src={UserImage} alt="user_image" />
                <div className="driver-info-detail">
                  <p>Test Driver</p>
                  <p>Level 1</p>
                  <p>+8**********</p>
                  <p>t**********@driver.com</p>
                </div>
              </div>
            </div>
            <div className="box-driver-details-box">
              <h4>Customer Details</h4>
              <div className="driver-details-content">
                <img
                  className="user-image"
                  src={CostumerImage}
                  alt="customer_image"
                />
                <div className="driver-info-detail">
                  <p>Muhammad Ali</p>
                  <p>New User</p>
                  <p>+8**********</p>
                  <p>c***************@customer.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="box-invoice-detail-box">
          <div className="invoice-actions">
              <img src={Download} alt="download" className="download-icon" />
              <span
                className="action-text"
                onClick={handleInvoiceDownload}>
                Invoice Download
              </span>
            </div>

            <div className="invoice-content">
              <div className="invoice-content-left">
                <img className="car-image" src={CarImage} alt="car_image" />
                <div className="invoice-info">
                  <p>
                    <strong>Trip #100032</strong>
                  </p>
                  <p>26 September 2024, 04:17 pm</p>
                  <p>
                    <strong>Total PKR 666.44</strong>
                  </p>
                </div>
              </div>

              <div className="invoice-content-right">
                <div className="status-row">
                  <p>
                    <strong>Order Status:</strong>
                  </p>
                  <p className="status-text">Completed</p>
                </div>
                <div className="status-row">
                  <p>
                    <strong>Payment Status:</strong>
                  </p>
                  <p className="status-text">Paid</p>
                </div>
                <div className="status-row">
                  <p>
                    <strong>Trip Type:</strong>
                  </p>
                  <p className="status-text">Ride</p>
                </div>
              </div>
            </div>

            <div className="trip-summary-container">
              <div className="trip-summary">
                <h3 className="summary-title">Trip Summary</h3>
                <h3 className="pricing-title">Pricing</h3>
              </div>
              <div className="separator-line"></div>

              <div className="trip-summary-content">
              <div className="summary-row">
                  <p className="summary-text">Trip Amount</p>
                  <p className="pricing-text">PKR 1,731.00</p>
                </div>
                <div className="summary-row">
                  <p className="summary-text">Discount Amount</p>
                  <p className="pricing-text">-PKR 865.50</p>
                </div>
                <div className="summary-row">
                  <p className="summary-text">Coupon Discount</p>
                  <p className="pricing-text">-PKR 259.65</p>
                </div>
                <div className="summary-row">
                  <p className="summary-text">VAT/Tax (10%)</p>
                  <p className="pricing-text">+ PKR 60.59</p>
                </div>
                <div className="summary-row">
                  <p className="summary-text"><strong>Total</strong></p>
                  <p className="pricing-text"><strong>PKR 666.44</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="tripdetail-left-container">
      <div className="box">
        <h4>Trip Status</h4>
        <div className="tripdetail-dropdown">
          <div className="dropdown-container">
            <label htmlFor="trip-status">Trip Status</label>
            <select id="trip-status" className="dropdown">
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div className="dropdown-container">
            <label htmlFor="payment-status">Payment Status</label>
            <select id="payment-status" className="dropdown">
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Live Map */}
        <div className="live-map-trip">
          <MapContainer
            center={[24.8607, 67.0011]} // Karachi Coordinates
            zoom={12}
            style={{ height: "255px", width: "80%", borderRadius: "8px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[24.8607, 67.0011]}>
              <Popup>
                Karachi <br /> Central Location.
              </Popup>
            </Marker>
          </MapContainer>
        </div>


        <div className="trip-detail-address">
  <div className="address-row">
    <img src={Location} alt="location.png" />
    <p>4/1001 KDA Rote , Shah fasal Colony Block 4 Karachi</p>
  </div>
  <div className="address-row">
    <img src={Navigation} alt="Navigation.png" />
    <p>Malir Cantonment, Karachi, City, Sindh</p>
  </div>
  <div className="address-row">
    <img src={Route} alt="Route.png" />
    <p>Total Distance - 16.31 Km</p>
  </div>
</div>

      </div>
    </div>
      </div>
    </div>
  );
};

export default TripDetails;
