import React, { useState } from "react";
import "../Usermanagement/users.css";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import BankAccount from "../../Assets/SidebarDropdownIcons/bank_account.png";
import DriverLicense from "../../Assets/SidebarDropdownIcons/driver_license.png";
import CNIC from "../../Assets/SidebarDropdownIcons/cnic_card.png";
import Profile from "../../Assets/Logo/profile.jpg";
const VehicleDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [declinePopupOpen, setDeclinePopupOpen] = useState(false); // New state for decline popup
 
const openDeclinePopup = () => {
  setDeclinePopupOpen(true);
};
 
const closeDeclinePopup = () => {
  setDeclinePopupOpen(false);
};
 
 
  const [drivers, setDrivers] = useState([
           { id: 1,tripId:'TRP001' ,driverid: "Via001", name: "Ali Khan", age: 30, contact: "03231234567", email: "ali.khan@example.com", gender: "Male", rating: '4.7 ', totaltrips: 150, earning: "Rs. 150,000", status: "Active", joiningDate: "2024-01-10", cnic: "42201-1234567-1", wallet: "1234-5678-9012-3456", currentLocation: 'Nazimabad' , assignedVehicle: 'Toyota Yaris BET-123', fare:'560 Rs', paymentType:'Cash' , licensePlateNo: "BAS-999" , seat:" 4 " , carname: "maruti suzuki" , cartype: "mini" , feul: "petrol"},
           { id: 2,tripId:'TRP002' , driverid: "Via002", name: "Ayesha Siddiqui", age: 28, contact: "03019876543", email: "ayesha.siddiqui@example.com", gender: "Female", rating: '4.5 ', totaltrips: 120, earning: "Rs. 120,000", status: "Inactive", joiningDate: "2024-02-15", cnic: "42201-2345678-2", wallet: "2345-6789-0123-4567", currentLocation: 'Karachi South' , assignedVehicle: ' Honda City BTD-523' , fare:'520 Rs', paymentType:'Cash', licensePlateNo: "BGF-948" , seat:" 4 ", carname: "alto", cartype: "mini", feul: "petrol"},
           { id: 3,tripId:'TRP003' , driverid: "Via003", name: "Bilal Ahmed", age: 35, contact: "03025554321", email: "bilal.ahmed@example.com", gender: "Male", rating: '4.8 ', totaltrips: 200, earning: "Rs. 200,000", status: "Active", joiningDate: "2024-03-12", cnic: "42201-3456789-3", wallet: "3456-7890-1234-5678", currentLocation: 'Saddar' , assignedVehicle: 'Toyota Yaris BAF-734', fare:'120 Rs', paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 " , carname: "civic", cartype: "mini", feul: "petrol"},
           { id: 4,tripId:'TRP004' , driverid: "Via004", name: "Fatima Noor", age: 27, contact: "03034445678", email: "fatima.noor@example.com", gender: "Female", rating: '4.6 ', totaltrips: 180, earning: "Rs. 180,000", status: "Active", joiningDate: "2024-04-18", cnic: "42201-4567890-4", wallet: "4567-8901-2345-6789" , currentLocation: 'Kemari', assignedVehicle: 'Toyota Corolla BYT-009' , fare:'850 Rs', paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "revo", cartype: "mini", feul: "petrol"},
           { id: 5,tripId:'TRP005' , driverid: "Via005", name: "Hassan Ali", age: 32, contact: "03221234567", email: "hassan.ali@example.com", gender: "Male", rating:' 4.4 ', totaltrips: 90, earning: "Rs. 90,000", status: "Inactive", joiningDate: "2024-05-25", cnic: "42201-5678901-5", wallet: "5678-9012-3456-7890", currentLocation: 'Gulberg Town' , assignedVehicle: ' Suzuki Alto BAF-999', fare:'960 Rs' , paymentType:'Cash', licensePlateNo: "BGF-948", seat:" 4 ", carname: "prado", cartype: "mini", feul: "petrol"},
           { id: 6, tripId:'TRP006' ,driverid: "Via006", name: "Sara Malik", age: 26, contact: "03091234567", email: "sara.malik@example.com", gender: "Female", rating: '4.3 ', totaltrips: 110, earning: "Rs. 110,000", status: "Active", joiningDate: "2024-06-05", cnic: "42201-6789012-6", wallet: "6789-0123-4567-8901" , currentLocation: 'Orangi Town', assignedVehicle: '  Honda City BGF-948' , fare:'1060 Rs' , paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "maruti suzuki", cartype: "mini", feul: "petrol"},
           { id: 7,tripId:'TRP007' , driverid: "Via007", name: "Zainab Qureshi", age: 29, contact: "03331234567", email: "zainab.qureshi@example.com", gender: "Female", rating: '4.5 ', totaltrips: 140, earning: "Rs. 140,000", status: "Active", joiningDate: "2024-07-10", cnic: "42201-7890123-7", wallet: "7890-1234-5678-9012", currentLocation: 'Karachi' , assignedVehicle: 'Toyota Corolla BAS-999' , fare:'560 Rs', paymentType:'Cash', licensePlateNo: "BGF-948", seat:" 4 ", carname: "maruti suzuki", cartype: "mini", feul: "petrol"},
           { id: 8,tripId:'TRP008' , driverid: "Via008", name: "Usman Sheikh", age: 33, contact: "03111234567", email: "usman.sheikh@example.com", gender: "Male", rating: '4.2 ', totaltrips: 80, earning: "Rs. 80,000", status: "Inactive", joiningDate: "2024-08-15", cnic: "42201-8901234-8", wallet: "8901-2345-6789-0123", currentLocation: 'Orangi Town' , assignedVehicle: 'Toyota Yaris BET-123', fare:'750 Rs' , paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "maruti suzuki", cartype: "mini", feul: "petrol"},
           { id: 9,tripId:'TRP009' , driverid: "Via009", name: "Maria Farooq", age: 25, contact: "03211234567", email: "maria.farooq@example.com", gender: "Female", rating: '4.1 ', totaltrips: 100, earning: "Rs. 100,000", status: "Active", joiningDate: "2024-09-05", cnic: "42201-9012345-9", wallet: "9012-3456-7890-1234" , currentLocation: 'Korangi', assignedVehicle: 'Toyota Yaris BET-123' , fare:'600 Rs', paymentType:'Cash', licensePlateNo: "BGF-948", seat:" 4 ", carname: "civic", cartype: "mini", feul: "petrol"},
           { id: 10, tripId:'TRP010' ,driverid: "Via010", name: "Adnan Raza", age: 31, contact: "03011234567", email: "adnan.raza@example.com", gender: "Male", rating: '4.4 ', totaltrips: 125, earning: "Rs. 125,000", status: "Active", joiningDate: "2024-09-25", cnic: "42201-0123456-0", wallet: "0123-4567-8901-2345" , currentLocation: 'Shah Faisal', assignedVehicle: 'Toyota Yaris BET-123', fare:'500 Rs' , paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "maruti suzuki", cartype: "mini", feul: "petrol"},
           { id: 11,tripId:'TRP011' , driverid: "Via011", name: "Zoya Ahmed", age: 28, contact: "03331234567", email: "zoya.ahmed@example.com", gender: "Female", rating: '4.6 ', totaltrips: 170, earning: "Rs. 170,000", status: "Active", joiningDate: "2024-10-10", cnic: "42201-1234567-1", wallet: "1234-5678-9012-3456" , currentLocation: 'Islamabd', assignedVehicle: 'Toyota Yaris BET-123' , fare:'430 Rs', paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "revo", cartype: "mini", feul: "petrol"},
           { id: 12,tripId:'TRP012' , driverid: "Via012", name: "Hamza Tariq", age: 34, contact: "03211234567", email: "hamza.tariq@example.com", gender: "Male", rating: '4.2 ', totaltrips: 75, earning: "Rs. 75,000", status: "Inactive", joiningDate: "2024-11-01", cnic: "42201-2345678-2", wallet: "2345-6789-0123-4567" , currentLocation: 'Nazimabad', assignedVehicle: 'Toyota Yaris BET-123' , fare:'960 Rs', paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "maruti suzuki", cartype: "mini", feul: "petrol"},
           { id: 13, tripId:'TRP013' ,driverid: "Via013", name: "Amina Jamil", age: 27, contact: "03111234567", email: "amina.jamil@example.com", gender: "Female", rating:' 4.3 ', totaltrips: 95, earning: "Rs. 95,000", status: "Active", joiningDate: "2024-11-20", cnic: "42201-3456789-3", wallet: "3456-7890-1234-5678", currentLocation: 'Shah Faisal' , assignedVehicle: 'Toyota Yaris BET-123' , fare:'200 Rs', paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: " revo", cartype: "mini", feul: "petrol"},
           { id: 14,tripId:'TRP014' , driverid: "Via014", name: "Farhan Saeed", age: 36, contact: "03331234567", email: "farhan.saeed@example.com", gender: "Male", rating:' 4.4 ', totaltrips: 120, earning: "Rs. 120,000", status: "Inactive", joiningDate: "2024-12-05", cnic: "42201-4567890-4", wallet: "4567-8901-2345-6789" , currentLocation: 'Shah Faisal', assignedVehicle: 'Toyota Yaris BET-123', fare:'600 Rs' , paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "maruti suzuki", cartype: "mini", feul: "petrol"},
           { id: 15,tripId:'TRP015' , driverid: "Via015", name: "Hira Khan", age: 24, contact: "03051234567", email: "hira.khan@example.com", gender: "Female", rating: '4.5 ', totaltrips: 130, earning: "Rs. 130,000", status: "Active", joiningDate: "2024-12-15", cnic: "42201-5678901-5", wallet: "5678-9012-3456-7890" , currentLocation: 'Nazimabad' , assignedVehicle: 'Toyota Yaris BET-123', fare:'1560 Rs', paymentType:'Cash', licensePlateNo: "BAS-999", seat:" 4 ", carname: "civic", cartype: "mini", feul: "petrol"},
       
       ]);
 
  const entriesPerPage = 7;
  const totalPages = Math.ceil(drivers.length / entriesPerPage);
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  const resetFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };
 
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const displayedDrivers = filteredDrivers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
 
  const totalEntries = filteredDrivers.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);
 
  const openPopup = (driver) => {
    setSelectedDriver(driver);
    setPopupOpen(true);
  };
 
  const closePopup = () => {
    setSelectedDriver(null);
    setPopupOpen(false);
  };



  return (
    <div className="user-management">
      <h2 className="page-title">Vehicle Requests</h2>
 
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
              <th>Driver</th>
              <th>Car Number</th>
              <th>Car Name </th>
              <th>Car Type</th>
              <th>Seat</th>
              <th>  Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDrivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td>{driver.name}</td>
                <td>{driver.licensePlateNo}</td>
                <td>{driver.carname}</td>
                <td>{driver.cartype}</td>
                <td>{driver.seat}</td>
                <td>
                  <button
                    className="popupView-btn"
                    onClick={() => openPopup(driver)}
                  >
                    View Details
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
 
      {/* Popup */}
      {popupOpen && selectedDriver && (
  <div className="popup-overlay">
    <div className="sample-popup">
      <div className="edit-header">
        <h3>New Vehicle Add Request</h3>
        <button className="close-btn" onClick={closePopup}>
          <IoCloseSharp />
        </button>
      </div>
      {/* Add Heading Above popup-lable */}
      <h4 className="popup-title">Car Details</h4>
      <div className="popup-label">
        <p>
          <strong>Car Name:</strong>
          <br />
          <span>{selectedDriver.carname}</span>
        </p>
        <p>
          <strong>Car Type:</strong>
          <br />
          <span>{selectedDriver.cartype}</span>
        </p>
        <p>
          <strong>Car Seats:</strong>
          <br />
          <span>{selectedDriver.seat}</span>
        </p>
      </div>
      <div className="popup-label">
        <p>
          <strong>Car No:</strong>
          <br />
          <span>{selectedDriver.licensePlateNo}</span>
        </p>
        <p>
          <strong>Car Feul Type:</strong>
          <br />
          <span>{selectedDriver.feul}</span>
        </p>
      </div>
 
      {/* Separator */}
      <hr className="popup-separator" />
  {/* New Heading */}
  <h4 className="popup-subtitle">Car Documents</h4>
      {/* Driver Documents Section */}
<div className="popup-documents-popup">
  <div className="document-item-popup">
    <img src={BankAccount} alt="Bank Account Details" />
    <p>Registration <br/> Book</p>
  </div>
  <div className="document-item-popup">
    <img src={Profile} alt="Profile" />
    <p>Car Insurance</p>
  </div>
  <div className="document-item-popup">
    <img src={DriverLicense} alt="Driving License" />
    <p>Car Permit</p>
  </div>
  <div className="document-item-popup">
    <img src={CNIC} alt="CNIC" />
    <p>CNIC </p>

  </div>
</div>
      {/* New Heading */}
      <h4 className="popup-subtitle">Car Images</h4>
      {/* Driver Documents Section */}
<div className="popup-documents-popup">
 
  <div className="document-item-popup">
    <img src={Profile} alt="Profile" />
    <p>Chassis no <br/>Image</p>
  </div>
  <div className="document-item-popup">
    <img src={DriverLicense} alt="Driving License" />
    <p>Back side with<br/> number plate </p>
  </div>
  <div className="document-item-popup">
    <img src={CNIC} alt="CNIC" />
    <p>Left Side <br/>exterior</p>
  </div>
  <div className="document-item-popup">
    <img src={CNIC} alt="CNIC" />
    <p>Right Side <br/>exterior</p>
  </div>
  <div className="document-item-popup">
    <img src={BankAccount} alt="Bank Account Details" />
    <p>Front side with<br/> number plate</p>
  </div>
</div>



<div className="popup-actions-buttons">
<button className="btn-decline-buttons" onClick={openDeclinePopup}>
  Decline
</button>
 
  <button className="btn-accept-buttons" onClick={closePopup}>
    Accept
  </button>
</div>
 
 
    </div>
  </div>
)}
{declinePopupOpen && (
  <div className="popup-overlay">
    <div className="sample-popup">
      <div className="edit-header">
        <h4 className="popup-title">Add Decline Reason</h4>
        <button className="close-btn" onClick={closeDeclinePopup}>
          <IoCloseSharp />
        </button>
      </div>
      <div className="popup-content">
        <textarea
          className="decline-reason-input"
          placeholder="Add Reason Here..."
        ></textarea>
      </div>
      <h4 className="resubmit-heading">Re-Submit Details (if documents issue)</h4>
  <select className="resubmit-dropdown">
    <option value="" disabled selected>Select Document</option>
    <option value="bank_account">Bank Account Details</option>
    <option value="profile">Profile</option>
    <option value="license">Driving License</option>
    <option value="cnic">CNIC</option>
  </select>
      <div className="popup-actions-buttons">
        <button className="btn-accept-buttons" onClick={closeDeclinePopup}>
          Submit
        </button>
       
      </div>
 
    </div>
  </div>
)}
 
 
 
     
    </div>
  );
};

export default VehicleDetails;