import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './ScheduleRide.css'
import calendaricon from '../../../src/Assets/DispatchIcons/calendar.png'

const ScheduleRide = () => {
  const defaultMapCenter = {
    lat: 24.8607,
    lng: 67.0011
  }
  const defaultZoom = 12
  const [schFilterStatus, setSchFilterStatus] = React.useState('All') // Filter status
  const [schFilterDate, setSchFilterDate] = useState(null) // Selected date
  const [isSchDatePickerOpen, setSchDatePickerOpen] = useState(false) // DatePicker visibility
  const [isSchModalVisible, setSchModalVisible] = useState(false)
  const [selectDriverId, setSelectDriverId] = useState('')

  const availableDrivers = [
    {
      id: 'D001',
      name: 'Ali Khan',
      vehicle: 'Sedan',
      rating: 4.8,
      status: 'Available'
    },
    {
      id: 'D002',
      name: 'Maaz Ali',
      vehicle: 'SUV',
      rating: 4.6,
      status: 'Occupied'
    },
    {
      id: 'D003',
      name: 'Najaf T',
      vehicle: 'Hatchback',
      rating: 4.5,
      status: 'At Location'
    }
  ]

  // Function to return the background color for the status
  const getStatus = status => {
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

  const [scheduleRequests, setScheduleRequests] = React.useState([
    {
      tripId: 'VIA#366',
      passengerName: 'Hamza Ahmed',
      pickupLocation: 'Plot 25, Shahra e Faisal',
      dropoffLocation: 'City Mall, Clifton',
      date: '2024-12-11',
      time: '10:30 pm',
      assignedDriver: 'John Doe',
      status: 'Confirmed'
    },
    {
      tripId: 'VIA#367',
      passengerName: 'Mashal Khalil',
      pickupLocation: 'Plot 12, PECHS Block 4',
      dropoffLocation: 'New University, Gulshan',
      date: '2024-12-10',
      time: '10:30 pm',
      assignedDriver: 'Sharukh Khan',
      status: 'Assigned'
    },
    {
      tripId: 'VIA#368',
      passengerName: 'Shaeroniya Khan',
      pickupLocation: 'Plot 35, Bahadurabad Block 2',
      dropoffLocation: 'New Cafe, DHA Phase 8',
      date: '2024-12-09',
      time: '10:30 pm',
      assignedDriver: '-',
      status: 'Unassigned'
    },
    {
      tripId: 'VIA#369',
      passengerName: 'Maaz Ali',
      pickupLocation: 'Basketball Ground',
      dropoffLocation: 'Plot 10, New Karachi',
      date: '2024-12-08',
      time: '10:30 pm',
      assignedDriver: 'Aryan Khan',
      distanceToPickup: '2.1 miles',
      status: 'Confirmed'
    },
    {
      tripId: 'VIA#370',
      passengerName: 'Ali Khan',
      pickupLocation: 'Plot 56, Gulshan Block 2',
      dropoffLocation: 'XYZ Gym, Clifton',
      date: '2024-12-07',
      time: '10:30 pm',
      assignedDriver: '-',
      status: 'Unassigned'
    },
    {
      tripId: 'VIA#371',
      passengerName: 'Salman Khan',
      pickupLocation: 'Plot 56, Gulshan Block 2',
      dropoffLocation: 'XYZ Gym, Clifton',
      date: '2024-12-04',
      time: '10:30 pm',
      assignedDriver: 'Farhan Saeed',
      status: 'Confirmed'
    },
    {
      tripId: 'VIA#372',
      passengerName: 'Sharukh Khan',
      pickupLocation: 'Plot 56, Gulshan Block 2',
      dropoffLocation: 'XYZ Gym, Clifton',
      date: '2024-12-06',
      time: '10:30 pm',
      assignedDriver: 'Ali Raza',
      status: 'Assigned'
    },
    {
      tripId: 'VIA#373',
      passengerName: 'Sara Khan',
      pickupLocation: 'Plot 56, Gulshan Block 2',
      dropoffLocation: 'XYZ Gym, Clifton',
      date: '2024-12-05',
      time: '10:30 pm',
      assignedDriver: 'Ahmed Ali',
      status: 'Confirmed'
    }
  ])

  // Filter the requests based on the selected status and date
  const SchFilteredRequests = scheduleRequests.filter(req => {
    const matchesStatus =
      schFilterStatus === 'All' || req.status === schFilterStatus
    const matchesDate =
      !schFilterDate ||
      new Date(req.date).toDateString() === schFilterDate.toDateString()
    return matchesStatus && matchesDate
  })

  const handleFilterByDate = date => {
    setSchFilterDate(date)
    setSchDatePickerOpen(false) // Close the DatePicker after selecting
  }

    // Function to reset the filters
    const handleResetFilters = () => {
      setSchFilterStatus('All')
      setSchFilterDate(null)
    }



  const Marker = ({ text, icon }) => (
    <div className='sch-mapmarker-container'>
      <img
        src={icon}
        alt={text}
        className='sch-mapmarker-icon' // Apply CSS class for the icon
      />
      <p className='sch-mapmarker-text'>{text}</p>
    </div>
  )

  return (
    <div className='schedule-ride-screen'>
      <div className='schedule-header'>
        <p className='schedule-heading'>Scheduled Ride Trips</p>
        <div className='schedule-legend'>
          <div className='schedule-legend-colorcode'>
            <p>Confirmed</p>
          </div>
          <div className='schedule-legend-colorcode'>
            <p>Assigned</p>
          </div>
          <div className='schedule-legend-colorcode'>
            <p>Unassigned</p>
          </div>
          <div className='schedule-legend-pick'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/684/684908.png'
              className='marker-icon'
              alt=''
            ></img>
            <p>Pickup</p>
          </div>
          <div className='schedule-legend-drop'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/684/684908.png'
              className='marker-icon'
              alt=''
            ></img>
            <p>Drop-off</p>
          </div>
        </div>
      </div>

      <div className='schedule-container'>
        <div className='schedule-details'>
          <div className='schedule-info'>
            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Request ID:</span>
                <span className='schedule-text'>VIA#366</span>
              </div>
              <div>
                <span className='schedule-title'>Est Miles:</span>
                <span className='schedule-text'>PKR 25.60</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Passenger Name:</span>
                <span className='schedule-text'>Hamza Ahmed</span>
              </div>
              <div>
                <span className='schedule-title'>Est Fare:</span>
                <span className='schedule-text'>PKR 350</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Drop-off Location:</span>
                <span className='schedule-text'>City Mall, Clifton</span>
              </div>
              <div>
                <span className='schedule-title'>Est Mins:</span>
                <span className='schedule-text'>PKR 30</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Contact No:</span>
                <span className='schedule-text'>+92 3346483946</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Received Date:</span>
                <span className='schedule-text'>07/11/2024</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Received Time:</span>
                <span className='schedule-text'>10:30 pm</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Assigned Driver:</span>
                <span className='schedule-text'>John Doe</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Driver ID:</span>
                <span className='schedule-text'>DR#6373</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Driver Contact No:</span>
                <span className='schedule-text'>+92 3647474792</span>
              </div>
            </div>

            <div className='schedule-details-header'>
              <div>
                <span className='schedule-title'>Req Vehicle Type:</span>
                <span className='schedule-text'>Car X</span>
              </div>
            </div>
          </div>
        </div>

        <div className='schmap-container'>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDQDUyn3laOLwAZJCwKtxuOnBlQY_5QXi4'
            }}
            defaultCenter={defaultMapCenter}
            defaultZoom={defaultZoom}
          >
            {/* Marker for Pickup Location */}
            <Marker
              lat={24.8607}
              lng={67.0011}
              text='Pickup'
              icon='https://cdn-icons-png.flaticon.com/512/684/684908.png' // URL to pickup icon
            />
            

            {/* Marker for Drop-off Location */}
            <Marker
              lat={24.8472}
              lng={67.0227}
              text='Dropoff'
              icon='https://cdn-icons-png.flaticon.com/512/684/684908.png' // URL to dropoff icon
            />
          </GoogleMapReact>
        </div>
      </div>

      <div className='schtable-container'>
        {/* Filter Bar */}
        <div className='sch-filter-bar'>
          <select
            className='sch-status-filter'
            value={schFilterStatus} // Filter status state
            onChange={e => setSchFilterStatus(e.target.value)} // Update the filter
          >
            <option value='All'>All Status</option>
            <option value='Confirmed'>Confirmed</option>
            <option value='Assigned'>Assigned</option>
            <option value='Unassigned'>Unassigned</option>
          </select>

          <button
            className='sch-filter-button'
            onClick={() => setSchDatePickerOpen(!isSchDatePickerOpen)}
          >
            <img
              src={calendaricon} // Replace with your image path
              alt='Calendar Icon'
              className='sch-button-icon'
            />
            Filter by Date
          </button>

          {isSchDatePickerOpen && (
            <div className='sch-datepicker-wrapper'>
              <DatePicker
                selected={schFilterDate}
                onChange={handleFilterByDate}
                inline
                className='sch-custom-datepicker'
                calendarClassName="sch-datepicker" 
              />
            </div>
          )}

          {/* Add Reset Filter Button */}
          <button className='dis-reset-filter-button' onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        {/* Requests Table */}
        <div className="sch-requests-table-container">
        <table className='sch-requests-table'>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Passenger Name</th>
              <th>Pickup Location</th>
              <th>Drop-off Location</th>
              <th>Scheduled Date</th>
              <th>Scheduled Time</th>
              <th>Assigned Driver</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {SchFilteredRequests.map((req, index) => (
              <tr key={index}>
                <td>{req.tripId}</td>
                <td>{req.passengerName}</td>
                <td>{req.pickupLocation}</td>
                <td>{req.dropoffLocation}</td>
                <td>{req.date}</td>
                <td>{req.time}</td>
                <td>{req.assignedDriver}</td>
                <td>
                  <span
                    className={`sch-status-badge ${req.status.toLowerCase()}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === 'Confirmed' ? (
                    <p
                      className='sch-view-details'
                    >
                      View Details
                    </p>
                  ) : req.status === 'Assigned' ? (
                    <p
                      className='sch-change-driver'
                      onClick={() => setSchModalVisible(true)} // Show modal on click
                    >
                      Change Driver
                    </p>
                  ) : (
                    <p
                      className='sch-assign'
                      onClick={() => setSchModalVisible(true)} // Show modal on click
                    >
                      Assign
                    </p>
                  )}

                  {/* Modal */}
                  {isSchModalVisible && (
                    <div className='schedule-modal'>
                      <div className='sch-modal-content'>
                        <div className='schedule-modal-header'>
                          <h4 className='schedule-modal-title'>
                            Assign Driver
                          </h4>
                          <button
                            className='sch-close-modal-btn'
                            onClick={() => setSchModalVisible(false)} // Hide modal on close
                          >
                            &times;
                          </button>
                        </div>

                        <div className='sch-modal-details'>
                          <div className='sch-modal-details-info'>
                            <div className='sch-modal-details-row'>
                              <p className='sch-modal-details-title'>
                                Trip ID:
                              </p>
                              <p className='sch-modal-details-text'>VIA#747</p>
                            </div>

                            <div className='sch-modal-details-row'>
                              <p className='sch-modal-details-title'>
                                Passenger Name:
                              </p>
                              <p className='sch-modal-details-text'>
                                Hamza Ahmed
                              </p>
                            </div>

                            <div className='sch-modal-details-row'>
                              <p className='sch-modal-details-title'>
                                Contact No:
                              </p>
                              <p className='sch-modal-details-text'>
                                +92 33537465387
                              </p>
                            </div>

                            <div className='sch-modal-details-row'>
                              <p className='sch-modal-details-title'>
                                Pickup Location:
                              </p>
                              <p className='sch-modal-details-text'>
                                Plot No 364 - DHA Phase 2 - Karachi
                              </p>
                            </div>

                            <div className='sch-modal-details-row'>
                              <p className='sch-modal-details-title'>
                                Dropoff Location:
                              </p>
                              <p className='sch-modal-details-text'>
                                New University - Clifton - Karachi
                              </p>
                            </div>

                            <div className='sch-modal-details-row'>
                              <p className='sch-modal-details-title'>
                                Scheduled Time:
                              </p>
                              <p className='sch-modal-details-text'>01:30 PM</p>
                            </div>

                            <div className='sch-modal-details-row'>
                              <p className='sch-modal-details-title'>
                                Scheduled Date:
                              </p>
                              <p className='sch-modal-details-text'>
                                2024/12/11
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className='sch-driver-title'>Available Drivers:</p>

                        {/* Driver Table */}
                        <table className='sch-driver-table'>
                          <thead>
                            <tr>
                              <th>Driver ID</th>
                              <th>Name</th>
                              <th>Vehicle</th>
                              <th>Rating</th>
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
                                <td>
                                  <span
                                    style={{
                                      backgroundColor: getStatus(driver.status),
                                      color: '#fff',
                                      padding: '5px 10px',
                                      borderRadius: '15px',
                                      display: 'inline-block',
                                      fontSize: '12px',
                                      textAlign: 'center',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
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
                        <p className='sch-driver-select-text'>Select Driver:</p>
                        <div className='sch-modal-footer'>
                          <div className='sch-driver-dropdown'>
                            <select
                              className='sch-dropdown-select'
                              id='sch-driver-select'
                              value={selectDriverId}
                              onChange={e => setSelectDriverId(e.target.value)}
                            >
                              <option value=''>Select Driver </option>
                              {availableDrivers.map(driver => (
                                <option key={driver.id} value={driver.id}>
                                  {driver.name} ({driver.id})
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            className='schedule-ride-btn'
                          >
                            Dispatch Ride
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default ScheduleRide
