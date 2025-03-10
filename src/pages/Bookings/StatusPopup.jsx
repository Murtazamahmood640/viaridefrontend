import React from "react";
import "./Bookings.css";
import UserPic from "../../Assets/Logo/profile.jpg";

function BookingDetailsPopup({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      {/* Prevent closing if user clicks inside */}
      <div className="booking-popup" onClick={(e) => e.stopPropagation()}>
        
        {/* Top bar */}
        <div className="popup-header">
          <span className="status-pill">Status: {booking.status}</span>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        <hr className="separator" />
        <h4 className="section-heading">Passenger Details</h4>
        <div className="detail-grid-3col">
          <div className="detail-subheading">Passenger</div>
          <div className="detail-subheading">Booking For</div>
          <div className="detail-subheading">Booking Date</div>
        </div>
        <div className="detail-grid-3col">
          <div className="detail-value with-avatar">
          <img src={UserPic} alt="User Upload" className="mini-pic" />
            <span>{booking.passengerName}</span>
          </div>
          <div className="detail-value">{booking.bookingFor}</div>
          <div className="detail-value">{booking.bookingDate}</div>
        </div>

        <hr className="separator" />
        <h4 className="section-heading">Driver & Vehicle Details</h4>
        <div className="detail-grid-3col">
          <div className="detail-subheading">Driver</div>
          <div className="detail-subheading">Vehicle Type</div>
          <div className="detail-subheading">Vehicle Number</div>
        </div>
        <div className="detail-grid-3col">
          <div className="detail-value with-avatar">
          <img src={UserPic} alt="User Upload" className="mini-pic" />
            <span>{booking.driver}</span>
          </div>
          <div className="detail-value">{booking.vehicleType}</div>
          <div className="detail-value">{booking.vehicleNumber}</div>
        </div>

        <hr className="separator" />
        <h4 className="section-heading">Booking Details</h4>
        <div className="detail-grid-3col">
          <div className="detail-subheading">Booking Category</div>
          <div className="detail-subheading">Ride Now?</div>
          <div className="detail-subheading">Pre-Booking For</div>
        </div>
        <div className="detail-grid-3col">
          <div className="detail-value">From Passenger</div>
          <div className="detail-value">{booking.rideNow ? "Yes" : "No"}</div>
          <div className="detail-value">{booking.preBookingFor}</div>
        </div>
        <div className="detail-grid-2col">
          <div>
            <div className="detail-subheading">Pick Up</div>
            <div className="detail-value">{booking.pickUp}</div>
          </div>
          <div>
            <div className="detail-subheading">Drop Off</div>
            <div className="detail-value">{booking.dropOff}</div>
          </div>
        </div>

        <hr className="separator" />
        <h4 className="section-heading">Payment Details</h4>
        <div className="detail-grid-2col">
          <div>
            <div className="detail-subheading">Payment Type</div>
            <div className="detail-value">{booking.paymentType}</div>
          </div>
          <div>
            <div className="detail-subheading">Fare</div>
            <div className="detail-value">{booking.fare}</div>
          </div>
        </div>

        <div className="ok-btn-container">
          <button className="ok-btn" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsPopup;
