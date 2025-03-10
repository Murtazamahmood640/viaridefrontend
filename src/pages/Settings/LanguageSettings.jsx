import React, { useState } from "react";
import "./LanguageSettings.css";
import { Link } from "react-router-dom";
import { FaLanguage, FaPaintBrush, FaShieldAlt } from "react-icons/fa"; // Importing icons

const LanguageSettings = () => {
  const [defaultLanguage, setDefaultLanguage] = useState("English");
  const [languages, setLanguages] = useState([
    { name: "English", code: "en", direction: "ltr", status: true },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [newLanguage, setNewLanguage] = useState(""); // Input for new language
  const [newCode, setNewCode] = useState(""); // Input for language code
  const [newDirection, setNewDirection] = useState("ltr"); // Direction (ltr/rtl)

  const handleLanguageChange = (event) => {
    setDefaultLanguage(event.target.value);
  };

  const toggleStatus = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].status = !updatedLanguages[index].status;
    setLanguages(updatedLanguages);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddLanguage = () => {
    if (newLanguage && newCode) {
      setLanguages([
        ...languages,
        { name: newLanguage, code: newCode, direction: newDirection, status: true },
      ]);
      setNewLanguage("");
      setNewCode("");
      setNewDirection("ltr");
      toggleModal();
    } else {
      alert("Please fill out all fields!");
    }
  };

  return (
    <div className="languages-system-settings">
      {/* Header */}
        <h1>System Settings</h1>
        <nav className="languages-tabs">
          <button className="active">Languages</button>
        
          <Link to="/Settings/security">
            <button>Security</button>
          </Link>
        
        </nav>
        <header className="security-header">
        <h2>Language Setting</h2>
      </header>

      {/* System Default Languages */}
      <div className="default-language-section">
        <h2>System Default Languages</h2>
        <p>
          Here you select a default language for your full system
         
        </p>
      </div>

      {/* Languages List */}
      <div className="languages-list-section">
        <h2>
          Languages List
          <button className="add-language-button" onClick={toggleModal}>
            + Add New Language
          </button>
        </h2>

        <table className="languages-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Languages Name</th>
              <th>Short Code</th>
              <th>Direction</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{lang.name}</td>
                <td>{lang.code}</td>
                <td>{lang.direction}</td>
                <td>
                  <label className="languages-switch">
                    <input
                      type="checkbox"
                      checked={lang.status}
                      onChange={() => toggleStatus(index)}
                    />
                    <span className="languages-slider round"></span>
                  </label>
                </td>
                <td>
                  <button
                    className="languages-delete-button"
                    onClick={() => {
                      setLanguages(languages.filter((_, i) => i !== index));
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="languages-modal">
          <div className="languages-modal-content">
            <h2>
              New Language
              <button className="languages-close-icon" onClick={toggleModal}>
                ✖
              </button>
            </h2>
            <hr className="languages" />
            <div className="languages-modal-body">
              <label>Language Name:</label>
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Enter language name"
              />
              <label>Short Code:</label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Enter language code"
              />
              <label>Direction:</label>
              <select
                value={newDirection}
                onChange={(e) => setNewDirection(e.target.value)}
              >
                <option value="ltr">Left-to-Right</option>
                <option value="rtl">Right-to-Left</option>
              </select>
            </div>
            <div className="languages-modal-footer">
              <button className="languages-close-button" onClick={toggleModal}>
                Close
              </button>
              <button className="languages-add-button" onClick={handleAddLanguage}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSettings;
