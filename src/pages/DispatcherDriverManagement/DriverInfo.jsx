import React from 'react';
import './DriverInfo.css';
import carImage from '../../../src/Assets/DispatchIcons/image 11.png';
import finishicon from '../../../src/Assets/DispatchIcons/loc-pic.png';
import starticon from '../../../src/Assets/DispatchIcons/uncheck-rb.png';
import waiting from '../../../src/Assets/DispatchIcons/radio.png';
import profilePic from '../../../src/Assets/DispatchIcons/Ellipse 47.png';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: '../../../src/Assets/DispatchIcons/loc-pic.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const DriverInfo = () => {
  const driverData = {
    name: 'Hamza Ahmed',
    email: 'hahmed@gmail.com',
    driverID: 'DRV#525',
    vehicleID: 'VEH#135',
    experience: '4 years',
    phone: '+923124563389',
    rating: 4.8,
    totalTrips: 50,
    vehicle: {
      name: 'Honda Civic',
      type: 'Sedan',
      mileage: '10,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 4,
    },
    tripDetails: [
      { label: 'Start Point', time: '9:01 AM', location: 'New Street 12, DHA Phase 2, Karachi', icon: starticon },
      { label: 'Passenger Pickup', time: '9:15 AM', location: 'Plot No 364, DHA Phase 2, Karachi', icon: waiting },
      { label: 'Passenger Waiting', time: '9:30 AM', location: 'HBL Bank, DHA Phase 2, Karachi', icon: waiting },
      { label: 'Finish Point', time: '10:00 AM', location: 'University, Clifton Block 4, Karachi', icon: finishicon },
    ],
    mapRoute: [
      [24.8607, 67.0011], // Start Point
      [24.8615, 67.0099], // Pickup
      [24.8630, 67.0150], // Waiting
      [24.8710, 67.0250], // Finish
    ],
  };

  return (
    <div className="DI-container">
      <h3 className="DI-title">Driver Information</h3>
      <div className='DI-subcontainer'>
        <div className='DI-name-button'>
          <h3>Hamza Ahmed</h3>
          <button className='DI-buttonn'>Occupied</button>
        </div>
        <div className="DI-card">
          {/* Driver and Vehicle Section */}
          {/* Driver and Vehicle Section */}
          <div className="DI-main-section">
            {/* Vehicle Card */}
            <div className="DI-vehicle-card">
              <img src={carImage} alt="Car" className="DI-vehicle-image" />
              <h3 className="DI-vehicle-title">{driverData.vehicle.name}</h3>
              <div className="DI-stars">⭐⭐⭐⭐⭐</div>
              <div className="DI-vehicle-details">
                <div>
                  <span>Mileage: <strong>{driverData.vehicle.mileage}</strong></span>
                </div>
                <div>
                  <span>Fuel: <strong>{driverData.vehicle.fuel}</strong></span>
                </div>
                <div>
                  <span>Transmission: <strong> {driverData.vehicle.transmission}</strong></span>
                </div>
                <div>
                  <span>Seat: <strong>{driverData.vehicle.seats}</strong></span>
                </div>
              </div>
            </div>

            {/* Driver Information */}
            <div className="DI-driver-details">
              <div className="DI-driver-header">
                <img src={profilePic} alt="Driver" className="DI-driver-image" />
                <div>
                  <h3 className="DI-driver-name">{driverData.name}</h3>
                  <p className="DI-driver-email">{driverData.email}</p>
                </div>
              </div>
              <div className="DI-driver-info">
                <div>
                  <span>Driver ID:</span> <strong>{driverData.driverID}</strong>
                </div>
                <div>
                  <span>Vehicle ID:</span> <strong>{driverData.vehicleID}</strong>
                </div>
                <div>
                  <span>Driver Experience:</span> <strong>{driverData.experience}</strong>
                </div>
                <div>
                  <span>Phone:</span> <strong>{driverData.phone}</strong>
                </div>
                <div>
                  <span>Rating:</span> <strong>⭐ {driverData.rating}</strong>
                </div>
                <div>
                  <span>Total Trips:</span> <strong>{driverData.totalTrips}</strong>
                </div>
              </div>
            </div>
          </div>


          {/* Map and Trip Details */}
          <div className="DI-map-trip">
            <MapContainer center={[24.8607, 67.0011]} zoom={13} className="DI-map">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={driverData.mapRoute} color="blue" />
              {driverData.mapRoute.map((position, index) => (
                <Marker key={index} position={position} icon={customIcon} />
              ))}
            </MapContainer>

            {/* Trip Information */}
            <div className="DI-trip-details">
              <h3>Trip Information</h3>
              <div className='DI-trip-card'>
              <ul>
                {driverData.tripDetails.map((detail, index) => (
                   <li key={index} className="DI-trip-item">
                   <img src={detail.icon} alt={detail.label} className="DI-trip-icon" />
                   <div>
                    <strong>{detail.label}:</strong>
                    <p>{detail.time} - {detail.location}</p>
                  </div>
                  </li>
                ))}
              </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default DriverInfo;
