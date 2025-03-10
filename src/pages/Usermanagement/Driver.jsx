import React, { useState, useEffect } from "react";
import "./users.css";
import axios from 'axios';
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaTimes,
  FaCalendarAlt,
  FaPencilAlt,
  FaStar,
} from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";
import { BsTrash3 } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import styles for the date picker
import Profile from "../../Assets/Logo/profile.jpg";
const Driver = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // Start and end date in one state
  const [calendarOpen, setCalendarOpen] = useState(false); // Manage calendar open state
  const [popupOpen, setPopupOpen] = useState(false);
  const [editedDriver, setEditedDriver] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false); // Toggle for delete confirmation popup
  const [ratingFilter, setRatingFilter] = useState("");
  const [drivers, setDrivers] = useState([]);
 
  const API_URL = "http://localhost:4000/api/ViaRide/chalany-wala";
  // Close popup
  const closePopup = () => {
    setPopupOpen(false);
    setEditMode(false);
    setDeletePopupOpen(false);
    setSelectedDriver(null);
  };
 
  // Handle delete button click
  const handleDeleteClick = (driver) => {
    setSelectedDriver(driver);
    setDeletePopupOpen(true); // Open the delete confirmation popup
  };
 
  // Fetch dispatchers from backend
  useEffect(() => {
    fetchDispatchers();
  }, []);
 
  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(API_URL);
      setDrivers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Passengers:", error);
      setLoading(false);
    }
  };
 
  //Confirm delete
  const confirmDelete = async () => {
    if (!selectedDriver) return;
    try {
      await axios.delete(`${API_URL}/${selectedDriver._id}`);
      setDrivers(drivers.filter((d) => d._id !== selectedDriver._id));
      closePopup();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };
 
  const handleEditProfile = () => {
    // Create a hidden file input for selecting the new profile image
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
 
    // Handle file selection
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
 
      if (file) {
        // Validate file size (e.g., max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          alert("File size should not exceed 2MB.");
          return;
        }
 
        // Simulate previewing the uploaded image (as we are frontend only)
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedDriver((prev) => ({
            ...prev,
            profilePicture: reader.result, // Preview image as base64
          }));
        };
 
        // Read the file as Data URL (base64)
        reader.readAsDataURL(file);
      }
    };
 
    // Trigger file input click
    fileInput.click();
  };
 
  const entriesPerPage = 7;
  const totalPages = Math.ceil(drivers.length / entriesPerPage);
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  const openViewPopup = (driver) => {
    setSelectedDriver(driver);
    setPopupOpen(true);
    setEditMode(false);
  };
 
  const openEditMode = () => {
    setEditMode(true);
    setEditedDriver({ ...selectedDriver }); // Create a copy to edit
  };
 
  const handleSaveChanges = () => {
    // Assuming Driver is the state array of all Drivers
    setDrivers((prevState) =>
      prevState.map((driver) =>
        driver.id === selectedDriver.id ? selectedDriver : driver
      )
    );
    setSelectedDriver(editedDriver);
    closePopup(); // Close the popup after saving changes
  };
 
  const handleInputChange = (field, value) => {
    setSelectedDriver({
      ...selectedDriver,
      [field]: value,
    });
  };
 
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setSelectedDateRange([null, null]);
    setCurrentPage(1);
  };
 
  const filteredDrivers = drivers.filter((driver) => {
    // Check if the driver's name matches the search term
    const matchesSearch = driver.driverName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
 
    // Check if the driver's status matches the selected status filter
    const matchesStatus = statusFilter
      ? driver.status === statusFilter
      : true;
 
    // Date filtering logic for inclusive range
    const driverDate = new Date(driver.driverJoiningDate);
    const [startDate, endDate] = selectedDateRange;
 
    // Normalize both start and end dates to midnight to ensure correct comparison
    const normalizeDate = (driverJoiningDate) => {
      if (!driverJoiningDate) return null;
      const normalizedDate = new Date(driverJoiningDate);
      normalizedDate.setHours(0, 0, 0, 0); // Set to midnight
      return normalizedDate;
    };
 
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
 
    const matchesDateRange =
      (normalizedStartDate ? driverDate >= normalizedStartDate : true) &&
      (normalizedEndDate ? driverDate <= normalizedEndDate : true);
 
    // Rating filtering logic
    const matchesRatingRange = (() => {
      if (!ratingFilter) return true; // If no rating filter is selected, match all
      const [minRating, maxRating] = ratingFilter.split("-").map(Number); // Parse range
      return driver.driverRating >= minRating && driver.driverRating <= maxRating;
    })();
 
    // Combine all filters
    return matchesSearch && matchesStatus && matchesDateRange && matchesRatingRange;
  });
 
 
  const displayedDrivers = filteredDrivers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
 
  const totalEntries = filteredDrivers.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);
 
  return (
    <div className="user-management">
      <h2 className="page-title">Drivers</h2>
 
      <div className="filters">
        <div className="left">
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <FaChevronDown className="select-icon" />
          </div>
          <div className="driver-date-container">
            <DatePicker
              className="left-date"
              selected={selectedDateRange[0]}
              onChange={(dates) => setSelectedDateRange(dates)} // Select both start and end date
              startDate={selectedDateRange[0]}
              endDate={selectedDateRange[1]}
              selectsRange
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date Range"
              open={calendarOpen} // Bind open state to DatePicker
              onClickOutside={() => setCalendarOpen(false)} // Close calendar on outside click
            />
            <FaCalendarAlt className="date-icon" onClick={toggleCalendar} />{" "}
            {/* Icon triggers calendar */}
          </div>
          <div className="driver-select-container">
  <select
    className="left-select"
    value={ratingFilter}
    onChange={(e) => setRatingFilter(e.target.value)}
  >
    <option value="">Rating </option>
    <option value="4.6-5">4.6 - 5</option>
    <option value="4.1-4.5">4.1 - 4.5</option>
    <option value="3.6-4">3.6 - 4</option>
    <option value="3.1-3.5">3.1 - 3.5</option>
    <option value="2.6-3">2.6 - 3</option>
    <option value="2.1-2.5">2.1 - 2.5</option>
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
        <table className="user-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Driver ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Earning</th>
              <th>Status</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDrivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{driver.driverID}</td>
                <td>{driver.driverName}</td>
                <td>{driver.driverContact}</td>
                <td>{driver.driverEarning}</td>
                <td>{driver.status}</td>
                <td>{driver.driverJoiningDate}</td>
                <td>
                  <button className="popupedit-btn">
                    <FaPencilAlt onClick={() => openViewPopup(driver)} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(driver)}
                  >
                    <FaTrash />
                  </button>
                </td>
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
 
        {/* Popup */}
        {popupOpen && (
          <div className="popup-overlay">
            {editMode ? (
              <div className="edit-popup">
                <div className="edit-header">
                  <h3>Driver Details</h3>
                  <button className="close-btn" onClick={closePopup}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="profile-section">
                  <img
                    src={selectedDriver.profile || Profile} // Use imported image directly here
                    alt="Driver Profile"
                    className="profile-image"
                  />
                  <button className="edit-icon-btn" onClick={handleEditProfile}>
                    <FaEdit className="edit-icon" />
                  </button>
                </div>
 
                <div className="basic-details">
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Driver ID:</label>
                      <input
                        type="text"
                        value={selectedDriver.driverID}
                        onChange={(e) =>
                          handleInputChange("driverID", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Name:</label>
                      <input
                        type="text"
                        value={selectedDriver.name}
                        onChange={(e) =>
                          handleInputChange("driverName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Gender:</label>
                      <input
                        type="text"
                        value={selectedDriver.driverGender}
                        onChange={(e) =>
                          handleInputChange("driverGender", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Age:</label>
                      <input
                        type="text"
                        value={selectedDriver.driverAge}
                        onChange={(e) =>
                          handleInputChange("driverAge", e.target.driverAge)
                        }
                      />
                    </div>
                  </div>
 
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Rating:</label>
                      <input
                        type="text"
                        value={selectedDriver.driverRating}
                        onChange={(e) =>
                          handleInputChange("driverRating", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Cnic:</label>
                      <input
                        type="text"
                        value={selectedDriver.driverCnic}
                        onChange={(e) =>
                          handleInputChange("driverCnic", e.target.value)
                        }
                      />
                    </div>
                  </div>
                 
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Wallet no:</label>
                      <input
                        type="text"
                        value={selectedDriver.driverCardNumber}
                        onChange={(e) =>
                          handleInputChange("driverCardNumber", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Contact no:</label>
                      <input
                        type="text"
                        value={selectedDriver.driverContact}
                        onChange={(e) =>
                          handleInputChange("driverContact", e.target.value)
                        }
                      />
                    </div>
                  </div>
               
                </div>
                <div className="ride-details">
                  <h3>Driver Ride Details</h3>
                  <div className="popup-box">
                    <div className="popup-lable">
                      <p>Total Rides:</p>
                      <p>Total Earning:</p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedDriver.driverTotalTrips}</p>
                      <p>{selectedDriver.driverEarning}</p>
                    </div>
                  </div>
                </div>
                <div className="popup-footer">
                  <button onClick={handleSaveChanges} className="edit-btn">
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <div className="details-popup">
                <div className="detail-header">
                  <p className="status">
                    <p>Status: {selectedDriver.status}</p>
                  </p>
                  <button className="close-btn" onClick={closePopup}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="basic-details">
                  <h3>Driver Details</h3>
                  <div className="driverid-box">
                  <div className="popup-lable">
                      <p>Driver ID</p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedDriver.driverID}</p>
                    </div>
                  </div>
                 
                  <div className="profileimage-box">
                    <div className="popup-lable">
                      <p>Name: </p>
                    </div>
 
                    <div className="profileimage-entries">
                      <img
                        src={selectedDriver.profile || Profile} // Use imported image directly here
                        alt="Driver Profile"
                        className="viewprofile-image"
                      />
                      <p> {selectedDriver.driverName}</p>
                    </div>
                  </div>
                  <div className="popup-box">
                    <div className="popup-lable">
                      <p>Contact:</p>
                      <p>Gender:</p>
                      <p>Age:</p>
                      <p>Rating: </p>
                      <p>Cnic: </p>
                      <p>Wallet: </p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedDriver.driverContact}</p>
                      <p>{selectedDriver.driverGender}</p>
                      <p>{selectedDriver.driverAge}</p>
                      <p>{selectedDriver.driverRating} <MdStar/> </p>
                      <p>{selectedDriver.driverCnic}  </p>
                      <p>{selectedDriver.driverCardNumber} </p>
                    </div>
                  </div>
                </div>
                <div className="ride-details">
                  <h3>Driver Ride Details</h3>
                  <div className="popup-box">
                    <div className="popup-lable">
                      <p>Total Trips:</p>
                      <p>Total Earning:</p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedDriver.driverTotalTrips}</p>
                      <p>{selectedDriver.driverEarning}</p>
                    </div>
                  </div>
                </div>
                <div className="popup-footer">
                  <button onClick={openEditMode} className="edit-btn">
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {deletePopupOpen && (
          <div className="popup-overlay">
            <div className="delete-popup">
              <div className="delete-header">
                <button className="close-btn" onClick={closePopup}>
                  <IoCloseSharp />
                </button>
              </div>
 
              <div className="delete-icon">
                <BsTrash3 />
                <p>Delete User</p>
              </div>
              <div className="delete-content">
                <p>
                  Are you sure you want to delete <strong>
                    {selectedDriver?.name}?
                    </strong>
                </p>
              </div>
              <div className="delete-footer">
              <button onClick={closePopup} className="cancel-btn">
                  No Keep
                </button>
                <button onClick={confirmDelete} className="confirm-btn">
                  Delete
                </button>
             
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Driver;