import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import BookingDetailsPopup from "./StatusPopup"; 
import axios from "axios";  // You can use Axios for making API calls

const BookingScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // State for storing fetched trips from the API
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    // Fetch the trip data from your API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ridebackend.vercel.app/api/viaRide/trips-getting-values");  // Replace with your Trip API URL
        setTrips(response.data); // Assuming the response data is an array of trips
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalEntries = trips.length;
  const entriesPerPage = 7;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.tripPassanger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.tripVehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.tripFare.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? trip.tripStatus.toLowerCase() === statusFilter.toLowerCase()
      : true;

    let matchesDate = true;
    if (dateFilter) {
      const dateString = dateFilter.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      matchesDate = trip.scheduledDate.includes(dateString);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const displayedTrips = filteredTrips.slice(
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
  const handleStatusClick = (trip) => {
    setSelectedTrip(trip);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTrip(null);
  };

  return (
    <div className="user-management">
      <h2 className="page-title">Trips</h2>
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
              <th>Trip ID</th>
              <th>Passenger</th>
              <th>Scheduled Date</th>
              <th>Status</th>
              <th>Driver</th>
              <th>Vehicle Type</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {displayedTrips.map((trip) => (
              <tr key={trip.tripID}>
                <td>{trip.tripID}</td>
                <td>{trip.tripPassanger}</td>
                <td>{trip.scheduledDate}</td>
                <td
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => handleStatusClick(trip)}
                >
                  {trip.tripStatus}
                </td>
                <td>{trip.tripDriver}</td>
                <td>{trip.tripVehicleType}</td>
                <td>{trip.tripFare}</td>
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
        <BookingDetailsPopup trip={selectedTrip} onClose={closePopup} />
      )}
    </div>
  );
};

export default BookingScreen;
