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
      const dateParam = selectedDate
        ? new Date(selectedDate).toISOString().split("T")[0]
        : null;

      const params = {
        level: logTypeFilter,
        date: dateParam,
        name: searchTerm,
        page: currentPage,
        limit: 10, // Pagination limit
      };

      const response = await axios.get(API_URL, { params });

      let fetchedLogs = response.data.logs || [];
      fetchedLogs = fetchedLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort with recent entries first

      setLogs(fetchedLogs);
      setTotalPages(Math.ceil(response.data.totalLogs / 10));
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
      const adjustedDate = new Date(date).setHours(0, 0, 0, 0);
      setSelectedDate(new Date(adjustedDate));
    } else {
      setSelectedDate(null);
    }
  };

  // Calculate the pagination window (e.g., 1-5, 6-10, etc.)
  const getPaginationRange = () => {
    const start = Math.floor((currentPage - 1) / 5) * 5 + 1; // Start page (1-5, 6-10, etc.)
    const end = Math.min(start + 4, totalPages); // End page (limit to totalPages)

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
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
                {getPaginationRange().map((page) => (
                  <span
                    key={page}
                    className={`pagination-link ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
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
