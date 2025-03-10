import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import Profile from "./pages/Profile/AdminProfile";
import NotSupported from "./NotSupported";

// Importing existing pages
import Dashboard from "./pages/Dashboard/index";
import ZoneSetup from "./pages/ZoneSetup/ZoneSetup";
import UpcomingRide from "./pages/DispatchRide/UpcomingRide";
import AutoDispatch from "./pages/DispatchRide/AutoDispatch";
import ManualDispatch from "./pages/DispatchRide/ManualDispatch";
import ScheduleRide from "./pages/DispatchRide/ScheduleRide";
import RideCancellation from "./pages/DispatchRide/RideCancellation";
import AllDrivers from "./pages/DispatcherDriverManagement/AllDrivers";
import DriverInfo from "./pages/DispatcherDriverManagement/DriverInfo";
import TrackingBooking from "./pages/TrackingRides/TrackingBooking";
import DriverDetails from "./pages/DriverManagement/DriverDetails";
import DriverChat from "./pages/DriverManagement/DriverChat";
import DriverTrips from "./pages/DriverManagement/DriverTrips";
import DriverDetailsViewMore from "./pages/DriverManagement/DriverDetailsViewMore";
import BookingScreen from "./pages/Bookings/BookingScreen";
import BookingDetails from "./pages/Bookings/BookingDetails";
import IncidentLog from "./pages/SOSAlerts/IncidentLog";
import SOSAlert from "./pages/SOSAlerts/SOSAlert";
import PriceModel from "./pages/PriceModel/PriceModel";
import Drivers from "./pages/DriverManagement/AllDrivers";
import VehicleScreen from "./pages/VehicleManagement/VehicleScreen";
import VehicleDetails from "./pages/VehicleManagement/VehicleDetails";
import VehicleEdit from "./pages/VehicleManagement/VehicleEdit";
import VehicleDeleteAlert from "./pages/VehicleManagement/VehicleDeleteAlert";
import VehicleMaintenance from "./pages/VehicleManagement/VehicleMaintenance";
import VehicleAvailability from "./pages/VehicleManagement/VehicleAvailability";
import VehicleRequestScreen from "./pages/VehicleManagement/VehicleRequestScreen";
import VehicleRequestDetails from "./pages/VehicleManagement/VehicleRequestDetails";
import VehicleRequestDecline from "./pages/VehicleManagement/VehicleRequestDecline";
import AllTrips from "./pages/InvoiceManagement/AllTrips";
import TripDetails from "./pages/InvoiceManagement/TripDetails";
import GeneratedInvoice from "./pages/InvoiceManagement/GeneratedInvoice";
import OTP from "./pages/Login/OTP";
import Passenger from "./pages/Usermanagement/Passenger";
import Accountant from "./pages/Usermanagement/Accountant";
import CreateUser from "./pages/Usermanagement/Createuser";
import Dispatcher from "./pages/Usermanagement/Dispatcher";
import Driver from "./pages/Usermanagement/Driver";
import LanguageSettings from "./pages/Settings/LanguageSettings";
import AppearanceSettings from "./pages/Settings/AppearanceSettings";
import SecurityScreen from "./pages/Settings/SecurityScreen";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/protectedRoutes";
import EditProfile from "./pages/Profile/AdminEdit";
import "./components/layout.css";

const App = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [sessionTimeoutId, setSessionTimeoutId] = useState(null);

  // Assuming that 'isLoggedIn' is stored in localStorage after login
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? "" : menu);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sessionTimeout = () => {
    setShowPopup(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login"; // Redirecting to login on session timeout
    }, 10000);
  };

  const resetSessionTimer = () => {
    clearTimeout(sessionTimeoutId);
    setSessionTimeoutId(setTimeout(sessionTimeout, 60000)); // Reset session timeout on activity
  };

  useEffect(() => {
    // Apply session timeout only if the user is logged in
    if (isLoggedIn) {
      const timeoutId = setTimeout(sessionTimeout, 60000); // Initial session timeout set to 10 minutes
      setSessionTimeoutId(timeoutId);

      document.addEventListener("mousemove", resetSessionTimer);
      document.addEventListener("keypress", resetSessionTimer);
      document.addEventListener("click", resetSessionTimer);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousemove", resetSessionTimer);
        document.removeEventListener("keypress", resetSessionTimer);
        document.removeEventListener("click", resetSessionTimer);
      };
    }
  }, [isLoggedIn]);

  if (!isDesktop) {
    return <NotSupported />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTP />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="*" element={
            <div className="app">
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
                activeMenu={activeMenu}
                handleMenuClick={handleMenuClick}
              />
              <div
                className={`main-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
              >
                <TopBar />
                <div className="content-wrapper">
                  <Routes>
                    {/* Protected Routes for Admin */}
                    <Route element={<ProtectedRoutes allowedRoles={['Admin']} />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/zone-setup" element={<ZoneSetup />} />
                      <Route path="/price-model" element={<PriceModel />} />
                      <Route path="/drivermanagement/alldrivers" element={<Drivers />} />
                      <Route path="/drivermanagement/details" element={<DriverDetails />} />
                      <Route path="/drivermanagement/viewmore" element={<DriverDetailsViewMore />} />
                      <Route path="/invoice/all-trips" element={<AllTrips />} />
                      <Route path="/invoice/trip-details" element={<TripDetails />} />
                      <Route path="/invoice/generated" element={<GeneratedInvoice />} />
                      <Route path="/profile/adminprofile" element={<Profile />} />
                      <Route path="/profile/editprofile" element={<EditProfile />} />
                      <Route path="/settings/language" element={<LanguageSettings />} />
                      <Route path="/settings/appearance" element={<AppearanceSettings />} />
                      <Route path="/settings/security" element={<SecurityScreen />} />
                    </Route>

                    {/* Other routes for dispatcher, accountant, etc. */}
                    <Route element={<ProtectedRoutes allowedRoles={['Dispatcher', 'Admin']} />}>
                      <Route path="/dispatch-ride/upcoming" element={<UpcomingRide />} />
                      <Route path="/dispatch-ride/auto" element={<AutoDispatch />} />
                      <Route path="/dispatch-ride/schedule" element={<ScheduleRide />} />
                      <Route path="/dispatch-ride/cancel" element={<RideCancellation />} />
                      <Route path="/dispatchdriver-management/all" element={<AllDrivers />} />
                      <Route path="/dispatchdriver-management/info" element={<DriverInfo />} />
                      <Route path="/bookings/trackingbookings" element={<TrackingBooking />} />
                      <Route path="/drivers/chat" element={<DriverChat />} />
                      <Route path="/drivers/trips" element={<DriverTrips />} />
                      <Route path="/profile/adminprofile" element={<Profile />} />
                    </Route>

                    <Route element={<ProtectedRoutes allowedRoles={['Accountant', 'Admin']} />}>
                      <Route path="/users/passenger" element={<Passenger />} />
                      <Route path="/users/createuser" element={<CreateUser />} />
                      <Route path="/users/driver" element={<Driver />} />
                      <Route path="/users/accountant" element={<Accountant />} />
                      <Route path="/users/dispatcher" element={<Dispatcher />} />
                    </Route>

                    {/* Other routes for bookings and SOS */}
                    <Route path="/bookings/booking" element={<BookingScreen />} />
                    <Route path="/bookings/details" element={<BookingDetails />} />
                    <Route path="/sos/incident-log" element={<IncidentLog />} />
                    <Route path="/sos/alert" element={<SOSAlert />} />

                    {/* Protected Routes for Admin and Dispatcher */}
                    <Route element={<ProtectedRoutes allowedRoles={['Admin', 'Dispatcher']} />}>
                      <Route path="/vehicle" element={<VehicleScreen />} />
                      <Route path="/vehicle/details" element={<VehicleDetails />} />
                      <Route path="/vehicle/edit" element={<VehicleEdit />} />
                      <Route path="/vehicle/delete-alert" element={<VehicleDeleteAlert />} />
                      <Route path="/vehicle/maintenance" element={<VehicleMaintenance />} />
                      <Route path="/vehicle/availability" element={<VehicleAvailability />} />
                      <Route path="/vehicle/request" element={<VehicleRequestScreen />} />
                      <Route path="/vehicle/request/details" element={<VehicleRequestDetails />} />
                      <Route path="/vehicle/request/decline" element={<VehicleRequestDecline />} />
                    </Route>
                  </Routes>
                </div>
              </div>
            </div>
          } />
        </Route>
      </Routes>

      {showPopup && (
        <div className="session-popup">
          <h2>Session Expired</h2>
          <p>Your session has expired due to inactivity. You will be redirected to the login page shortly.</p>
        </div>
      )}
    </Router>
  );
};

export default App;
