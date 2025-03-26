import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaDollarSign,
  FaUser,
  FaFileInvoice,
  FaUserCircle,
  FaCalendarAlt,
  FaUserPlus,
} from "react-icons/fa";
import { MdAirlineSeatReclineNormal, MdOutlineSecurity } from "react-icons/md"; // Passenger
import { GiSteeringWheel } from "react-icons/gi"; // Driver
import { BiSupport } from "react-icons/bi"; // Dispatcher
import { MdAttachMoney } from "react-icons/md"; // Accountant
import { IoMdClock } from "react-icons/io";
import { HiMiniUser } from "react-icons/hi2";
import { FaMap } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { IoPricetag } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import { RiUser6Fill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io"; // Icon for Dispatcher
import { MdOutlineUpcoming } from "react-icons/md"; // Upcoming Ride
import { RiSteering2Fill } from "react-icons/ri"; // Manual Dispatch
import { AiOutlineRobot } from "react-icons/ai"; // Auto Dispatch
import { BsCalendarCheck } from "react-icons/bs"; // Schedule Ride
import { MdCancel } from "react-icons/md"; // Ride Cancellation
import { FaClipboardList } from "react-icons/fa"; // Booking
import { MdOutlineEventNote } from "react-icons/md"; // Booking Details
import { RiFileWarningLine } from "react-icons/ri"; // Incident Log
import { MdNotificationsActive } from "react-icons/md"; // SOS Alert
import { GiPriceTag } from "react-icons/gi"; // Price Model
import { MdLinearScale } from "react-icons/md"; // Add Range
import { FaUsers } from "react-icons/fa"; // All Drivers
import { MdPersonPin } from "react-icons/md"; // Driver Details
import { BsChatDots } from "react-icons/bs"; // Driver Chat
import { FaRoute } from "react-icons/fa"; // Driver Trips
import { IoInformationCircleOutline } from "react-icons/io5"; // Driver Info
import { FaCar } from "react-icons/fa"; // Vehicle
import { MdDirectionsCar } from "react-icons/md"; // Vehicle Details
import { AiOutlineEdit } from "react-icons/ai"; // Vehicle Edit
import { MdDeleteForever } from "react-icons/md"; // Vehicle Delete Alert
import { GiCarWheel } from "react-icons/gi"; // Vehicle Maintenance
import { MdOutlineEventAvailable } from "react-icons/md"; // Vehicle Availability
import { FaRegListAlt } from "react-icons/fa"; // All Trips
import { MdDetails } from "react-icons/md"; // Trip Details
import { AiOutlineFileText } from "react-icons/ai"; // Generated Invoice
import "./layout.css";
import logo from "../../src/Assets/Logo/Via-Logo-004.png";
import toggleIcon from "../Assets/SidebarIcons/toogle.png";
import dropdownIcon from "../Assets/SidebarIcons/dropdownicon.png";
import { GoLocation } from "react-icons/go";

const Sidebar = ({
  isCollapsed,
  toggleSidebar,
  activeMenu,
  handleMenuClick,
}) => {
  // Get role from localStorage
  const role = localStorage.getItem("Role"); // Assuming role is stored as 'admin', 'dispatcher', 'accountant', etc.

  // State to track whether the sidebar is collapsed
  const [collapsed, setCollapsed] = useState(isCollapsed);

  // Optional: Handle sidebar collapse state in useEffect
  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        <button className="toggle-btn" onClick={toggleSidebar}>
          <img
            src={toggleIcon}
            alt="Toggle Icon"
            className={`toggle-icon ${collapsed ? "rotate" : ""}`}
          />
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <div className="top">
          {/* Dashboard */}
          {role === "Admin" ||
          role === "Dispatcher" ||
          role === "Accountant" ? (
            <li className="links">
              <Link to="/dashboard">
                <IoMdClock /> <span>{collapsed ? "" : "Dashboard"}</span>
              </Link>
            </li>
          ) : null}

          {/* User Management (Admin only) */}
          {role === "Admin" && (
            <>
              <li>
                <div
                  onClick={() => handleMenuClick("user-management")}
                  className={`menu-heading ${
                    activeMenu === "user-management" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <HiMiniUser />{" "}
                    <span>{collapsed ? "" : "User Management"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "user-management" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "user-management" && !collapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/users/createuser">
                        <FaUserPlus /> {/* Icon for User Creation */}
                        <span>User Creation</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/users/passenger">
                        <MdAirlineSeatReclineNormal />{" "}
                        {/* Icon for Passenger */}
                        <span>Passenger</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/users/driver">
                        <GiSteeringWheel /> {/* Icon for Driver */}
                        <span>Driver</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/users/dispatcher">
                        <BiSupport /> {/* Icon for Dispatcher */}
                        <span>Dispatcher</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/users/accountant">
                        <MdAttachMoney /> {/* Icon for Accountant */}
                        <span>Accountant</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Zone Setup */}
              <li className="links">
                <Link to="/zone-setup">
                  <FaMap /> <span>{isCollapsed ? "" : "Zone Setup"}</span>
                </Link>
              </li>
              {/* Logs  */}
              <li className="links">
                <Link to="/log-list">
                  <FaClipboardList  /> <span>{isCollapsed ? "" : "Log List"}</span>
                </Link>
              </li>

              {/* Dispatch Ride */}
              <li>
                <div
                  onClick={() => handleMenuClick("dispatch-ride")}
                  className={`menu-heading ${
                    activeMenu === "dispatch-ride" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <FaCarAlt />{" "}
                    <span>{isCollapsed ? "" : "Dispatch Ride"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "dispatch-ride" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "dispatch-ride" && !isCollapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/dispatch-ride/upcoming">
                        <MdOutlineUpcoming /> {/* Icon for Upcoming Ride */}
                        <span>Upcoming Ride</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/dispatch-ride/auto">
                        <AiOutlineRobot /> {/* Icon for Auto Dispatch */}
                        <span>Auto Dispatch</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dispatch-ride/schedule">
                        <BsCalendarCheck /> {/* Icon for Schedule Ride */}
                        <span>Schedule Ride</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dispatch-ride/cancel">
                        <MdCancel /> {/* Icon for Ride Cancellation */}
                        <span>Ride Cancellation</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* dispatchdriver Management */}
              <li className="links">
                <Link to="/dispatchdriver-management/all">
                  <IoMdPerson />{" "}
                  <span>
                    {isCollapsed ? "" : "Dispatch Driver Management "}
                  </span>
                </Link>
              </li>
              {/* Bookings */}
              <li>
                <div
                  onClick={() => handleMenuClick("bookings")}
                  className={`menu-heading ${
                    activeMenu === "bookings" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <FaCalendarAlt />{" "}
                    <span>{isCollapsed ? "" : "Bookings"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "bookings" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "bookings" && !isCollapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/bookings/booking">
                        <FaCar /> {/* Icon for Vehicle */}
                        <span>Bookings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/bookings/trackingbookings">
                        <GoLocation /> {/* Icon for Vehicle Details */}
                        <span>Tracking Bookings</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* SOS Alerts */}
              <li>
                <div
                  onClick={() => handleMenuClick("sos-alerts")}
                  className={`menu-heading ${
                    activeMenu === "sos-alerts" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <HiBellAlert />{" "}
                    <span>{isCollapsed ? "" : "SOS Alerts"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "sos-alerts" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "sos-alerts" && !isCollapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/sos/incident-log">
                        <RiFileWarningLine /> {/* Icon for Incident Log */}
                        <span>Incident Log</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/sos/alert">
                        <MdNotificationsActive /> {/* Icon for SOS Alert */}
                        <span>SOS Alert</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Price Model */}

              <li className="links">
                <Link to="/price-model">
                  <IoPricetag />{" "}
                  <span>{isCollapsed ? "" : "Price Model "}</span>
                </Link>
              </li>

              {/* Driver Management */}
              <li>
                <div
                  onClick={() => handleMenuClick("driver-management")}
                  className={`menu-heading ${
                    activeMenu === "driver-management" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <RiUser6Fill />{" "}
                    <span>{isCollapsed ? "" : "Driver Management"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "driver-management" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "driver-management" && !isCollapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/drivermanagement/alldrivers">
                        <FaUsers /> {/* Icon for All Drivers */}
                        <span>All Drivers</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/drivers/chat">
                        <BsChatDots /> {/* Icon for Driver Chat */}
                        <span>Driver Request</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Vehicle Management */}
              <li>
                <div
                  onClick={() => handleMenuClick("vehicle-management")}
                  className={`menu-heading ${
                    activeMenu === "vehicle-management" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <FaCarSide />{" "}
                    <span>{isCollapsed ? "" : "Vehicle Management"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "vehicle-management" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "vehicle-management" && !isCollapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/vehicle">
                        <FaCar /> {/* Icon for Vehicle */}
                        <span>Vehicle</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/vehicle/details">
                        <MdDirectionsCar /> {/* Icon for Vehicle Details */}
                        <span>Vehicle Details</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/vehicle/maintenance">
                        <GiCarWheel /> {/* Icon for Vehicle Maintenance */}
                        <span>Vehicle Maintenance</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/vehicle/availability">
                        <MdOutlineEventAvailable />{" "}
                        {/* Icon for Vehicle Availability */}
                        <span>Vehicle Availability</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Invoice Management */}
              <li>
                <div
                  onClick={() => handleMenuClick("invoice-management")}
                  className={`menu-heading ${
                    activeMenu === "invoice-management" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <FaFileInvoice />{" "}
                    <span>{isCollapsed ? "" : "Invoice Management"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "invoice-management" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "invoice-management" && !isCollapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/invoice/all-trips">
                        <FaRegListAlt /> {/* Icon for All Trips */}
                        <span>All Trips</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}

          {/* Dispatch Ride (Dispatcher only) */}
          {role === "Dispatcher" && (
            <>
             <li>
              <div
                onClick={() => handleMenuClick("dispatch-ride")}
                className={`menu-heading ${
                  activeMenu === "dispatch-ride" ? "active" : ""
                }`}
              >
                <div className="left-content">
                  <FaCarAlt /> <span>{collapsed ? "" : "Dispatch Ride"}</span>
                </div>
                <div className="right-content">
                  {activeMenu === "dispatch-ride" ? (
                    <img
                      src={dropdownIcon}
                      alt="Dropdown Up"
                      className="dropdown-icon"
                    />
                  ) : (
                    <img
                      src={dropdownIcon}
                      alt="Dropdown Down"
                      className="dropdown-icon"
                    />
                  )}
                </div>
              </div>
              {activeMenu === "dispatch-ride" && !collapsed && (
                <ul className="dropdown">
                  <li>
                    <Link to="/dispatch-ride/upcoming">
                      <MdOutlineUpcoming /> {/* Icon for Upcoming Ride */}
                      <span>Upcoming Ride</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dispatch-ride/auto">
                      <AiOutlineRobot /> {/* Icon for Auto Dispatch */}
                      <span>Auto Dispatch</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dispatch-ride/schedule">
                      <BsCalendarCheck /> {/* Icon for Schedule Ride */}
                      <span>Schedule Ride</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dispatch-ride/cancel">
                      <MdCancel /> {/* Icon for Ride Cancellation */}
                      <span>Ride Cancellation</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
              {/* dispatchdriver Management */}
              <li className="links">
                <Link to="/dispatchdriver-management/all">
                  <IoMdPerson />{" "}
                  <span>
                    {isCollapsed ? "" : "Dispatch Driver Management "}
                  </span>
                </Link>
              </li>
              {/* Bookings */}
              <li>
                <div
                  onClick={() => handleMenuClick("bookings")}
                  className={`menu-heading ${
                    activeMenu === "bookings" ? "active" : ""
                  }`}
                >
                  <div className="left-content">
                    <FaCalendarAlt />{" "}
                    <span>{isCollapsed ? "" : "Bookings"}</span>
                  </div>
                  <div className="right-content">
                    {activeMenu === "bookings" ? (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Up"
                        className="dropdown-icon"
                      />
                    ) : (
                      <img
                        src={dropdownIcon}
                        alt="Dropdown Down"
                        className="dropdown-icon"
                      />
                    )}
                  </div>
                </div>
                {activeMenu === "bookings" && !isCollapsed && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/bookings/booking">
                        <FaCar /> {/* Icon for Vehicle */}
                        <span>Bookings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/bookings/trackingbookings">
                        <GoLocation /> {/* Icon for Vehicle Details */}
                        <span>Tracking Bookings</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
           
          )}

          {/* Accountant Pages (Accountant only) */}
          {role === "Accountant" && (
            <li>
              <div
                onClick={() => handleMenuClick("invoice-management")}
                className={`menu-heading ${
                  activeMenu === "invoice-management" ? "active" : ""
                }`}
              >
                <div className="left-content">
                  <FaFileInvoice />{" "}
                  <span>{collapsed ? "" : "Invoice Management"}</span>
                </div>
                <div className="right-content">
                  {activeMenu === "invoice-management" ? (
                    <img
                      src={dropdownIcon}
                      alt="Dropdown Up"
                      className="dropdown-icon"
                    />
                  ) : (
                    <img
                      src={dropdownIcon}
                      alt="Dropdown Down"
                      className="dropdown-icon"
                    />
                  )}
                </div>
              </div>
              {activeMenu === "invoice-management" && !collapsed && (
                <ul className="dropdown">
                  <li>
                    <Link to="/invoice/all-trips">
                      <FaRegListAlt /> {/* Icon for All Trips */}
                      <span>All Trips</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </div>
        {/* Footer */}
        <div className="sidebar-footer">
        <Link to="/Profile/AdminProfile">
            <FaUserCircle /> <span>{isCollapsed ? "" : "Profile"}</span>
          </Link>
          
          <Link to="/Settings/Language">
            <SlSettings /> <span>{isCollapsed ? "" : "System Settings"}</span>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
