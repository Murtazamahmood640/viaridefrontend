import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Usermanagement/users.css";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const LogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [logTypeFilter, setLogTypeFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [logs, setLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = "http://localhost:4000/api/viaRide/logs"; // Ensure backend URL is correct

  useEffect(() => {
    fetchLogs();
  }, [currentPage, logTypeFilter, selectedDate, searchTerm]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // Convert selected date to 'YYYY-MM-DD' format for filtering (ignoring time)
      const dateParam = selectedDate
        ? new Date(selectedDate).toISOString().split("T")[0]  // '2025-03-25'
        : null;

      const params = {
        level: logTypeFilter,
        date: dateParam, // Send only the date part (YYYY-MM-DD)
        name: searchTerm,
        page: currentPage, // Include page for pagination
        limit: 10,  // Update to 10 entries per page
      };

      const response = await axios.get(API_URL, { params });
      let fetchedLogs = response.data.logs || [];

      // Sort logs by createdAt in descending order on the frontend (most recent first)
      fetchedLogs = fetchedLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setLogs(fetchedLogs);
      setTotalPages(Math.ceil(response.data.totalLogs / 10)); // Total pages based on the new limit
      setLoading(false);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setLogTypeFilter("");
    setSelectedDate(null);
    setCurrentPage(1);
  };

  const handleDateChange = (date) => {
    if (date) {
      // Strip the time and convert to UTC without any time zone shift
      const adjustedDate = new Date(date).setHours(0, 0, 0, 0); // Set time to midnight to avoid timezone issues
      setSelectedDate(new Date(adjustedDate)); // Set the date with no time part
    } else {
      setSelectedDate(null); // Reset if no date is selected
    }
  };

  return (
    <div className="user-management">
      <h2 className="page-title">Logs</h2>

      <div className="filters">
        <div className="log-left">
          <div className="driver-input-container">
            <input
              type="text"
              className="left-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="input-icon" />
          </div>

          <div className="driver-select-container">
            <select
              className="left-select"
              value={logTypeFilter}
              onChange={(e) => setLogTypeFilter(e.target.value)}
            >
              <option value="">Log Type</option>
              <option value="info">Info</option>
              <option value="warn">Warn</option>
              <option value="error">Error</option>
              <option value="debug">Debug</option>
            </select>
            <FaChevronDown className="select-icon" />
          </div>
        </div>

        <div className="right">
          <button className="reset-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="table-cont">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Log</th>
                  <th>Level</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No entries for this item
                    </td>
                  </tr>
                ) : (
                  logs.map((log, index) => (
                    <tr key={log._id}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{log.message}</td>
                      <td>{log.level}</td>
                      <td>{new Date(log.createdAt).toLocaleDateString() || "Invalid Date"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="pagination">
              <div className="entries-info">
                Showing {(currentPage - 1) * 10 + 1} to{" "}
                {Math.min(currentPage * 10, logs.length)} of {logs.length} entries
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
                    className={`pagination-link ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </span>
                ))}
                <span
                  className="pagination-text"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ cursor: currentPage < totalPages ? "pointer" : "not-allowed" }}
                >
                  Next
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LogList;
