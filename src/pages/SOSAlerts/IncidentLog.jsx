import React, { useState } from "react";
import "./SOSalerts.css";
import {
  FaSearch,
  FaChevronDown,
  FaCalendarAlt,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IncidentLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [settledTimeFilter, setSettledTimeFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const incidents = [
    {
      id: "001",
      driverName: "John Ray",
      passengerName: "Joe Beer",
      tripId: "TRP087",
      alertTime: "14:32, Nov 5",
      settledTime: "14:45, Nov 5",
      resolvedBy: "Dispatcher",
      actions: "Contacted emergency services",
      notes: "Issue resolved",
    },
    {
      id: "002",
      driverName: "David Brown",
      passengerName: "Lauren Price",
      tripId: "TRP120",
      alertTime: "12:15, Nov 3",
      settledTime: "12:30, Nov 3",
      resolvedBy: "Dispatcher",
      actions: "Message driver, notified backup",
      notes: "Driver arrived",
    },
    {
      id: "003",
      driverName: "Mark Kim",
      passengerName: "Abel Gaylord",
      tripId: "TRP653",
      alertTime: "11:05, Nov 3",
      settledTime: "11:25, Nov 3",
      resolvedBy: "Dispatcher",
      actions: "Contacted emergency services",
      notes: "No injuries",
    },
    {
      id: "004",
      driverName: "Joshua",
      passengerName: "Joe Beer",
      tripId: "TRP043",
      alertTime: "15:10, Oct 31",
      settledTime: "15:30, Oct 31",
      resolvedBy: "Dispatcher",
      actions: "Notified backup, acknowledged",
      notes: "Assistance arrived",
    },
    {
      id: "005",
      driverName: "Anderson",
      passengerName: "Lauren Price",
      tripId: "TRP175",
      alertTime: "13:15, Oct 28",
      settledTime: "13:30, Oct 28",
      resolvedBy: "Dispatcher",
      actions: "Message driver, acknowledged",
      notes: "Passenger calm",
    },
    {
      id: "006",
      driverName: "Andrew John",
      passengerName: "Abel Gaylord",
      tripId: "TRP096",
      alertTime: "08:45, Oct 27",
      settledTime: "09:00, Oct 27",
      resolvedBy: "Dispatcher",
      actions: "Contacted emergency services",
      notes: "Issue resolved",
    },
    {
      id: "007",
      driverName: "Mark Miller",
      passengerName: "Abel Gaylord",
      tripId: "TRP111",
      alertTime: "10:20, Oct 23",
      settledTime: "10:40, Oct 23",
      resolvedBy: "Dispatcher",
      actions: "Notified backup, acknowledged",
      notes: "Assistance arrived",
    },
 
  ];

  const entriesPerPage = 7;
  const totalPages = Math.ceil(50 / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.tripId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.actions.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSettledTime = settledTimeFilter
      ? incident.settledTime.toLowerCase().includes(settledTimeFilter.toLowerCase())
      : true;

    let matchesDate = true;
    if (selectedDate) {
      const dateString = selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      matchesDate =
        incident.alertTime.includes(dateString) ||
        incident.settledTime.includes(dateString);
    }

    return matchesSearch && matchesSettledTime && matchesDate;
  });

  const displayedIncidents = filteredIncidents.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalEntries = 50; 
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const resetFilters = () => {
    setSearchTerm("");
    setSettledTimeFilter("");
    setSelectedDate(null);
    setCurrentPage(1);
  };

  return (
    <div className="user-management">
      <h2 className="page-title">Incident Log</h2>
      <div className="filters">
        <div className="incident">
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

        <div className="filters-right">
          <button className="resetButton" onClick={resetFilters}>
            Reset Filter
          </button>
        </div>
      </div>

      <div className="table-cont">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Driver Name</th>
              <th>Passenger Name</th>
              <th>Trip ID</th>
              <th>Alert Time</th>
              <th>Settled Time</th>
              <th>Actions</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {displayedIncidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.driverName}</td>
                <td>{incident.passengerName}</td>
                <td>{incident.tripId}</td>
                <td>{incident.alertTime}</td>
                <td>{incident.settledTime}</td>
                <td>{incident.actions}</td>
                <td>{incident.notes}</td>
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

export default IncidentLog;
