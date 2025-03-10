import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import BookingDetailsPopup from "./StatusPopup"; 

const BookingScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Demo incidents
  const incidents = [
    {
      id: "001",
      passengerName: "Joe Beer",
      bookingDate: "15 Oct 2024 at 08:07:23",
      driver: "John Ray",
      vehicleType: "Sedan",
      fare: "PKR 560",
      status: "Booked",
      bookingFor: "Self",
      vehicleNumber: "BET-123",
      pickUp: "Melbrew Cafe, Clifton",
      dropOff: "Ocean Mall, Clifton",
      paymentType: "Cash",
      preBookingFor: "15 Oct 2023 at 08:07:23",
      rideNow: false,
    },
    {
      id: "002",
      passengerName: "Lauren Price",
      bookingDate: "12:15, Nov 3",
      driver: "David Brown",
      vehicleType: "Sedan",
      fare: "PKR 560",
      status: "Cancel",
      bookingFor: "Self",
      vehicleNumber: "ABC-789",
      pickUp: "Airport",
      dropOff: "Hotel Metro",
      paymentType: "Cash",
      preBookingFor: "N/A",
      rideNow: true,
    },
    {
      id: "003",
      passengerName: "Mark Kim",
      bookingDate: "09:45, Dec 1",
      driver: "Andrew John",
      vehicleType: "Hatchback",
      fare: "PKR 420",
      status: "Booked",
      bookingFor: "Self",
      vehicleNumber: "ABH-234",
      pickUp: "Main Boulevard, Gulberg",
      dropOff: "Liberty Market, Gulberg",
      paymentType: "Cash",
      preBookingFor: "N/A",
      rideNow: true,
    },
    {
      id: "004",
      passengerName: "Sarah Mitchell",
      bookingDate: "16:25, Dec 1",
      driver: "Rebecca Town",
      vehicleType: "SUV",
      fare: "PKR 780",
      status: "Completed",
      bookingFor: "Self",
      vehicleNumber: "SUV-984",
      pickUp: "Model Town Park",
      dropOff: "Emporium Mall",
      paymentType: "Credit Card",
      preBookingFor: "N/A",
      rideNow: true,
    },
    {
      id: "005",
      passengerName: "Abel Gaylord",
      bookingDate: "07:10, Nov 20",
      driver: "Mark Miller",
      vehicleType: "Sedan",
      fare: "PKR 560",
      status: "Cancel",
      bookingFor: "Self",
      vehicleNumber: "XYZ-456",
      pickUp: "Downtown Station",
      dropOff: "Town Square",
      paymentType: "Credit Card",
      preBookingFor: "N/A",
      rideNow: false,
    },
    {
      id: "006",
      passengerName: "Emily Davis",
      bookingDate: "13:35, Dec 2",
      driver: "Anderson Cooper",
      vehicleType: "Sedan",
      fare: "PKR 650",
      status: "Booked",
      bookingFor: "Self",
      vehicleNumber: "TTT-789",
      pickUp: "Iqbal International Airport",
      dropOff: "DHA Phase 5",
      paymentType: "Cash",
      preBookingFor: "12 Dec 2024 at 14:00:00",
      rideNow: false,
    },
    {
      id: "007",
      passengerName: "Evelyn Rose",
      bookingDate: "11:20, Dec 5",
      driver: "Joshua Pearl",
      vehicleType: "Hatchback",
      fare: "PKR 430",
      status: "Completed",
      bookingFor: "Self",
      vehicleNumber: "HBC-007",
      pickUp: "Old Anarkali",
      dropOff: "Museum Road",
      paymentType: "Cash",
      preBookingFor: "N/A",
      rideNow: true,
    },
    {
      id: "008",
      passengerName: "Tom Andrews",
      bookingDate: "19:05, Dec 7",
      driver: "Carlos Lima",
      vehicleType: "SUV",
      fare: "PKR 900",
      status: "Booked",
      bookingFor: "Self",
      vehicleNumber: "SUV-567",
      pickUp: "New City Terminal",
      dropOff: "Royal Gardens",
      paymentType: "Credit Card",
      preBookingFor: "N/A",
      rideNow: true,
    },
    {
      id: "009",
      passengerName: "Ava Johnson",
      bookingDate: "21:30, Dec 10",
      driver: "Michael Green",
      vehicleType: "Sedan",
      fare: "PKR 560",
      status: "Cancel",
      bookingFor: "Self",
      vehicleNumber: "CAR-777",
      pickUp: "Carnation Street, Gulshan",
      dropOff: "Centaurus Mall",
      paymentType: "Cash",
      preBookingFor: "N/A",
      rideNow: true,
    },
    
  ];

  const totalEntries = 50;
  const entriesPerPage = 7;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.fare.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? incident.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    let matchesDate = true;
    if (dateFilter) {
      const dateString = dateFilter.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      matchesDate = incident.bookingDate.includes(dateString);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const displayedIncidents = filteredIncidents.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDateFilter(null);
    setCurrentPage(1);
  };

  // Clicking status => open popup
  const handleStatusClick = (incident) => {
    setSelectedBooking(incident);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBooking(null);
  };

  return (
    <div className="user-management">
      <h2 className="page-title">Bookings</h2>
      <div className="filters">
        <div className="left">
          <div className="dispatcher-input-container">
            <input
              type="text"
              className="left-input"
              placeholder="Search.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="input-icon" />
          </div>

          <div className="dispatcher-select-container">
            <select
              className="left-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Booked">Booked</option>
              <option value="Cancel">Canceled</option>
              <option value="Completed">Completed</option>
            </select>
            <FaChevronDown className="select-icon" />
          </div>

          <div className="dispatcher-date-container">
            <DatePicker
              className="left-date"
              selected={dateFilter}
              onChange={(date) => setDateFilter(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Date"
            />
            <FaCalendarAlt className="date-icon" />
          </div>
        </div>

        <div className="right">
          <button className="reset-btn" onClick={resetFilters}>
            Reset Filter
          </button>
        </div>
      </div>

      <div className="table-cont">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Passenger</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Driver</th>
              <th>Vehicle Type</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {displayedIncidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.passengerName}</td>
                <td>{incident.bookingDate}</td>
                <td
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => handleStatusClick(incident)}
                >
                  {incident.status}
                </td>
                <td>{incident.driver}</td>
                <td>{incident.vehicleType}</td>
                <td>{incident.fare}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="entries-info">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>
          <div className="entry-buttons">
            <span
              className="pagination-text"
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ cursor: currentPage > 1 ? "pointer" : "not-allowed" }}
            >
              Previous
            </span>
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                className={`pagination-link ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </span>
            ))}
            <span
              className="pagination-text"
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                cursor: currentPage < totalPages ? "pointer" : "not-allowed",
              }}
            >
              Next
            </span>
          </div>
        </div>
      </div>

      {showPopup && (
        <BookingDetailsPopup booking={selectedBooking} onClose={closePopup} />
      )}
    </div>
  );
};

export default BookingScreen;
