import React, { useState } from 'react'
import './UpcomingRide.css'
import search from '../../../src/Assets/DispatchIcons/search.png'
import dropdown from '../../../src/Assets/DispatchIcons/expand-arrow.png'
import pickup from '../../../src/Assets/DispatchIcons/uncheck-rb.png'
import dropoff from '../../../src/Assets/DispatchIcons/loc-pic.png'
import drivericon from '../../../src/Assets/DispatchIcons/taxidriver.png'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'


const UpcomingRide = () => {
  const defaultCenter = {
    lat: 24.8607,
    lng: 67.0011
  }
  const defaultZoom = 14

  const Marker = ({ text, icon }) => (
    <div className='marker-container'>
      <img
        src={icon}
        alt={text}
        className='marker-icon' // Apply CSS class for the icon
      />
      <p className='marker-text'>{text}</p>
    </div>
  )

  // State for rides, filter, search, selected ride, and modal visibility
  const [rides] = useState([
    {
      id: 'VIA#747',
      vehicle: 'Sedan',
      pickup: 'Plot No 364 - DHA Phase 2 - Karachi',
      dropoff: 'New University - Clifton - Karachi',
      status: 'Not Assigned'
    },
    {
      id: 'VIA#748',
      vehicle: 'SUV',
      pickup: 'Plot No 21 - PECHS Block 2 - Karachi',
      dropoff: 'New Cafe - Sindhi Muslim - Karachi',
      status: 'Assigned'
    },
    {
      id: 'VIA#749',
      vehicle: 'Hatchback',
      pickup: 'Gulshan-e-Iqbal - Karachi',
      dropoff: 'Airport - Karachi',
      status: 'Not Assigned'
    }
  ])

  const [filterStatus, setFilterStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRide, setSelectedRide] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedDriverId, setSelectedDriverId] = useState('')
  const [email, setEmail] = useState("");

React.useEffect(() => {
  const storedEmail = localStorage.getItem("email");
  if (storedEmail) setEmail(storedEmail);
}, []);


  const availableDrivers = [
    {
      id: 'D001',
      name: 'Ali Khan',
      vehicle: 'Sedan',
      rating: 4.8,
      proximity: 4.2,
      status: 'Available'
    },
    {
      id: 'D002',
      name: 'Maaz Ali',
      vehicle: 'SUV',
      rating: 4.6,
      proximity: 2.2,
      status: 'Occupied'
    },
    {
      id: 'D003',
      name: 'Najaf T',
      vehicle: 'Hatchback',
      rating: 4.5,
      proximity: 3.2,
      status: 'At Location'
    }
  ]

  // Filter and search logic
  const filteredRides = rides.filter(ride => {
    const matchesStatus = filterStatus === 'All' || ride.status === filterStatus
    const matchesSearch =
      ride.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleDispatchRide = async () => {
    try {
      const ride = rides.find(r => r.id === selectedRide);
      const driver = availableDrivers.find(d => d.id === selectedDriverId);
  
      if (!ride || !driver) {
        alert("Please select a valid ride and driver.");
        return;
      }
  
      // Log the dispatch action
      await axios.post("http://localhost:4000/api/viaRide/info", {
        level: "INFO",
        message: `Ride ${ride.id} dispatched to driver ${driver.name} (${driver.id}) by ${email}.`,
        timestamp: new Date().toISOString(),
      });
  
      // Optionally, you can update ride status or close modal here
      setModalVisible(false);
      alert("Ride dispatched and log saved.");
    } catch (error) {
      console.error("Error dispatching ride:", error);
  
      await axios.post("http://localhost:4000/api/viaRide/error", {
        level: "ERROR",
        message: `Failed to dispatch ride ${selectedRide} by ${email}: ${
          error.response?.data?.message || error.message
        }`,
        timestamp: new Date().toISOString(),
      });
  
      alert("Dispatch failed. Error logged.");
    }
  };
  

  // Function to return the background color for the status
  const getStatusColor = status => {
    switch (status) {
      case 'Occupied':
        return '#FA9949' // Orange
      case 'At Location':
        return '#2B83F6' // Green
      case 'Available':
        return '#27DE44' // Blue
      case 'Pickup':
        return '#9c27b0' // Purple
      default:
        return '#000' // Black for unknown status
    }
  }

  return (
    <div className='upcoming-screen'>
      <div className='upcoming-rides-header'>
        <h3 className='upcoming-rides-title'>Upcoming Rides</h3>
      </div>

      <div className='main-content-container'>
        <div className='upcoming-rides-container'>
          {/* Filter and Search */}
          <div className='dis-filter-container'>
            {/* Search Box */}
            <div className='dissearch-box dis-common-box'>
              <img src={search} alt='Search' className='dissearch-icon' />
              <input
                type='text'
                placeholder='Search'
                className='dissearch-input'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Dropdown */}
            <div className='dis-status-dropdown dis-common-box'>
              <select
                className='dis-status-select'
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value='All'>All</option>
                <option value='Not Assigned'>Not Assigned</option>
                <option value='Assigned'>Assigned</option>
              </select>
            </div>
          </div>

          {filteredRides.map((ride, index) => (
            <div
              key={index}
              className={`ride-card ${
                selectedRide === ride.id ? 'selected-card' : ''
              }`}
              onClick={() => setSelectedRide(ride.id)}
            >
              <div className='ride-card-top'>
                <h4 className='ride-id'>{ride.id}</h4>
                <div
                  className='ride-status'
                  style={{
                    backgroundColor:
                      ride.status === 'Assigned' ? '#27DE44' : 'red'
                  }}
                >
                  <p className='ride-status-text'>{ride.status}</p>
                </div>
              </div>
              <p className='ride-vehicle'>{ride.vehicle}</p>

              <div className='ride-location-container'>
                <div className='pickup-section'>
                  <img src={pickup} alt='Pickup' className='icon' />
                  <p className='location-text'> {ride.pickup}</p>
                </div>
                <div className='vertical-line'></div>
                <div className='dropoff-section'>
                  <img src={dropoff} alt='Drop-off' className='icon' />
                  <p className='location-text'> {ride.dropoff}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className='map-container'>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDQDUyn3laOLwAZJCwKtxuOnBlQY_5QXi4'
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
          >
            {/* Marker for Pickup Location */}
            <Marker
              lat={24.8607}
              lng={67.0011}
              className='marker'
              text='Pickup'
              icon='https://cdn-icons-png.flaticon.com/512/684/684908.png' // URL to pickup icon
            />

            {/* Marker for Drop-off Location */}
            <Marker
              lat={24.8652}
              lng={67.0085}
              text='Dropoff'
              icon='https://cdn-icons-png.flaticon.com/512/684/684908.png' // URL to dropoff icon
            />
          </GoogleMapReact>

          {/* Dispatch Buttons */}
          {selectedRide &&
            rides.find(ride => ride.id === selectedRide).status ===
              'Not Assigned' && (
              <div className='dispatch-buttons'>
                <div className='assign-driver'>
                  <div className='assign-driver-img'>
                    <img
                      src={drivericon}
                      alt='drivericon'
                      className='assign-driver-icon'
                    ></img>
                  </div>
                  <p className='assign-driver-text'>Assign Driver</p>
                </div>
                <button
                  className='manual-dispatch-btn'
                  onClick={() => setModalVisible(true)}
                >
                  Manual Dispatch
                </button>
              </div>
            )}
        </div>

        {/* Modal */}
        {isModalVisible && (
          <div className='dispatch-modal'>
            <div className='up-modal-content'>
              <div className='dispatch-modal-header'>
                <h4 className='dispatch-modal-title'>Dispatch Details</h4>
                <button
                  className='close-modal-btn'
                  onClick={() => setModalVisible(false)}
                >
                  &times;
                </button>
              </div>

              <div className='up-modal-details'>
                <div className='up-modal-details-info'>
                  <div className='up-modal-details-row'>
                    <p className='up-modal-details-title'>Trip ID:</p>
                    <p className='up-modal-details-text'>VIA#747</p>
                  </div>

                  <div className='up-modal-details-row'>
                    <p className='up-modal-details-title'>Passenger Name:</p>
                    <p className='up-modal-details-text'>Hamza Ahmed</p>
                  </div>

                  <div className='up-modal-details-row'>
                    <p className='up-modal-details-title'>Contact No:</p>
                    <p className='up-modal-details-text'>+92 33537465387</p>
                  </div>

                  <div className='up-modal-details-row'>
                    <p className='up-modal-details-title'>Pickup Location:</p>
                    <p className='up-modal-details-text'>
                      Plot No 364 - DHA Phase 2 - Karachi
                    </p>
                  </div>

                  <div className='up-modal-details-row'>
                    <p className='up-modal-details-title'>Dropoff Location:</p>
                    <p className='up-modal-details-text'>
                      New University - Clifton - Karachi
                    </p>
                  </div>

                  <div className='up-modal-details-row'>
                    <p className='up-modal-details-title'>Request Time:</p>
                    <p className='up-modal-details-text'>01:30 PM</p>
                  </div>
                </div>
              </div>

              <p className='up-driver-title'>Available Drivers</p>

              {/* Driver Table */}
              <table className='up-driver-table'>
                <thead>
                  <tr>
                    <th>Driver ID</th>
                    <th>Name</th>
                    <th>Vehicle</th>
                    <th>Rating</th>
                    <th>Proximity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {availableDrivers.map(driver => (
                    <tr key={driver.id}>
                      <td>{driver.id}</td>
                      <td>{driver.name}</td>
                      <td>{driver.vehicle}</td>
                      <td>{driver.rating}</td>
                      <td>{driver.proximity} m</td>
                      {/* Add status, e.g., Available / Occupied */}
                      <td>
                        <span
                          style={{
                            backgroundColor: getStatusColor(driver.status),
                            color: '#fff', // Ensures text is visible on colored background
                            padding: '5px 10px', // Adjust padding to fit better
                            borderRadius: '15px', // Rounded corners
                            display: 'inline-block', // Ensure it's inline for proper alignment
                            fontSize: '12px', // Smaller font size to fit better
                            maxWidth: '100%', // Prevent overflow
                            textAlign: 'center', // Center-align text
                            whiteSpace: 'nowrap', // Prevent text from wrapping
                            overflow: 'hidden', // Hide overflowed text
                            textOverflow: 'ellipsis' // Add ellipsis if text overflows
                          }}
                        >
                          {driver.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Driver Dropdown */}

              <p className='up-driver-select-text'>Select Driver:</p>
              <div className='up-modal-footer'>
                <div className='up-driver-dropdown'>
                  <select
                    className='up-dropdown-select'
                    id='driver-select'
                    value={selectedDriverId}
                    onChange={e => setSelectedDriverId(e.target.value)}
                  >
                    <option value=''>Select Driver </option>
                    {availableDrivers.map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} ({driver.id})
                      </option>
                    ))}
                  </select>
                </div>

                <button className='up-dispatch-ride-btn' onClick={handleDispatchRide}>Dispatch Ride</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingRide
