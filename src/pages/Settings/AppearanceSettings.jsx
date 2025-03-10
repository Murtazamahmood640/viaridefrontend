import React, { useState } from "react";
import {Link} from 'react-router-dom';
import "./AppearanceSettings.css";
import { FaLanguage, FaPaintBrush, FaShieldAlt } from "react-icons/fa"; // Importing icons

const AppearanceSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState("System Preference");

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handleSaveChanges = () => {
    alert(`Saved theme: ${selectedTheme}`);
  };

  const handleCancel = () => {
    alert("Changes canceled!");
    // Optionally reset to default values
  };

  return (
    <div className="appearance-settings">
      <h1>System Settings</h1>
      <nav className="appearance-tabs">
      <Link to="/Settings/LanguageSettings">
          <button>Language</button>
          </Link>
        <button className="active">Appearance</button>
        <Link to="/Settings/SecurityScreen">
          <button>Security</button>
          </Link>
      </nav>
      <header className="security-header">
        <h2>Appearance Setting</h2>
      </header>
      <div className="appearance-whole-card">
      <div className="appearance-theme-selection">
        <div
          className={`appearance-theme-card ${selectedTheme === "Light" ? "selected" : ""}`}
          onClick={() => handleThemeChange("Light")}
        >
          <div className="appearance-theme-preview light"></div>
          <button className="appearance-theme-button">Light</button>
        </div>

        <div
          className={`appearance-theme-card ${
            selectedTheme === "System Preference" ? "selected" : ""
          }`}
          onClick={() => handleThemeChange("System Preference")}
        >
          <div className="appearance-theme-preview system"></div>
          <button className="appearance-theme-button">System Preference</button>
        </div>

        <div
          className={`appearance-theme-card ${selectedTheme === "Dark" ? "selected" : ""}`}
          onClick={() => handleThemeChange("Dark")}
        >
          <div className="appearance-theme-preview dark"></div>
          <button className="appearance-theme-button">Dark</button>
        </div>
      </div>
      <div className="appearance-actions">
        <button className="appearance-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="appearance-save-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
