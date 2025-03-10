import React, { useState } from 'react';
import './AllDrivers.css';
import search from '../../../src/Assets/DispatchIcons/search.png';
import profile from '../../../src/Assets/DispatchIcons/Ellipse 47.png';
import carIconImg from '../../../src/Assets/DispatchIcons/image 34.png';
import car from '../../../src/Assets/DispatchIcons/Car.png';
import tazi from '../../../src/Assets/DispatchIcons/Taxi.png';
import loc from '../../../src/Assets/DispatchIcons/loc-pic.png';
import dri from '../../../src/Assets/DispatchIcons/Male User.png';
import uncheck from '../../../src/Assets/DispatchIcons/uncheck-rb.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';


const AllDrivers = () => {
  const navigate = useNavigate();

  const [drivers] = useState([
    {
      id: 'VIA#747',
      vid: 'VID#123',
      did: 'DRV#567',
      name: 'Hamza Ahmed',
      status: 'Occupied',
      zone: 'North',
      vehType: 'Car',
      image: profile,
      location: [24.8615, 67.0099],
      From: 'Plot No 364 DHA Phase 2 Karachi',
      To: 'New University - Clifton - Karachi',
      ETA: '20 min',
    },
    {
      id: 'VIA#748',
      vid: 'VID#124',
      did: 'DRV#568',
      name: 'Maaz Khan',
      status: 'Available',
      zone: 'South',
      vehType: 'Van',
      image: profile,
      location: [24.8655, 67.0035],
      From: 'Plot No 364 DHA Phase 2 Karachi',
      To: 'New University - Clifton - Karachi',
      ETA: '20 min',
    },
    {
      id: 'VIA#749',
      vid: 'VID#125',
      did: 'DRV#569',
      name: 'Ali Raza',
      status: 'Pickup',
      zone: 'West',
      vehType: 'Bike',
      image: profile,
      location: [24.8670, 67.0120],
      From: 'Plot No 364 DHA Phase 2 Karachi',
      To: 'New University - Clifton - Karachi',
      ETA: '20 min',
    },
    {
      id: 'VIA#750',
      vid: 'VID#126',
      did: 'DRV#570',
      name: 'Maaz Ali',
      status: 'Unavailable',
      zone: 'East',
      vehType: 'Car',
      image: profile,
      location: [24.8690, 67.0150],
      From: 'Plot No 364 DHA Phase 2 Karachi',
      To: 'New University - Clifton - Karachi',
      ETA: '20 min',
    },
    {
      id: 'VIA#751',
      vid: 'VID#127',
      did: 'DRV#571',
      name: 'Murtaza',
      status: 'At Location',
      zone: 'West',
      vehType: 'Car',
      image: profile,
      location: [24.8710, 67.0105],
      From: 'Plot No 364 DHA Phase 2 Karachi',
      To: 'New University - Clifton - Karachi',
      ETA: '20 min',
    },
  ]);

  // Custom car icon
  const carIcon = new L.Icon({
    iconUrl: carIconImg,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isChatBoxVisible, setChatBoxVisible] = useState(false);
  const [activeDriver, setActiveDriver] = useState(null);

  // Filter and search logic
  const filteredDrivers = drivers.filter((driver) => {
    const matchesStatus = filterStatus === 'All' || driver.status === filterStatus;
    const matchesSearch =
      driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.did.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="AD-main-container">
      {/* Driver Details Section */}
      <div className="AD-drivers-container">
        <h3 className="AD-drivers-title">Drivers</h3>

        {/* Filter and Search */}
        <div className="filteration-container">
          {/* Search Box */}
          <div className="drisearch-box commonbox">
            <img src={search} alt="Search" className="drisearch-icon" />
            <input
              type="text"
              placeholder="Search by Name, VID, DID, or Status"
              className="drisearch-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Dropdown */}
          <div className="dristatus-dropdown commonbox">
            <select
              className="dristatus-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Occupied">Occupied</option>
              <option value="Pickup">Pickup</option>
              <option value="At Location">At Location</option>
            </select>
          </div>
        </div>

        {filteredDrivers.map((driver, index) => (
          <div
            key={index}
            className={`AD-drv-card ${
              selectedRide === driver.id ? 'AD-selected-card' : ''
            }`}
            onClick={() => setSelectedRide(driver.id)}
          >
            <div className="AD-drv-card-top">
              <img src={driver.image} alt={driver.name} className="AD-driver-image" />
              <h4 className="AD-drv-id">{driver.name}</h4>
              <div
                className="AD-drv-status"
                style={{
                  backgroundColor:
                    driver.status === 'Occupied'
                      ? '#F77F00'
                      : driver.status === 'Available'
                      ? '#27DE44'
                      : driver.status === 'Unavailable'
                      ? '#A9A9A9'
                      : driver.status === 'Pickup'
                      ? '#6C63FF'
                      : '#007BFF',
                }}
              >
                {driver.status}
              </div>
            </div>

            <div className="AD-drv-card-details">
              <p>
                <strong>VID:</strong> {driver.vid} <strong>DID:</strong> {driver.did}
              </p>
              <p>
                <strong>Zone:</strong> {driver.zone}
              </p>
              <p>
                <strong>Veh Type:</strong> {driver.vehType}
              </p>
            </div>
            <div className="AD-drv-card-actions">
              {driver.status === 'Available' || driver.status === 'Unavailable' ? (
                <>
                  <button
                    className="AD-action-btn"
                    onClick={() => {
                      setActiveDriver(driver);
                      setChatBoxVisible(true);
                    }}
                  >
                    Chat
                  </button>
                  <button
                className="AD-action-btn"
                onClick={() => navigate('/dispatchdriver-management/info')}
              >
                Driver Info
              </button>
                </>
              ) : (
                <>
                  <button className="AD-action-btn">Show Trip</button>
                  <button
                    className="AD-action-btn"
                    onClick={() => {
                      setActiveDriver(driver);
                      setChatBoxVisible(true);
                    }}
                  >
                    Chat
                  </button>
                  <button
                className="AD-action-btn"
                onClick={() => navigate('/dispatchdriver-management/info', { state: { driver } })}
              >
                Driver Info
              </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="AD-map-container">
        {/* Ledger */}
        <div className="AD-header-ledger">
          <div className="AD-status-item">
            <div className="AD-status-dot available"></div>
            <span>Available</span>
          </div>
          <div className="AD-status-item">
            <div className="AD-status-dot unavailable"></div>
            <span>Unavailable</span>
          </div>
          <div className="AD-status-item">
            <div className="AD-status-dot pickup"></div>
            <span>Pickup</span>
          </div>
          <div className="AD-status-item">
            <div className="AD-status-dot at-location"></div>
            <span>At Location</span>
          </div>
          <div className="AD-status-item">
            <div className="AD-status-dot occupied"></div>
            <span>Occupied</span>
          </div>
        </div>
        {/* Map */}
        <MapContainer
          center={[24.8607, 67.0011]}
          zoom={14}
          style={{ height: '600px', width: '100%', borderRadius: '8px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Display car markers */}
          {drivers.map((driver) => {
            if (!driver.location || driver.location.length !== 2) return null; // Skip invalid locations
            return (
              <Marker key={driver.id} position={driver.location} icon={carIcon}>
                <Popup>
                  <div className="AD-popup-content">
                    <p><img src={loc}className="AD-popup-image"/>{driver.From}</p>
                    <div className='AD-vertical'></div>
                    <p><img src={uncheck} className="AD-popup-image"/> {driver.To} </p>
                    <p><img src={dri} className="AD-popup-image" /><strong>{driver.did}  </strong><img src={car} className="AD-popup-image" /><strong>{driver.vid}</strong> </p>
                    <p><img src={tazi}  className="AD-popup-image" /><strong> {driver.id} </strong> </p>
                    <p><strong>State: {driver.status}</strong></p>
                    <p><strong>ETA: {driver.ETA} </strong></p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Chat Box */}
      {isChatBoxVisible && activeDriver && (
        <div className="AD-chat-box">
          <div className="AD-chat-header">
            <h4>Chat</h4>
            <button className="AD-close-btn" onClick={() => setChatBoxVisible(false)}>
              &times;
            </button>
          </div>
          <div className="AD-chat-content">
            <div className="AD-chat-dropdowns">
              <div className="AD-dropdown">{activeDriver.did}</div>
              <div className="AD-dropdown">{activeDriver.vid}</div>
            </div>
            <div className='AD-message'>
              <div className='AD-chatt'></div>
              <textarea
                className="AD-chat-input"
                placeholder="Type your message here..."
              ></textarea>
              <button className="AD-send-btn">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDrivers;
