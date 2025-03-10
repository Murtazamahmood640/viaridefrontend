import React, { useState } from "react";
import "../ZoneSetup/ZoneSetup.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaSearch } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";

const ZoneSetup = () => {
  const [zones, setZones] = useState([
    { id: 1, name: "Sadar", volume: "Low", extraFareStatus: false, extraFare: 0, status: true },
    { id: 2, name: "Shah Fasal", volume: "Low", extraFareStatus: false, extraFare: 0, status: true },
    { id: 3, name: "Malir", volume: "Low", extraFareStatus: false, extraFare: 0, status: true },
    { id: 4, name: "Sadar", volume: "Low", extraFareStatus: false, extraFare: 0, status: true },
    { id: 5, name: "Shah Fasal", volume: "Low", extraFareStatus: false, extraFare: 0, status: true },
    { id: 6, name: "Malir", volume: "Low", extraFareStatus: false, extraFare: 0, status: true },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setZoneToDelete(id);
    setIsModalVisible(true);
  };

  const confirmDelete = () => {
    setZones(zones.filter((zone) => zone.id !== zoneToDelete));
    setIsModalVisible(false);
  };

  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ZN-zone-setup">
      <div className={isModalVisible ? "ZN-blur-background" : ""}>
        <div className="ZN-zone-setup-header">
          <h2>Zone Setup</h2>

          <div className="ZN-live-mapp">
            <h3>Zone Name</h3>
            <div className="ZN-zone-input-section">
              <input
                id="zoneName"
                type="text"
                placeholder="Ex: Karachi"
                className="ZN-zone-name-input"
              />
            </div>
            <MapContainer
              center={[24.8607, 67.0011]}
              zoom={12}
              style={{ height: "400px", width: "100%", borderRadius: "8px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[24.8607, 67.0011]}>
                <Popup>
                  Karachi <br /> Central Location.
                </Popup>
              </Marker>
            </MapContainer>
            <div className="ZN-submit-button-wrapper">
              <button className="ZN-submit-button">Submit</button>
            </div>
          </div>
        </div>

        <div className="ZN-zone-list-container">
          <div className="ZN-zone-list">
            <h3>Zone List</h3>
            <div className="ZN-zone-list-search">
              <div className="ZN-search-input-container">
                <input
                  type="text"
                  placeholder="Search by Zone Name"
                  className="ZN-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
              </div>
            </div>
            <div className="ZN-table-wrapper">
              <table className="ZN-zone-table">
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Zone Name</th>
                    <th>Trip Request Volume</th>
                    <th>Extra Fare Status</th>
                    <th>Extra Fare (%)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredZones.map((zone, index) => (
                    <tr key={zone.id}>
                      <td>{index + 1}</td>
                      <td>{zone.name}</td>
                      <td>{zone.volume}</td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={zone.extraFareStatus}
                            onChange={() =>
                              setZones(
                                zones.map((z) =>
                                  z.id === zone.id
                                    ? { ...z, extraFareStatus: !z.extraFareStatus }
                                    : z
                                )
                              )
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={zone.extraFare}
                          onChange={(e) =>
                            setZones(
                              zones.map((z) =>
                                z.id === zone.id
                                  ? { ...z, extraFare: Number(e.target.value) }
                                  : z
                              )
                            )
                          }
                          disabled={!zone.extraFareStatus}
                          className="ZN-extra-fare-input"
                        />
                      </td>
                      <td>
                        <label className="switch">
                          <input type="checkbox" checked={zone.status} readOnly />
                          <span className="slider"></span>
                        </label>
                      </td>
                      <td>
                        <button
                          className="ZN-delete-button"
                          onClick={() => handleDeleteClick(zone.id)}
                        >
                          <BsTrash3/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="ZN-modal">
          <div className="ZN-modal-content">
            <span
              className="ZN-modal-close"
              onClick={() => setIsModalVisible(false)}
            >
              &times;
            </span>
            <div className="ZN-modal-icon">
                <BsTrash3/>
            </div>
            <h2>Delete Zone</h2>
            <p>Are you sure you want to permanently delete this Zone?</p>
            <div className="ZN-modal-actions">
              <button
                className="ZN-modal-cancel"
                onClick={() => setIsModalVisible(false)}
              >
                No, Keep
              </button>
              <button className="ZN-modal-confirm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoneSetup;
