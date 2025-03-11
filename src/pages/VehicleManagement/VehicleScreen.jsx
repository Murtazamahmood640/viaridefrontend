import React, { useState, useEffect } from "react";
import axios from 'axios';

import "../Usermanagement/users.css";
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
import Car from "../../Assets/SidebarDropdownIcons/Car_Image.png";

const VehicleScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editedDriver, setEditedDriver] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("");
  const [drivers, setDrivers] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    axios.get('https://viaridebackend.vercel.app/api/viaRide/vehicle-get-values') // Replace with your actual API URL
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles data:", error);
      });
  }, []);

  // Close popups
  const closePopup = () => {
    setPopupOpen(false);
    setEditMode(false);
    setDeletePopupOpen(false);
    setSelectedDriver(null);
  };

  // Handle delete button click
  const handleDeleteClick = (driver) => {
    setSelectedDriver(driver);
    setDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    axios.delete(`https://viaridebackend.vercel.app/api/viaRide/vehicle-delete-values/${selectedDriver._id}`)
      .then(() => {
        // Refetch data after successful delete
        axios.get('https://viaridebackend.vercel.app/api/viaRide/vehicle-get-values')
          .then((response) => {
            setDrivers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching vehicles data:", error);
          });
        closePopup();
      })
      .catch((error) => {
        console.error("Error deleting vehicle:", error);
      });
  };
  

  // Handle edit profile
  const handleEditProfile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert("File size should not exceed 2MB.");
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setSelectedDriver((prev) => ({
            ...prev,
            profilePicture: reader.result, // Preview image as base64
          }));
        };
        reader.readAsDataURL(file);
      }
    };

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
    setEditedDriver({ ...selectedDriver });
  };

  const handleSaveChanges = () => {
    // Ensure you're sending the correct driver ID (_id)
    if (selectedDriver._id) {
      axios.put(`https://viaridebackend.vercel.app/api/viaRide/vehicle-put-values/${selectedDriver._id}`, editedDriver)
        .then(() => {
          // Refetch data after successful update
          axios.get('https://viaridebackend.vercel.app/api/viaRide/vehicle-get-values')
            .then((response) => {
              setDrivers(response.data);
            })
            .catch((error) => {
              console.error("Error fetching vehicles data:", error);
            });
          closePopup();
        })
        .catch((error) => {
          console.error("Error updating vehicle:", error);
        });
    } else {
      console.error("Driver ID is missing.");
    }
  };
  
  
  // Handle input change for edit form
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
    const matchesSearch = driver.owner
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? driver.status === statusFilter : true;
    const [startDate, endDate] = selectedDateRange;

    const matchesDateRange =
      (startDate ? new Date(driver.joiningDate) >= new Date(startDate) : true) &&
      (endDate ? new Date(driver.joiningDate) <= new Date(endDate) : true);

    const matchesRatingRange = !ratingFilter || (driver.rating >= ratingFilter.split("-")[0] && driver.rating <= ratingFilter.split("-")[1]);

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
      <h2 className="page-title">Vehicles</h2>
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
              onChange={(dates) => setSelectedDateRange(dates)}
              startDate={selectedDateRange[0]}
              endDate={selectedDateRange[1]}
              selectsRange
              dateFormat="yyyy-MM-dd"
              placeholderText="Bookings details"
              open={calendarOpen}
              onClickOutside={() => setCalendarOpen(false)}
            />
            <FaCalendarAlt className="date-icon" onClick={toggleCalendar} />
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
              <th>Vehicle Name</th>
              <th>Type</th>
              <th>Color</th>
              <th>Year</th>
              <th>Owner</th>
              <th>License PLate no</th>
              <th>Fuel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDrivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{driver.make}</td>
                <td>{driver.carType}</td>
                <td>{driver.color}</td>
                <td>{driver.year}</td>
                <td>{driver.owner}</td>
                <td>{driver.licensePlateNo}</td>
                <td>{driver.feul}</td>
                <td>
                  <button className="popupedit-btn" onClick={() => openViewPopup(driver)}>
                    <FaPencilAlt />
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteClick(driver)}>
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
      </div>
      {popupOpen && (
  <div className="popup-overlay">
    {editMode ? (
      <div className="edit-popup">
        <div className="edit-header">
          <h3>Vehicle Details</h3>
          <button className="close-btn" onClick={closePopup}>
            <IoCloseSharp />
          </button>
        </div>
        <div className="profile-section">
          <img
            src={selectedDriver.profile || Car} // Use imported image directly here
            alt="Vehicle"
            className="viewCar-image"
          />
          <button className="edit-icon-btn" onClick={handleEditProfile}>
            <FaEdit className="edit-icon" />
          </button>
        </div>

        <div className="basic-details">
        <div className="field-row">
  <div className="popup-field">
    <label>Vehicle Name:</label>
    <input
      type="text"
      value={editedDriver?.make || selectedDriver?.make}
      onChange={(e) => setEditedDriver({ ...editedDriver, make: e.target.value })}
    />
  </div>
  <div className="popup-field">
    <label>Color:</label>
    <input
      type="text"
      value={editedDriver?.color || selectedDriver?.color}
      onChange={(e) => setEditedDriver({ ...editedDriver, color: e.target.value })}
    />
  </div>
</div>

<div className="field-row">
  <div className="popup-field">
    <label>Type:</label>
    <input
      type="text"
      value={editedDriver?.carType || selectedDriver?.carType}
      onChange={(e) => setEditedDriver({ ...editedDriver, carType: e.target.value })}
    />
  </div>
  <div className="popup-field">
    <label>License Plate No:</label>
    <input
      type="text"
      value={editedDriver?.licensePlateNo || selectedDriver?.licensePlateNo}
      onChange={(e) =>
        setEditedDriver({ ...editedDriver, licensePlateNo: e.target.value })
      }
    />
  </div>
</div>

<div className="field-row">
  <div className="popup-field">
    <label>Year:</label>
    <input
      type="text"
      value={editedDriver?.year || selectedDriver?.year}
      onChange={(e) => setEditedDriver({ ...editedDriver, year: e.target.value })}
    />
  </div>
  <div className="popup-field">
    <label>Fuel Type:</label>
    <input
      type="text"
      value={editedDriver?.feul || selectedDriver?.feul}
      onChange={(e) => setEditedDriver({ ...editedDriver, feul: e.target.value })}
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
            <p>Status: {selectedDriver.status}</p>
          </p>
          <button className="close-btn" onClick={closePopup}>
            <IoCloseSharp />
          </button>
        </div>

        <div className="basic-details">
          <h3>Vehicle Details</h3>
          <div className="profileimage-entry">
            <img
              src={selectedDriver.profile || Car} // Use imported image directly here
              alt="Vehicle Profile"
              className="viewCar-image"
            />
            <p>{selectedDriver.make}</p>
          </div>
          <div className="popup-box">
            <div className="popup-lable">
              <p>Type:</p>
              <p>Color:</p>
              <p>Year:</p>
              <p>Owner:</p>
              <p>License Plate No:</p>
              <p>Fuel:</p>
              <p>Status:</p>
            </div>
            <div className="popup-entries">
              <p>{selectedDriver.carType}</p>
              <p>{selectedDriver.color}</p>
              <p>{selectedDriver.year}</p>
              <p>{selectedDriver.owner}</p>
              <p>{selectedDriver.licensePlateNo}</p>
              <p>{selectedDriver.feul}</p>
              <p>{selectedDriver.status}</p>
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
                <p>Delete Vehicle</p>
              </div>
              <div className="delete-content">
                <p>
                  Are you sure you want to delete <strong>
                    {selectedDriver?.make}?
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
  );
};

export default VehicleScreen;
