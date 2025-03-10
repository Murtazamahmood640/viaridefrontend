import React, { useState } from "react";
import "../Usermanagement/users.css";
import {
  FaSearch,
  FaChevronDown,
  FaCalendarAlt,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import styles for the date picker
import { useNavigate } from "react-router-dom";



const Drivers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // Start and end date in one state
  const [calendarOpen, setCalendarOpen] = useState(false); // Manage calendar open state
  const [ratingFilter, setRatingFilter] = useState("");

  const navigate = useNavigate(); // React Router hook for navigation
  const openDriverDetails = () => {
    navigate('/drivermanagement/details');
  };

  const [drivers, setDrivers] = useState([
    { id: 1, driverid: "Via001", name: "Ali Khan", age: 30, contact: "03231234567", email: "ali.khan@example.com", gender: "Male", rating: '4.7 ', totaltrips: 150, earning: "Rs. 150,000", status: "Active", joiningDate: "2024-01-10", cnic: "42201-1234567-1", wallet: "1234-5678-9012-3456", currentLocation: 'Nazimabad' , assignedVehicle: 'Toyota Yaris BET-123'},
    { id: 2, driverid: "Via002", name: "Ayesha Siddiqui", age: 28, contact: "03019876543", email: "ayesha.siddiqui@example.com", gender: "Female", rating: '4.5 ', totaltrips: 120, earning: "Rs. 120,000", status: "Inactive", joiningDate: "2024-02-15", cnic: "42201-2345678-2", wallet: "2345-6789-0123-4567", currentLocation: 'Karachi South' , assignedVehicle: ' Honda City BTD-523' },
    { id: 3, driverid: "Via003", name: "Bilal Ahmed", age: 35, contact: "03025554321", email: "bilal.ahmed@example.com", gender: "Male", rating: '4.8 ', totaltrips: 200, earning: "Rs. 200,000", status: "Active", joiningDate: "2024-03-12", cnic: "42201-3456789-3", wallet: "3456-7890-1234-5678", currentLocation: 'Saddar' , assignedVehicle: 'Toyota Yaris BAF-734' },
    { id: 4, driverid: "Via004", name: "Fatima Noor", age: 27, contact: "03034445678", email: "fatima.noor@example.com", gender: "Female", rating: '4.6 ', totaltrips: 180, earning: "Rs. 180,000", status: "Active", joiningDate: "2024-04-18", cnic: "42201-4567890-4", wallet: "4567-8901-2345-6789" , currentLocation: 'Kemari', assignedVehicle: 'Toyota Corolla BYT-009' },
    { id: 5, driverid: "Via005", name: "Hassan Ali", age: 32, contact: "03221234567", email: "hassan.ali@example.com", gender: "Male", rating:' 4.4 ', totaltrips: 90, earning: "Rs. 90,000", status: "Inactive", joiningDate: "2024-05-25", cnic: "42201-5678901-5", wallet: "5678-9012-3456-7890", currentLocation: 'Gulberg Town' , assignedVehicle: ' Suzuki Alto BAF-999' },
    { id: 6, driverid: "Via006", name: "Sara Malik", age: 26, contact: "03091234567", email: "sara.malik@example.com", gender: "Female", rating: '4.3 ', totaltrips: 110, earning: "Rs. 110,000", status: "Active", joiningDate: "2024-06-05", cnic: "42201-6789012-6", wallet: "6789-0123-4567-8901" , currentLocation: 'Orangi Town', assignedVehicle: '  Honda City BGF-948' },
    { id: 7, driverid: "Via007", name: "Zainab Qureshi", age: 29, contact: "03331234567", email: "zainab.qureshi@example.com", gender: "Female", rating: '4.5 ', totaltrips: 140, earning: "Rs. 140,000", status: "Active", joiningDate: "2024-07-10", cnic: "42201-7890123-7", wallet: "7890-1234-5678-9012", currentLocation: 'Karachi' , assignedVehicle: 'Toyota Corolla BAS-999' },
    { id: 8, driverid: "Via008", name: "Usman Sheikh", age: 33, contact: "03111234567", email: "usman.sheikh@example.com", gender: "Male", rating: '4.2 ', totaltrips: 80, earning: "Rs. 80,000", status: "Inactive", joiningDate: "2024-08-15", cnic: "42201-8901234-8", wallet: "8901-2345-6789-0123", currentLocation: 'Orangi Town' , assignedVehicle: 'Toyota Yaris BET-123' },
    { id: 9, driverid: "Via009", name: "Maria Farooq", age: 25, contact: "03211234567", email: "maria.farooq@example.com", gender: "Female", rating: '4.1 ', totaltrips: 100, earning: "Rs. 100,000", status: "Active", joiningDate: "2024-09-05", cnic: "42201-9012345-9", wallet: "9012-3456-7890-1234" , currentLocation: 'Korangi', assignedVehicle: 'Toyota Yaris BET-123' },
    { id: 10, driverid: "Via010", name: "Adnan Raza", age: 31, contact: "03011234567", email: "adnan.raza@example.com", gender: "Male", rating: '4.4 ', totaltrips: 125, earning: "Rs. 125,000", status: "Active", joiningDate: "2024-09-25", cnic: "42201-0123456-0", wallet: "0123-4567-8901-2345" , currentLocation: 'Shah Faisal', assignedVehicle: 'Toyota Yaris BET-123' },
    { id: 11, driverid: "Via011", name: "Zoya Ahmed", age: 28, contact: "03331234567", email: "zoya.ahmed@example.com", gender: "Female", rating: '4.6 ', totaltrips: 170, earning: "Rs. 170,000", status: "Active", joiningDate: "2024-10-10", cnic: "42201-1234567-1", wallet: "1234-5678-9012-3456" , currentLocation: 'Islamabd', assignedVehicle: 'Toyota Yaris BET-123' },
    { id: 12, driverid: "Via012", name: "Hamza Tariq", age: 34, contact: "03211234567", email: "hamza.tariq@example.com", gender: "Male", rating: '4.2 ', totaltrips: 75, earning: "Rs. 75,000", status: "Inactive", joiningDate: "2024-11-01", cnic: "42201-2345678-2", wallet: "2345-6789-0123-4567" , currentLocation: 'Nazimabad', assignedVehicle: 'Toyota Yaris BET-123' },
    { id: 13, driverid: "Via013", name: "Amina Jamil", age: 27, contact: "03111234567", email: "amina.jamil@example.com", gender: "Female", rating:' 4.3 ', totaltrips: 95, earning: "Rs. 95,000", status: "Active", joiningDate: "2024-11-20", cnic: "42201-3456789-3", wallet: "3456-7890-1234-5678", currentLocation: 'Shah Faisal' , assignedVehicle: 'Toyota Yaris BET-123' },
    { id: 14, driverid: "Via014", name: "Farhan Saeed", age: 36, contact: "03331234567", email: "farhan.saeed@example.com", gender: "Male", rating:' 4.4 ', totaltrips: 120, earning: "Rs. 120,000", status: "Inactive", joiningDate: "2024-12-05", cnic: "42201-4567890-4", wallet: "4567-8901-2345-6789" , currentLocation: 'Shah Faisal', assignedVehicle: 'Toyota Yaris BET-123' },
    { id: 15, driverid: "Via015", name: "Hira Khan", age: 24, contact: "03051234567", email: "hira.khan@example.com", gender: "Female", rating: '4.5 ', totaltrips: 130, earning: "Rs. 130,000", status: "Active", joiningDate: "2024-12-15", cnic: "42201-5678901-5", wallet: "5678-9012-3456-7890" , currentLocation: 'Nazimabad' , assignedVehicle: 'Toyota Yaris BET-123'},

]);



  
 
  const entriesPerPage = 7;
  const totalPages = Math.ceil(drivers.length / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

 


 

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
    const matchesSearch = driver.name
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
      <h2 className="page-title">All Drivers</h2>

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
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Current Location</th>
              <th>Assigned Vehicle</th>
              <th>Ratings</th>
              <th>Total Trips</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {displayedDrivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{driver.name}</td>
                <td>{driver.email}</td>
                <td>{driver.contact}</td>
                <td>{driver.status}</td>
                <td>{driver.currentLocation }</td>
                <td>{driver.assignedVehicle }</td>
                <td>{driver.rating }</td>
                <td>{driver.totaltrips }</td>


                <td>
                <button
                    className="popupView-btn"
                    onClick={() => openDriverDetails(driver)}
                  >
                    View
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

export default Drivers;
