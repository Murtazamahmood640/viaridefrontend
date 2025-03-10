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
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

 
 
const AllTrips = () => {
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
    { id: 1, make: "Toyota Yaris", type: "Sedan", color: "White", year: 2022, owner: "John Ray", licensePlateNo: "BET-123", chassisNumber: "1HGCM82633A123456", fuel: "Petrol" ,engine:'1900',status:"Active", date: "2024-01-10", time :'08:07:23', passanger: "murtaza", fare:"250"},
    { id: 2, make: "Honda City", type: "Sedan", color: "Grey", year: 2020, owner: "David Brown", licensePlateNo: "BTD-523", chassisNumber: "1HGCM82633A123456", fuel: "Petrol" ,engine:'1900',status:"Active", date: "2024-02-15", time :'08:07:23', passanger: "adil" , fare:"350"},
    { id: 3, make: "Toyota Yaris", type: "Sedan", color: "Silver", year: 2021, owner: "Mark Kim", licensePlateNo: "BAF-734", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active", date: "2024-03-12", time :'08:07:23', passanger: "maaz", fare:"550" },
    { id: 4, make: "Toyota Corolla", type: "Sedan", color: "Black", year: 2022, owner: "Joshua", licensePlateNo: "BYT-009", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active", date: "2024-04-18" , time :'08:07:23', passanger: "ali", fare:"5550"},
    { id: 5, make: "Suzuki Alto", type: "Hatchback", color: "Blue", year: 2019, owner: "Anderson", licensePlateNo: "BAF-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol",engine:'1900',status:"Active" , date: "2024-05-25", time :'08:07:23', passanger: "josh" , fare:"50"},
    { id: 6, make: "Suzuki Alto", type: "Hatchback", color: "Blue", year: 2019, owner: "Anderson", licensePlateNo: "BAF-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active", date: "2024-06-05" , time :'08:07:23', passanger: "fatima", fare:"150"},
    { id: 7, make: "Toyota Corolla", type: "Sedan", color: "Brown", year: 2023, owner: "Mark Miller", licensePlateNo: "BAS-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol",engine:'1900',status:"Active" , date: "2024-07-10", time :'08:07:23', passanger: "munawar", fare:"1050"},
    { id: 8, make: "Toyota Yaris", type: "Sedan", color: "White", year: 2022, owner: "John Ray", licensePlateNo: "BET-123", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active" , date:"2024-08-15", time :'08:07:23' , passanger: "mashal", fare:"550"},
    { id: 9, make: "Honda City", type: "Sedan", color: "Grey", year: 2020, owner: "David Brown", licensePlateNo: "BTD-523", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active", date:  "2024-09-05", time :'08:07:23' , passanger: "manal", fare:"650"},
    { id: 10, make: "Toyota Yaris", type: "Sedan", color: "Silver", year: 2021, owner: "Mark Kim", licensePlateNo: "BAF-734", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active", date:  "2024-09-25", time :'08:07:23', passanger: "najaf", fare:"300"},
    { id: 11, make: "Toyota Corolla", type: "Sedan", color: "Black", year: 2022, owner: "Joshua", licensePlateNo: "BYT-009", chassisNumber: "1HGCM82633A123456", fuel: "Petrol" ,engine:'1900',status:"Active", date: "2024-10-10", time :'08:07:23', passanger: "murtaza", fare:"1000"},
    { id: 12, make: "Suzuki Alto", type: "Hatchback", color: "Blue", year: 2019, owner: "Anderson", licensePlateNo: "BAF-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol" ,engine:'1900',status:"Active", date: "2024-11-01", time :'08:07:23' , passanger: "ali", fare:"550"},
    { id: 13, make: "Honda City", type: "Sedan", color: "Grey", year: 2018, owner: "Andrew John", licensePlateNo: "BGF-948", chassisNumber: "1HGCM82633A123456", fuel: "Petrol",engine:'1900',status:"Active" , date: "2024-11-20", time :'08:07:23' , passanger: "maaz", fare:"995"},
    { id: 14, make: "Toyota Corolla", type: "Sedan", color: "Brown", year: 2023, owner: "Mark Miller", licensePlateNo: "BAS-999", chassisNumber: "MA3EYD32S007004AN", fuel: "Petrol",engine:'1900',status:"Active" , date: "2024-12-15", time :'08:07:23', passanger: "josh", fare:"550" }
 
]);
 
   const navigate = useNavigate(); // React Router hook for navigation
 
const openDriverDetails = () => {
  navigate('/invoice/trip-details');
};
 
 
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
    const driverDate = new Date(driver.date); // Parse the driver's date
    const [startDate, endDate] = selectedDateRange;
  
    const matchesDateRange =
      (!startDate || driverDate >= startDate) &&
      (!endDate || driverDate <= endDate);
  
    // Combine all filters
    return matchesSearch && matchesStatus && matchesDateRange;
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
      <h2 className="page-title">All Trips</h2>
 
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
                        placeholderText="Booking Details"
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
              <th>ID</th>
              <th>Passanger</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
              <th>Driver</th>
              <th>Vehicle Type</th>
              <th>Status</th>
              <th>Fare</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDrivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{driver.passanger}</td>
                <td>{driver.date}</td>
                <td>{driver.time}</td>
                <td>{driver.owner}</td>
                <td>{driver.type}</td>
                <td>{driver.status}</td>
                <td>{driver.fare}</td>
                <td>
                <button
                    className="popupView-btn"
                    onClick={() => openDriverDetails(driver)}
                  >
                    Trip Details
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
 
       
      </div>
    </div>
  );
};
 
export default AllTrips;