import React, { useState, useEffect } from "react";
import "./users.css";
import axios from "axios";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaCalendarAlt,
  FaPencilAlt,
} from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import styles for the date picker
import Profile from "../../Assets/Logo/profile.jpg";
const Accountant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // Start and end date in one state
  const [calendarOpen, setCalendarOpen] = useState(false); // Manage calendar open state
  const [popupOpen, setPopupOpen] = useState(false);
  const [editedAccountant, setEditedAccountant] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedAccountant, setSelectedAccountant] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false); // Toggle for delete confirmation popup
  const [accountants, setAccountants] = useState([]);
  const [email, setEmail] = useState("");



  const API_URL = "https://ridebackend.vercel.app/api/ViaRide/accountant";

  // Close popup
  const closePopup = () => {
    setPopupOpen(false);
    setEditMode(false);
    setDeletePopupOpen(false);
    setSelectedAccountant(null);
  };
  const handleDeleteClick = (accountant) => {
    setSelectedAccountant(accountant);
    setDeletePopupOpen(true);
  };

 
  // Fetch accountant from backend
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
    fetchAccountants();
  }, []);
  
 
  const fetchAccountants = async () => {
    try {
      const response = await axios.get(API_URL);
      setAccountants(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accoutants:", error);
      setLoading(false);
    }
  };
 
  // Delete accountant
  const confirmDelete = async () => {
    if (!selectedAccountant) return;
    try {
      await axios.delete(`${API_URL}/${selectedAccountant._id}`);
  
      // Log INFO
      await axios.post("https://ridebackend.vercel.app/api/viaRide/info", {
        level: "INFO",
        message: `Accountant ${selectedAccountant.email} deleted successfully by ${email}.`,
        timestamp: new Date().toISOString(),
      });
  
      setAccountants(accountants.filter((d) => d._id !== selectedAccountant._id));
      closePopup();
    } catch (error) {
      console.error("Error deleting accountant:", error);
  
      // Log ERROR
      await axios.post("https://ridebackend.vercel.app/api/viaRide/error", {
        level: "ERROR",
        message: `Failed to delete accountant ${selectedAccountant.email} by ${email}: ${
          error.response?.data?.message || error.message
        }`,
        timestamp: new Date().toISOString(),
      });
    }
  };
  
 
  const handleSaveChanges = async () => {
    if (!editedAccountant) return;
  
    try {
      const response = await axios.put(
        `${API_URL}/${editedAccountant._id}`,
        editedAccountant
      );
  
      // Log INFO
      await axios.post("https://ridebackend.vercel.app/api/viaRide/info", {
        level: "INFO",
        message: `Accountant ${editedAccountant.email} updated successfully by ${email}.`,
        timestamp: new Date().toISOString(),
      });
  
      setAccountants(
        accountants.map((acc) =>
          acc._id === editedAccountant._id ? response.data : acc
        )
      );
      closePopup();
    } catch (error) {
      console.error("Error updating accountant:", error);
  
      // Log ERROR
      await axios.post("https://ridebackend.vercel.app/api/viaRide/error", {
        level: "ERROR",
        message: `Failed to update accountant ${editedAccountant.email} by ${email}: ${
          error.response?.data?.message || error.message
        }`,
        timestamp: new Date().toISOString(),
      });
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
          setSelectedAccountant((prev) => ({
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
  const totalPages = Math.ceil(accountants.length / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openViewPopup = (accountant) => {
    setSelectedAccountant({
      ...accountant,
      customId: accountant.customId || "",
      name: accountant.name || "",
      contact: accountant.contact || "-",
      gender: accountant.gender || "-",
      age: accountant.age || "-",
      email: accountant.email || "",
      totaltrips: accountant.totaltrips || "-",
      cnic: accountant.cnic || "-",
      role: accountant.role || "-",
      accessLevel: accountant.accessLevel || "-",
      profilePicture: accountant.profilePicture || Profile, // Ensure profile image is set
    });
    setPopupOpen(true);
    setEditMode(false);
  };

  const openEditMode = () => {
    setEditMode(true);
    setEditedAccountant({ ...selectedAccountant });
  };


  const handleInputChange = (field, value) => {
    setEditedAccountant({
      ...editedAccountant,
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

  const filteredAccountants = accountants.filter((accountant) => {
    // Check if the accountant's name matches the search term
    const matchesSearch = accountant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  
    // Check if the accountant's status matches the selected status filter
    const matchesStatus = statusFilter
      ? accountant.status === statusFilter
      : true;
  
    // Date filtering logic for inclusive range
    const accountantDate = new Date(accountant.joiningDate);
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
      (normalizedStartDate ? accountantDate >= normalizedStartDate : true) &&
      (normalizedEndDate ? accountantDate <= normalizedEndDate : true);
  
  
  
    // Combine all filters
    return matchesSearch && matchesStatus && matchesDateRange ;
  });
  

  const displayedAccountants = filteredAccountants.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalEntries = filteredAccountants.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  return (
    <div className="user-management">
      <h2 className="page-title">Accountants</h2>

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
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Role</option>
              <option value="Senior">Senior</option>
              <option value="Junior">Junior</option>
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
              <th>Accountant ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Role</th>
              <th>Access Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedAccountants.map((accountant, index) => (
              <tr key={accountant.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{accountant.customId}</td>
                <td>{accountant.name}</td>
                <td>{accountant.contact}</td>
                <td>{accountant.email}</td>
                <td>{accountant.role}</td>
                <td>{accountant.accessLevel}</td>
                <td>{accountant.status}</td>
                <td>
                  <button className="popupedit-btn">
                    <FaPencilAlt onClick={() => openViewPopup(accountant)} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(accountant)}
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
                  <h3>Accountant Details</h3>
                  <button className="close-btn" onClick={closePopup}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="profile-section">
                  <img
                    src={selectedAccountant.profile || Profile} // Use imported image directly here
                    alt="Accountant Profile"
                    className="profile-image"
                  />
                  <button className="edit-icon-btn" onClick={handleEditProfile}>
                    <FaEdit className="edit-icon" />
                  </button>
                </div>

                <div className="basic-details">
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Accountant ID:</label>
                      <input
                        type="text"
                        value={editedAccountant.customId}
                        onChange={(e) =>
                          handleInputChange("customId", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Name:</label>
                      <input
                        type="text"
                        value={editedAccountant.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Gender:</label>
                      <input
                        type="text"
                        value={editedAccountant.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Contact:</label>
                      <input
                        type="text"
                        value={editedAccountant.contact}
                        onChange={(e) => handleInputChange("contact", e.target.contact)}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="popup-field">
                      <label>Email:</label>
                      <input
                        type="email"
                        value={editedAccountant.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Cnic:</label>
                      <input
                        type="text"
                        value={editedAccountant.cnic}
                        onChange={(e) =>
                          handleInputChange("cnic", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="popup-field">
                      <label>Role:</label>
                      <input
                        type="role"
                        value={editedAccountant.role}
                        onChange={(e) =>
                          handleInputChange("role", e.target.value)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Access Level:</label>
                      <input
                        type="text"
                        value={editedAccountant.accessLevel}
                        onChange={(e) =>
                          handleInputChange("accessLevel", e.target.value)
                        }
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
                    <p>Status: {selectedAccountant.status}</p>
                  </p>
                  <button className="close-btn" onClick={closePopup}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="basic-details">
                  <h3>Accountant Details</h3>
                  <div className="driverid-box">
                    <div className="popup-lable">
                      <p>Accountant ID</p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedAccountant.customId}</p>
                    </div>
                  </div>

                  <div className="profileimage-box">
                    <div className="popup-lable">
                      <p>Name: </p>
                    </div>

                    <div className="profileimage-entries">
                      <img
                        src={selectedAccountant.profile || Profile} // Use imported image directly here
                        alt="Accountant Profile"
                        className="viewprofile-image"
                      />
                      <p> {selectedAccountant.name}</p>
                    </div>
                  </div>
                  <div className="popup-box">
                    <div className="popup-lable">
                      <p>Contact:</p>
                      <p>Gender:</p>
                      <p>Age:</p>
                      <p>Email: </p>
                      <p>Cnic: </p>
                      <p>Role: </p>
                      <p>Access Level: </p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedAccountant.contact}</p>
                      <p>{selectedAccountant.gender}</p>
                      <p>{selectedAccountant.age}</p>
                      <p>
                        {selectedAccountant.email} {" "}
                      </p>
                      <p>{selectedAccountant.cnic} </p>
                      <p>{selectedAccountant.role} </p>
                      <p>{selectedAccountant.accessLevel} </p>
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
                  Are you sure you want to delete{" "}
                  <strong>{selectedAccountant?.name}?</strong>
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

export default Accountant;
