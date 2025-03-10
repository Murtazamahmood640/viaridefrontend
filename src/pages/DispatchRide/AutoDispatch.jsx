import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './AutoDispatch.css'
import calendaricon from '../../../src/Assets/DispatchIcons/calendar.png'

const AutoDispatch = () => {
  const defaultCenter = {
    lat: 24.8607,
    lng: 67.0011
  }
  const defaultZoom = 12
  const [filterStatus, setFilterStatus] = React.useState('All') // Filter status
  const [filterDate, setFilterDate] = useState(null) // Selected date
  const [isDatePickerOpen, setDatePickerOpen] = useState(false) // DatePicker visibility

  const [requests, setRequests] = React.useState([
    {
      requestId: 'VIA#366',
      passengerName: 'Hamza Ahmed',
      pickupLocation: 'Plot 25, Shahra e Faisal',
      dropoffLocation: 'City Mall, Clifton',
      date: '2024-12-11',
      time: '10:30 pm',
      assignedDriver: 'John Doe',
      distanceToPickup: '0.5 miles',
      status: 'Assigned'
    },
    {
      requestId: 'VIA#367',
      passengerName: 'Mashal Khalil',
      pickupLocation: 'Plot 12, PECHS Block 4',
      dropoffLocation: 'New University, Gulshan',
      date: '2024-12-10',
      time: '10:30 pm',
      assignedDriver: 'Sharukh Khan',
      distanceToPickup: '1.5 miles',
      status: 'Accepted'
    },
    {
      requestId: 'VIA#368',
      passengerName: 'Shaeroniya Khan',
      pickupLocation: 'Plot 35, Bahadurabad Block 2',
      dropoffLocation: 'New Cafe, DHA Phase 8',
      date: '2024-12-09',
      time: '10:30 pm',
      assignedDriver: 'Salman Khan',
      distanceToPickup: '2.5 miles',
      status: 'Unassigned'
    },
    {
      requestId: 'VIA#369',
      passengerName: 'Maaz Ali',
      pickupLocation: 'Basketball Ground',
      dropoffLocation: 'Plot 10, New Karachi',
      date: '2024-12-08',
      time: '10:30 pm',
      assignedDriver: 'Aryan Khan',
      distanceToPickup: '2.1 miles',
      status: 'Rejected'
    },
    {
      requestId: 'VIA#370',
      passengerName: 'Ali Khan',
      pickupLocation: 'Plot 56, Gulshan Block 2',
      dropoffLocation: 'XYZ Gym, Clifton',
      date: '2024-12-07',
      time: '10:30 pm',
      assignedDriver: 'Ahmed Khan',
      distanceToPickup: '0.5 miles',
      status: 'Accepted'
    },
    {
      requestId: 'VIA#371',
      passengerName: 'Farhan Ahmed',
      pickupLocation: 'Plot 25, Shahra e Faisal',
      dropoffLocation: 'City Mall, Clifton',
      date: '2024-12-13',
      time: '10:30 pm',
      assignedDriver: 'John Doe',
      distanceToPickup: '0.5 miles',
      status: 'Rejected'
    },
    {
      requestId: 'VIA#372',
      passengerName: 'Sara Khan',
      pickupLocation: 'Plot 25, Shahra e Faisal',
      dropoffLocation: 'City Mall, Clifton',
      date: '2024-12-14',
      time: '10:30 pm',
      assignedDriver: 'John Doe',
      distanceToPickup: '0.5 miles',
      status: 'Assigned'
    }
  ])

  // Filter the requests based on the selected status and date
  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'All' || req.status === filterStatus
    const matchesDate =
      !filterDate ||
      new Date(req.date).toDateString() === filterDate.toDateString()
    return matchesStatus && matchesDate
  })

  const handleFilterByDate = date => {
    setFilterDate(date)
    setDatePickerOpen(false) // Close the DatePicker after selecting
  }

  // Function to reset the filters
  const handleResetFilters = () => {
    setFilterStatus('All')
    setFilterDate(null)
  }

  const Marker = ({ text, icon }) => (
    <div className='mapmarker-container'>
      <img
        src={icon}
        alt={text}
        className='mapmarker-icon' // Apply CSS class for the icon
      />
      <p className='mapmarker-text'>{text}</p>
    </div>
  )

  return (
    <div className='autodispatch-screen'>
      <div className='header'>
        <p className='autodispatch-heading'>Auto Dispatch</p>
        <div className='legend'>
          <div className='legend-colorcode'>
            <p>Available</p>
          </div>
          <div className='legend-colorcode'>
            <p>Assigned</p>
          </div>
          <div className='legend-colorcode'>
            <p>Unassigned</p>
          </div>
          <div className='legend-colorcode'>
            <p>Rejected</p>
          </div>
          <div className='legend-pick'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/684/684908.png'
              className='marker-icon'
              alt=''
            ></img>
            <p>Pickup</p>
          </div>
          <div className='legend-drop'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/684/684908.png'
              className='marker-icon'
              alt=''
            ></img>
            <p>Drop-off</p>
          </div>
        </div>
      </div>

      <div className='autodispatch-container'>
        <div className='autodispatch-details'>
          <div className='autodispatch-info'>
            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Request ID:</span>
                <span className='autodispatch-text'>VIA#366</span>
              </div>
              <div>
                <span className='autodispatch-title'>Est Miles:</span>
                <span className='autodispatch-text'>PKR 25.60</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Passenger Name:</span>
                <span className='autodispatch-text'>Hamza Ahmed</span>
              </div>
              <div>
                <span className='autodispatch-title'>Est Fare:</span>
                <span className='autodispatch-text'>PKR 350</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Drop-off Location:</span>
                <span className='autodispatch-text'>City Mall, Clifton</span>
              </div>
              <div>
                <span className='autodispatch-title'>Est Mins:</span>
                <span className='autodispatch-text'>PKR 30</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Contact No:</span>
                <span className='autodispatch-text'>+92 3346483946</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Received Date:</span>
                <span className='autodispatch-text'>07/11/2024</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Received Time:</span>
                <span className='autodispatch-text'>10:30 pm</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Assigned Driver:</span>
                <span className='autodispatch-text'>John Doe</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Driver ID:</span>
                <span className='autodispatch-text'>DR#6373</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Driver Contact No:</span>
                <span className='autodispatch-text'>+92 3647474792</span>
              </div>
            </div>

            <div className='autodispatch-details-header'>
              <div>
                <span className='autodispatch-title'>Req Vehicle Type:</span>
                <span className='autodispatch-text'>Car X</span>
              </div>
            </div>
          </div>
        </div>

        <div className='admap-container'>
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

      <div className='adtable-container'>
        {/* Filter Bar */}
        <div className='filter-bar'>
          <select
            className='status-filter'
            value={filterStatus} // Filter status state
            onChange={e => setFilterStatus(e.target.value)} // Update the filter
          >
            <option value='All'>All Status</option>
            <option value='Assigned'>Assigned</option>
            <option value='Accepted'>Accepted</option>
            <option value='Rejected'>Rejected</option>
            <option value='Unassigned'>Unassigned</option>
          </select>

          <button
            className='filter-button'
            onClick={() => setDatePickerOpen(!isDatePickerOpen)}
          >
            <img
              src={calendaricon} // Replace with your image path
              alt='Calendar Icon'
              className='button-icon'
            />
            Filter by Date
          </button>

          {isDatePickerOpen && (
            <div className='ad-datepicker-wrapper'>
              <DatePicker
                selected={filterDate}
                onChange={handleFilterByDate}
                inline
                className='ad-custom-datepicker'
                calendarClassName='ad-datepicker'
              />
            </div>
          )}

          {/* Add Reset Filter Button */}
          <button className='dis-reset-filter-button' onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        {/* Requests Table */}
        <div className='ad-requests-table-container'>
          <table className='ad-requests-table'>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Passenger Name</th>
                <th>Pickup Location</th>
                <th>Drop-off Location</th>
                <th>Date and Time</th>
                <th>Assigned Driver</th>
                <th>Distance to Pickup</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req, index) => (
                <tr key={index}>
                  <td>{req.requestId}</td>
                  <td>{req.passengerName}</td>
                  <td>{req.pickupLocation}</td>
                  <td>{req.dropoffLocation}</td>
                  <td>
                    {req.date},{req.time}
                  </td>
                  <td>{req.assignedDriver}</td>
                  <td>{req.distanceToPickup}</td>
                  <td>
                    <span
                      className={`ad-status-badge ${req.status.toLowerCase()}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'Assigned' || req.status === 'Accepted' ? (
                      <p className='ad-view-details'>View Details</p>
                    ) : (
                      <p className='ad-override'>Override</p>
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

export default AutoDispatch
