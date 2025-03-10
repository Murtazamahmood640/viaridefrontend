import React, { useState } from "react";
import "./SOSalerts.css";
import { FaSearch, FaChevronDown, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
const SOSAlert = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [SeverityFilter, setSeveriTyFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
 
  const sosAlert = [
    {
      Severity: "🟥 High",
      time: "14:32, Nov 5",
      driverName: "John Ray",
      passengerName: "John Ray",
      tripDetails: "TRP087,123 Main St 456 Elm St",
      status: "Occupied",
      eta: "10 mins",
      actions: "Contacted emergency services",
      mapPreview: "Map Image",
    },
    {
      Severity: "🟨 Medium",
      time: "12:15, Nov 3",
      driverName: "David Brown",
      passengerName: "Lauren Price",
      tripDetails: "TRP347,438 Main St 716 Pine St",
      status: "Pick Up",
      eta: "5 mins",
      actions: "Message driver, notified backup",
      mapPreview: "Map Image",
    },
    {
      Severity: "🟥 High",
      time: "11:05, Nov 3",
      driverName: "Mark Kim",
      passengerName: "Abel Gaylord",
      tripDetails: "TRP653,895 Main St 286 Birch Ave",
      status: "Pick Up",
      eta: "12 mins",
      actions: "Contacted emergency services",
      mapPreview: "Map Image",
    },
    {
      Severity: "🟥 High",
      time: "15:10, Oct 31",
      driverName: "Joshua",
      passengerName: "Joe Beer",
      tripDetails: "TRP087,123 Main St 456 Elm St",
      status: "Occupied",
      eta: "15 mins",
      actions: "Notified backup, acknowledged",
      mapPreview: "Map Image",
    },
    {
      Severity: "🟨 Medium",
      time: "13:15, Oct 28",
      driverName: "Anderson",
      passengerName: "Lauren Price",
      tripDetails: "TRP781, Main St 456 Elm St",
      status: "Pick Up",
      eta: "9 mins",
      actions: "Message driver, acknowledged",
      mapPreview: "Map Image",
    },
    {
      Severity: "🟨 Medium",
      time: "08:45, Oct 27",
      driverName: "Andrew John",
      passengerName: "Abel Gaylord",
      tripDetails: "TRP1674,628 Main St 133 vine St",
      status: "Occupied",
      eta: "18 mins",
      actions: "Contacted emergency services",
      mapPreview: "Map Image",
    },
    {
      Severity: "🟥 High",
      time: "10:20, Oct 23",
      driverName: "Mark Miller",
      passengerName: "Abel Gaylord",
      tripDetails: "TRP689,083 Main St 456 Elm St",
      status: "Occupied",
      eta: "10 mins",
      actions: "Notified backup, acknowledged",
      mapPreview: "Map Image",
    },
  ];
 
  const entriesPerPage = 7;
  const totalPages = Math.ceil(50 / entriesPerPage);
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  const filteredSosAlert = sosAlert.filter((sosAlert) => {
    const matchesSearch =
      sosAlert.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sosAlert.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sosAlert.actions.toLowerCase().includes(searchTerm.toLowerCase());
 
    const matchesSeveriTy = SeverityFilter
      ? sosAlert.Severity.includes(SeverityFilter)
      : true;
 
    let matchesDate = true;
    if (selectedDate) {
      const dateString = selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      matchesDate = sosAlert.time.includes(dateString);
    }
 
    return matchesSearch && matchesSeveriTy && matchesDate;
  });
 
  const displayedSosAlert = filteredSosAlert.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
 
  const totalEntries = 50;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);
 
  const resetFilters = () => {
    setSearchTerm("");
    setSeveriTyFilter("");
    setSelectedDate(null);
    setCurrentPage(1);
  };
 
  return (
    <div className="user-management">
      <h2 className="page-title">Active SOS Alerts</h2>
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
              value={SeverityFilter}
              onChange={(e) => setSeveriTyFilter(e.target.value)}
            >
              <option value="">Severity</option>
              <option value="🟥 High">High</option>
              <option value="🟨 Medium">Medium</option>
            </select>
            <FaChevronDown className="select-icon" />
          </div>
 
          <div className="dispatcher-date-container">
            <DatePicker
              className="left-date"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
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
              <th>Alert Type</th>
              <th>Time</th>
              <th>Driver Name</th>
              <th>Passenger Name</th>
              <th>Trip Details</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedSosAlert.map((sosAlert) => (
              <tr key={sosAlert.time + sosAlert.driverName}>
                <td>{sosAlert.Severity}</td>
                <td>{sosAlert.time}</td>
                <td>{sosAlert.driverName}</td>
                <td>{sosAlert.passengerName}</td>
                <td>{sosAlert.tripDetails}</td>
                <td>{sosAlert.status}</td>
                <td>{sosAlert.eta}</td>
                <td>{sosAlert.actions}</td>
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
    </div>
  );
};
 
export default SOSAlert;