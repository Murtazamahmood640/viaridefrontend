import React, { useState } from "react";
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
import { MdStar } from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";
import { BsTrash3 } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import styles for the date picker
import Car from "../../Assets/SidebarDropdownIcons/Car_Image.png";
const VehicleScreen= () => {
  const [currentPage, setCurrentPage] = useState(1);
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

  const [drivers, setDrivers] = useState([
    { id: 1, make: "Toyota Yaris", type: "Sedan", color: "White", year: 2022, owner: "John Ray", licensePlateNo: "BET-123", chassisNumber: "1HGCM82633A123456", fuel: "Petrol" ,engine:'1900',status:"Active"},
    { id: 2, make: "Honda City", type: "Sedan", color: "Grey", year: 2020, owner: "David Brown", licensePlateNo: "BTD-523", chassisNumber: "1HGCM82633A123456", fuel: "Petrol" ,engine:'1900',status:"Active"},
    { id: 3, make: "Toyota Yaris", type: "Sedan", color: "Silver", year: 2021, owner: "Mark Kim", licensePlateNo: "BAF-734", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active"},
    { id: 4, make: "Toyota Corolla", type: "Sedan", color: "Black", year: 2022, owner: "Joshua", licensePlateNo: "BYT-009", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active" },
    { id: 5, make: "Suzuki Alto", type: "Hatchback", color: "Blue", year: 2019, owner: "Anderson", licensePlateNo: "BAF-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol",engine:'1900',status:"Active" },
    { id: 6, make: "Suzuki Alto", type: "Hatchback", color: "Blue", year: 2019, owner: "Anderson", licensePlateNo: "BAF-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active"},
    { id: 7, make: "Toyota Corolla", type: "Sedan", color: "Brown", year: 2023, owner: "Mark Miller", licensePlateNo: "BAS-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol",engine:'1900',status:"Active" },
    { id: 8, make: "Toyota Yaris", type: "Sedan", color: "White", year: 2022, owner: "John Ray", licensePlateNo: "BET-123", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active" },
    { id: 9, make: "Honda City", type: "Sedan", color: "Grey", year: 2020, owner: "David Brown", licensePlateNo: "BTD-523", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active" },
    { id: 10, make: "Toyota Yaris", type: "Sedan", color: "Silver", year: 2021, owner: "Mark Kim", licensePlateNo: "BAF-734", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active"},
    { id: 11, make: "Toyota Corolla", type: "Sedan", color: "Black", year: 2022, owner: "Joshua", licensePlateNo: "BYT-009", chassisNumber: "1HGCM82633A123456", fuel: "Petrol" ,engine:'1900',status:"Active"},
    { id: 12, make: "Suzuki Alto", type: "Hatchback", color: "Blue", year: 2019, owner: "Anderson", licensePlateNo: "BAF-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active"},
    { id: 13, make: "Honda City", type: "Sedan", color: "Grey", year: 2018, owner: "Andrew John", licensePlateNo: "BGF-948", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active" },
    { id: 14, make: "Toyota Corolla", type: "Sedan", color: "Brown", year: 2023, owner: "Mark Miller", licensePlateNo: "BAS-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol",engine:'1900',status:"Active" }

]);



  
  
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

  // Confirm delete
  const confirmDelete = () => {
    setDrivers((prev) => prev.filter((p) => p.id !== selectedDriver.id));
    closePopup(); // Close all popups
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
    const matchesSearch = driver.owner
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  
    // Check if the driver's status matches the selected status filter
    const matchesStatus = statusFilter
      ? driver.status === statusFilter
      : true;
  
    // Date filtering logic for inclusive range
    const driverDate = new Date(driver.joiningDate);
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
      (normalizedStartDate ? driverDate >= normalizedStartDate : true) &&
      (normalizedEndDate ? driverDate <= normalizedEndDate : true);
  
    // Rating filtering logic
    const matchesRatingRange = (() => {
      if (!ratingFilter) return true; // If no rating filter is selected, match all
      const [minRating, maxRating] = ratingFilter.split("-").map(Number); // Parse range
      return driver.rating >= minRating && driver.rating <= maxRating;
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
              onChange={(dates) => setSelectedDateRange(dates)} // Select both start and end date
              startDate={selectedDateRange[0]}
              endDate={selectedDateRange[1]}
              selectsRange
              dateFormat="yyyy-MM-dd"
              placeholderText="Bookings details"
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
              <th>Make</th>
              <th>Type</th>
              <th>Colour</th>
              <th>Year</th>
              <th>Owner</th>
              <th>License PLate no</th>
              <th>Chassis no</th>
              <th>Feul</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDrivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{driver.make}</td>
                <td>{driver.type}</td>
                <td>{driver.color}</td>
                <td>{driver.year}</td>
                <td>{driver.owner}</td>
                <td>{driver.licensePlateNo}</td>
                <td>{driver.chassisNumber}</td>
                <td>{driver.fuel}</td>

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
                  <h3>Vehicle Details</h3>
                  <button className="close-btn" onClick={closePopup}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="profile-section">
                <img
                        src={selectedDriver.profile || Car} // Use imported image directly here
                        alt="Driver Profile"
                        className="viewCar-image"
                      />
                  <button className="edit-icon-btn" onClick={handleEditProfile}>
                    <FaEdit className="edit-icon" />
                  </button>
                </div>

                <div className="basic-details">
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Make:</label>
                      <input
                        type="text"
                        value={selectedDriver.make}
                        onChange={(e) =>
                          handleInputChange("make", e.target.make)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Colour:</label>
                      <input
                        type="text"
                        value={selectedDriver.name}
                        onChange={(e) =>
                          handleInputChange("color", e.target.color)
                        }
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="popup-field">
                      <label>Type:</label>
                      <input
                        type="text"
                        value={selectedDriver.gender}
                        onChange={(e) =>
                          handleInputChange("type", e.target.type)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>License plate no:</label>
                      <input
                        type="text"
                        value={selectedDriver.age}
                        onChange={(e) =>
                          handleInputChange("licensePlateNo", e.target.licensePlateNo)
                        }
                      />
                    </div>
                  </div>

                  <div className="field-row">
                  <div className="popup-field">
                      <label>Year:</label>
                      <input
                        type="text"
                        value={selectedDriver.wallet}
                        onChange={(e) =>
                          handleInputChange("year", e.target.year)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Chassis no:</label>
                      <input
                        type="text"
                        value={selectedDriver.cnic}
                        onChange={(e) =>
                          handleInputChange("chassisNo", e.target.chassisNumber)
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="field-row">
                   
                    <div className="popup-field">
                      <label>Feul type:</label>
                      <input
                        type="text"
                        value={selectedDriver.contact}
                        onChange={(e) =>
                          handleInputChange("feul", e.target.fuel)
                        }
                      />
                    </div>
                    <div className="popup-field">
                      <label>Engine:</label>
                      <input
                        type="text"
                        value={selectedDriver.contact}
                        onChange={(e) =>
                          handleInputChange("engine", e.target.engine)
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
                        alt="Driver Profile"
                        className="viewCar-image"
                      />
                      <p>{selectedDriver.make}</p>
                    </div>
                  <div className="make-box">
                  <div className="popup-lable">
                    </div>
                    <div className="popup-entries">
                    <p> {selectedDriver.name}</p>
                    </div>
                  </div>
                  
                 
                  <div className="popup-box">
                    <div className="popup-lable">
                      <p>Type:</p>
                      <p>Colour:</p>
                      <p>Year:</p>
                      <p>Owner: </p>
                      <p>license plate no: </p>
                      <p>chassis no: </p>
                      <p>Feul: </p>
                      <p>Status: </p>
                      <p>Engine: </p>
                    </div>
                    <div className="popup-entries">
                      <p>{selectedDriver.type}</p>
                      <p>{selectedDriver.color}</p>
                      <p>{selectedDriver.year}</p>
                      <p>{selectedDriver.owner}</p>
                      <p>{selectedDriver.licensePlateNo}  </p>
                      <p>{selectedDriver.chassisNumber} </p>
                      <p>{selectedDriver.fuel} </p>
                      <p>{selectedDriver.status} </p>
                      <p>{selectedDriver.engine} </p>
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
    </div>
  );
};

export default VehicleScreen;
