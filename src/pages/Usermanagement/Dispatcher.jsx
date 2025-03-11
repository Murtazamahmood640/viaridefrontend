import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users.css";
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
import { BsTrash3 } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import styles for the date picker
import Profile from "../../Assets/Logo/profile.jpg";

const Dispatcher = () => {
  const [dispatchers, setDispatchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState(false); // Manage calendar open state
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedDispatcher, setEditedDispatcher] = useState(null);
  const [selectedDispatcher, setSelectedDispatcher] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
 
  const API_URL = "https://viaridebackend.vercel.app/api/ViaRide/dispatcher";

  // Close popup
  const closePopup = () => {
    setPopupOpen(false);
    setEditMode(false);
    setDeletePopupOpen(false);
    setSelectedDispatcher(null);
  };
  const handleDeleteClick = (dispatcher) => {
    setSelectedDispatcher(dispatcher);
    setDeletePopupOpen(true);
  };

 
  // Fetch dispatchers from backend
  useEffect(() => {
    fetchDispatchers();
  }, []);
 
  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(API_URL);
      setDispatchers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
      setLoading(false);
    }
  };
 
  // Delete dispatcher
  const confirmDelete = async () => {
    if (!selectedDispatcher) return;
    try {
      await axios.delete(`${API_URL}/${selectedDispatcher._id}`);
      setDispatchers(dispatchers.filter((d) => d._id !== selectedDispatcher._id));
      closePopup();
    } catch (error) {
      console.error("Error deleting dispatcher:", error);
    }
  };
 
  // Update dispatcher
  const handleSaveChanges = async () => {
    if (!editedDispatcher) return;
    try {
      const response = await axios.put(`${API_URL}/${editedDispatcher._id}`, editedDispatcher);
      setDispatchers(dispatchers.map((d) => (d._id === editedDispatcher._id ? response.data : d)));
      closePopup();
    } catch (error) {
      console.error("Error updating dispatcher:", error);
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
          setSelectedDispatcher((prev) => ({
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
  const totalPages = Math.ceil(dispatchers.length / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openViewPopup = (dispatcher) => {
    setSelectedDispatcher({
      ...dispatcher,
      customId: dispatcher.customId || "",
      name: dispatcher.name || "",
      contact: dispatcher.contact || "-",
      gender: dispatcher.gender || "-",
      email: dispatcher.email || "",
      totaltrips: dispatcher.totaltrips || "-",
      cnic: dispatcher.cnic || "-",
      profilePicture: dispatcher.profilePicture || Profile, // Ensure profile image is set
    });
    setPopupOpen(true);
    setEditMode(false);
  };
  

  const openEditMode = () => {
    setEditMode(true);
    setEditedDispatcher({ ...selectedDispatcher });
  };


  const handleInputChange = (field, value) => {
    setEditedDispatcher({
      ...editedDispatcher,
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

  const filteredDispatchers = dispatchers.filter((dispatcher) => {
    // Check if the Dispatcher's name matches the search term
    const matchesSearch = dispatcher.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  
    // Check if the Dispatcher's status matches the selected status filter
    const matchesStatus = statusFilter
      ? dispatcher.status === statusFilter
      : true;
  
    // Date filtering logic for inclusive range
    const dispatcherDate = new Date(dispatcher.joiningDate);
    const [startDate, endDate] = selectedDateRange;
  
    // Normalize both start and end dates to midnight to ensure correct comparison
    const normalizeDate = (joiningDate) => {
      if (!joiningDate) return null;
      const normalizedDate = new Date(joiningDate);
      normalizedDate.setHours(0, 0, 0, 0); // Set to midnight
      return normalizedDate;
    };
  
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
  
    const matchesDateRange =
      (normalizedStartDate ? dispatcherDate >= normalizedStartDate : true) &&
      (normalizedEndDate ? dispatcherDate <= normalizedEndDate : true);
  
  
  
    // Combine all filters
    return matchesSearch && matchesStatus && matchesDateRange ;
  });
  

  const displayedDispatchers = filteredDispatchers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalEntries = filteredDispatchers.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  return (
    <div className="user-management">
      <h2 className="page-title">Dispatchers</h2>

      <div className="filters">
        <div className="left">
          <div className="dispatcher-input-container">
            <input
              type="text"
              className="left-input"
              placeholder="Search"
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <FaChevronDown className="select-icon" />
          </div>
          <div className="dispatcher-date-container">
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
              <th>Dispatcher ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Assigned Trips</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDispatchers.map((dispatcher, index) => (
              <tr key={dispatcher.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{dispatcher.customId}</td>
                <td>{dispatcher.name}</td>
                <td>{dispatcher.contact}</td>
                <td>{dispatcher.email}</td>
                <td>{dispatcher.totaltrips}</td>
                <td>{dispatcher.status}</td>
                <td>
                  <button className="popupedit-btn">
                    <FaPencilAlt onClick={() => openViewPopup(dispatcher)} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(dispatcher)}
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
                  <h3>Dispatcher Details</h3>
                  <button className="close-btn" onClick={closePopup}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="profile-section">
                  <img
                    src={selectedDispatcher.profile || Profile} // Use imported image directly here
                    alt="dispatcher Profile"
                    className="profile-image"
                  />
                  <button className="edit-icon-btn" onClick={handleEditProfile}>
                    <FaEdit className="edit-icon" />
                  </button>
                </div>

                <div className="basic-details">
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Dispatcher ID:</label>
                      <input
  type="text"
  value={editedDispatcher?.customId || ""}
  onChange={(e) => handleInputChange("customId", e.target.value)}
/>

                    </div>
                    <div className="popup-field">
                      <label>Name:</label>
                      <input
  type="text"
  value={editedDispatcher?.name || ""}
  onChange={(e) => handleInputChange("name", e.target.value)}
/>

                    </div>
                  </div>
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Gender:</label>
                      <input
  type="text"
  value={editedDispatcher?.gender || ""}
  onChange={(e) => handleInputChange("gender", e.target.value)}
/>

                    </div>
                    <div className="popup-field">
                      <label>Email:</label>
                      <input
  type="text"
  value={editedDispatcher?.email || ""}
  onChange={(e) => handleInputChange("email", e.target.value)}
/>

                    </div>
                  </div>

                  <div className="field-row">
                    <div className="popup-field">
                      <label>Assigned Trips:</label>
                      <input
  type="text"
  value={editedDispatcher?.totaltrips || ""}
  onChange={(e) => handleInputChange("totaltrips", e.target.value)}
/>

                    </div>
                    <div className="popup-field">
                      <label>Cnic:</label>
                      <input
  type="text"
  value={editedDispatcher?.cnic || ""}
  onChange={(e) => handleInputChange("cnic", e.target.value)}
/>

                    </div>
                  </div>
                  
                  <div className="field-row">
                 
                    <div className="popup-field">
                      <label>Contact no:</label>
                      <input
  type="text"
  value={editedDispatcher?.contact || ""}
  onChange={(e) => handleInputChange("contact", e.target.value)}
/>

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
                    <p>Status: {selectedDispatcher.status}</p>
                  </p>
                  <button className="close-btn" onClick={closePopup}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="basic-details">
                  <h3>Dispatcher Details</h3>
                  <div className="driverid-box">
                  <div className="popup-lable">
                      <p>Dispatcher ID</p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedDispatcher.customId}</p>
                    </div>
                  </div>
                  
                  <div className="profileimage-box">
                    <div className="popup-lable">
                      <p>Name: </p>
                    </div>

                    <div className="profileimage-entries">
                      <img
                        src={selectedDispatcher.profile || Profile} // Use imported image directly here
                        alt="Driver Profile"
                        className="viewprofile-image"
                      />
                      <p> {selectedDispatcher.name}</p>
                    </div>
                  </div>
                  <div className="popup-box">
                    <div className="popup-lable">
                      <p>Contact:</p>
                      <p>Gender:</p>
                      <p>Email: </p>
                      <p>Cnic: </p>
                      <p>Assigned Trips: </p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedDispatcher.contact}</p>
                      <p>{selectedDispatcher.gender}</p>
                      <p>{selectedDispatcher.email}  </p>
                      <p>{selectedDispatcher.cnic}  </p>
                      <p>{selectedDispatcher.totaltrips} </p>
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
                    {selectedDispatcher?.name}?
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

export default Dispatcher;
