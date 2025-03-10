import React, { useState } from 'react'
import './RideCancellation.css'
import search from '../../../src/Assets/DispatchIcons/search.png'
import calendaricon from '../../../src/Assets/DispatchIcons/calendar.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const RideCancellation = () => {
  const [isRcDatePickerOpen, setRcDatePickerOpen] = useState(false) // DatePicker visibility
  const [rcSearchText, setRcSearchText] = useState('')
  const [rcSelectedStatus, setRcSelectedStatus] = useState('All')
  const [rcFilterDate, setRcFilterDate] = useState(null) // Selected date
  const [isRcModalVisible, setRcModalVisible] = useState(false)
  const [isRcDetailsModalVisible, setRcDetailsModalVisible] = useState(false)
  const [rcSelectDriverId, setRcSelectDriverId] = useState('')

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

  const handleRcSearch = e => {
    setRcSearchText(e.target.value)
  }

  const handleRcStatusChange = e => {
    setRcSelectedStatus(e.target.value)
  }

  const handleRcDateFilter = date => {
    setRcFilterDate(date)
    setRcDatePickerOpen(false)
  }

  // Function to reset the filters
  const handleResetFilters = () => {
    setRcSelectedStatus('All')
    setRcFilterDate(null)
    setRcSearchText('');    
  }

  const rideData = [
    {
      tripId: 'VIA#366',
      passengerName: 'Hamza Ahmed',
      pickupLocation: 'Plot 25, Shahra e faisal',
      dropoffLocation: 'City Mall, Clifton',
      date: '2024-12-13',
      time: '10:30 pm',
      reason: 'Driver Unavailable',
      status: 'Pending',
      action: 'Reassign'
    },
    {
      tripId: 'VIA#367',
      passengerName: 'Mashal Khalil',
      pickupLocation: 'Plot 12, PECHS Block 4',
      dropoffLocation: 'New University, Gulshan',
      date: '2024-12-12',
      time: '10:30 pm',
      reason: 'Passenger No-Show',
      status: 'Not Available',
      action: 'Notify Passenger'
    },
    {
      tripId: 'VIA#368',
      passengerName: 'Shaeroniya Khan',
      pickupLocation: 'Plot 35, Bahadurabad Block 2',
      dropoffLocation: 'New Cafe, DHA Phase 8',
      date: '2024-12-11',
      time: '10:30 pm',
      reason: 'Vehicle Issue',
      status: 'Reassigned',
      action: 'View Details'
    },
    {
      tripId: 'VIA#369',
      passengerName: 'Maaz Ali',
      pickupLocation: 'Basketball Ground',
      dropoffLocation: 'Plot 10, New Karachi',
      date: '2024-12-10',
      time: '10:30 pm',
      reason: 'Passenger Canceled',
      status: 'Completed',
      action: 'View Details'
    },
    {
      tripId: 'VIA#370',
      passengerName: 'Ali Khan',
      pickupLocation: 'Plot 56, Gulshan Block 2',
      dropoffLocation: 'XYZ Gym, Clifton',
      date: '2024-12-09',
      time: '10:30 pm',
      reason: 'Driver Unavailable',
      status: 'Pending',
      action: 'Reassign'
    },
    {
      tripId: 'VIA#371',
      passengerName: 'Sharukh Khan',
      pickupLocation: 'Plot 12, PECHS Block 2',
      dropoffLocation: 'Hospital, New Karachi',
      date: '2024-12-08',
      time: '10:30 pm',
      reason: 'Passenger No-Show',
      status: 'Not Available',
      action: 'Notify Passenger'
    },
    {
      tripId: 'VIA#372',
      passengerName: 'Salman Khan',
      pickupLocation: 'New Cinema',
      dropoffLocation: 'Plot 10, DHA Phase 4',
      date: '2024-12-07',
      time: '10:30 pm',
      reason: 'Passenger Canceled',
      status: 'Completed',
      action: 'View Details'
    }
  ]

  const filteredData = rideData.filter(ride => {
    const matchesSearch =
      rcSearchText === '' ||
      ride.passengerName.toLowerCase().includes(rcSearchText.toLowerCase()) ||
      ride.tripId.toLowerCase().includes(rcSearchText.toLowerCase())

    const matchesStatus =
      rcSelectedStatus === 'All' || ride.status === rcSelectedStatus

    const matchesDate =
      !rcFilterDate ||
      new Date(ride.date).toDateString() ===
        new Date(rcFilterDate).toDateString()

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className='ride-cancellation'>
      <div className='rc-header'>
        <p className='rc-title'>Ride Cancellation</p>

        <div className='rc-legend'>
          <div className='rc-legend-colorcode'>
            <p>Completed</p>
          </div>
          <div className='rc-legend-colorcode'>
            <p>Pending</p>
          </div>
          <div className='rc-legend-colorcode'>
            <p>Reassigned</p>
          </div>
          <div className='rc-legend-colorcode'>
            <p>Not Available</p>
          </div>
        </div>
      </div>

      <div className='rc-filter-container'>
        <div className='rc-left-group'>
          <div className='rcsearch-box rc-common-box'>
            <img src={search} alt='Search' className='rc-search-icon' />
            <input
              type='text'
              placeholder='Search'
              className='rc-search-input'
              value={rcSearchText}
              onChange={handleRcSearch}
            />
          </div>

          <div className='rc-status-dropdown rc-common-box'>
            <select
              className='rc-status-select'
              value={rcSelectedStatus}
              onChange={handleRcStatusChange}
            >
              <option value='All'>All</option>
              <option value='Pending'>Pending</option>
              <option value='Reassigned'>Reassigned</option>
              <option value='Completed'>Completed</option>
              <option value='Not Available'>Not Available</option>
            </select>
          </div>

          <button
            className='rc-filter-button'
            onClick={() => setRcDatePickerOpen(!isRcDatePickerOpen)}
          >
            <img
              src={calendaricon}
              alt='Calendar Icon'
              className='rc-button-icon'
            />
            Filter by Date
          </button>

          {isRcDatePickerOpen && (
            <div className='rc-datepicker-wrapper'>
              <DatePicker
                selected={rcFilterDate}
                onChange={handleRcDateFilter}
                inline
                className='rc-custom-datepicker'
                calendarClassName='rc-datepicker' /* Scoped custom styles for the calendar */
              />
            </div>
          )}
        </div>
        {/* Add Reset Filter Button */}
        <button className='rc-reset-filter-button' onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>

      <div className='rc-requests-table-container'>
        <table className='rc-ride-table'>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Passenger Name</th>
              <th>Pickup Location</th>
              <th>Drop-off Location</th>
              <th>Date and Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((ride, index) => (
              <tr key={index}>
                <td>{ride.tripId}</td>
                <td>{ride.passengerName}</td>
                <td>{ride.pickupLocation}</td>
                <td>{ride.dropoffLocation}</td>
                <td>
                  {ride.date}, {ride.time}
                </td>
                <td>{ride.reason}</td>
                <td>
                  <span
                    className={`rc-status-badge ${ride.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {ride.status}
                  </span>
                </td>
                <td>
                  {ride.status === 'Completed' ? (
                    <p
                      className='rc-view-details'
                      onClick={() => setRcDetailsModalVisible(true)} // Show modal on click
                    >
                      View Details
                    </p>
                  ) : ride.status === 'Reassigned' ? (
                    <p
                      className='rc-assign'
                      onClick={() => setRcModalVisible(true)} // Show modal on click
                    >
                      Assign
                    </p>
                  ) : ride.status === 'Not Available' ? (
                    <p className='rc-notify-passenger'>Notify Passenger</p>
                  ) : (
                    <p className='rc-reassign'>Reassign</p>
                  )}

                  {/* Manual Dispatch Modal */}
                  {isRcModalVisible && (
                    <div className='rc-modal'>
                      <div className='rc-modal-content'>
                        <div className='rc-modal-header'>
                          <h4 className='rc-modal-title'>Assign Driver</h4>
                          <button
                            className='rc-close-modal-btn'
                            onClick={() => setRcModalVisible(false)} // Hide modal on close
                          >
                            &times;
                          </button>
                        </div>

                        <div className='rc-modal-details'>
                          <div className='rc-modal-details-info'>
                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>Trip ID:</p>
                              <p className='rc-modal-details-text'>
                                {ride.tripId}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Passenger Name:
                              </p>
                              <p className='rc-modal-details-text'>
                                {ride.passengerName}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Contact No:
                              </p>
                              <p className='rc-modal-details-text'>
                                +92 33537465387
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Pickup Location:
                              </p>
                              <p className='rc-modal-details-text'>
                                {ride.pickupLocation}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Dropoff Location:
                              </p>
                              <p className='rc-modal-details-text'>
                                {ride.dropoffLocation}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>Time:</p>
                              <p className='rc-modal-details-text'>
                                {ride.time}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>Date:</p>
                              <p className='rc-modal-details-text'>
                                {ride.date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className='rc-driver-title'>Available Drivers:</p>

                        {/* Driver Table */}
                        <table className='rc-driver-table'>
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
                        <p className='rc-driver-select-text'>Select Driver:</p>
                        <div className='rc-modal-footer'>
                          <div className='rc-driver-dropdown'>
                            <select
                              className='rc-dropdown-select'
                              id='rc-driver-select'
                              value={rcSelectDriverId}
                              onChange={e =>
                                setRcSelectDriverId(e.target.value)
                              }
                            >
                              <option value=''>Select Driver </option>
                              {availableDrivers.map(driver => (
                                <option key={driver.id} value={driver.id}>
                                  {driver.name} ({driver.id})
                                </option>
                              ))}
                            </select>
                          </div>

                          <button className='rc-ride-btn'>Dispatch Ride</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View Details Modal */}
                  {isRcDetailsModalVisible && (
                    <div className='rc-modal'>
                      <div className='rc-modal-content'>
                        <div className='rc-modal-header'>
                          <h4 className='rc-modal-title'>Trip Details</h4>
                          <button
                            className='rc-close-modal-btn'
                            onClick={() => setRcDetailsModalVisible(false)} // Hide modal on close
                          >
                            &times;
                          </button>
                        </div>

                        <div className='rc-modal-details'>
                          <div className='rc-modal-details-info'>
                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>Trip ID:</p>
                              <p className='rc-modal-details-text'>
                                {ride.tripId}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Passenger Name:
                              </p>
                              <p className='rc-modal-details-text'>
                                {ride.passengerName}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Contact No:
                              </p>
                              <p className='rc-modal-details-text'>
                                +92 33537465387
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Pickup Location:
                              </p>
                              <p className='rc-modal-details-text'>
                                {ride.pickupLocation}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>
                                Dropoff Location:
                              </p>
                              <p className='rc-modal-details-text'>
                                {ride.dropoffLocation}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>Time:</p>
                              <p className='rc-modal-details-text'>
                                {ride.time}
                              </p>
                            </div>

                            <div className='rc-modal-details-row'>
                              <p className='rc-modal-details-title'>Date:</p>
                              <p className='rc-modal-details-text'>
                                {ride.date}
                              </p>
                            </div>
                          </div>
                          <p className='rc-reason-title'>
                            Ride Cancellation Reason:
                          </p>
                          <p className='rc-reason-text'>Change my mind</p>
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
  )
}

export default RideCancellation
