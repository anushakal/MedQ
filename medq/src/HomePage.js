import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Importing the CSS file for styling
import patientIcon from "./images/patientIcon.png"; // Importing patient icon image

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate to different pages
  const [isHighContrast, setIsHighContrast] = useState(false); // State to toggle high contrast mode

  // Function to toggle high contrast mode
  const handleHighContrastToggle = () => {
    setIsHighContrast(!isHighContrast); // Toggle the state value
  };

  // Conditionally apply or remove high contrast class to the body
  if (isHighContrast) {
    document.body.classList.add("high-contrast"); 
  } else {
    document.body.classList.remove("high-contrast");
  }

  return (
    <div className="homepage-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
          {/* Hospital Title - Link back to Home Page */}
          <a href="/" 
            className="hospital-title" 
            aria-label="Go to the home page of XYZ Hospital" 
            // ARIA label to describe the action for screen readers
          >
            XYZ Hospital
          </a>
        
        <div className="patient-profile">
          {/* Patient Profile Icon */}
          <img
            src={patientIcon}
            alt="Patient Profile"
            className="patient-icon"
            aria-label="Patient profile icon"
            // ARIA label to describe the profile image for screen readers
          />
          {/* Patient Name */}
          <p className="patient-name" aria-live="polite">
            Anusha Kalbande
          </p>
        </div>
      </header>

      {/* Main Dashboard Section*/}
      <h1 id="dashboard-heading" className="sr-only">
        Anusha's Dashboard
      </h1>
      
      {/* Dashboard Buttons - Navigation options */}
      <div className="dashboard-buttons">
        {/* Button for Messages, navigates to "middle" page */}
        <button 
          className="dashboard-button" 
          onClick={() => navigate("/messages")}
          aria-label="Go to Messages page"
          // ARIA label to describe the button's action
        >
          Messages
        </button>

        {/* Button for Scheduling Appointment */}
        <button 
          className="dashboard-button" 
          aria-label="Go to Schedule Appointment page"
          // ARIA label for appointment scheduling button
        >
          Schedule Appointment
        </button>

        {/* Button for Visitation History */}
        <button 
          className="dashboard-button" 
          aria-label="Go to Visitation History page"
          // ARIA label for visitation history button
        >
          Visitation History
        </button>

        {/* Button for Billing */}
        <button 
          className="dashboard-button" 
          aria-label="Go to Billing page"
          // ARIA label for billing button
        >
          Billing
        </button>
      </div>

      {/* Footer Section with High Contrast Toggle Button */}
      <footer className="dashboard-footer">
        {/* Toggle Button for High Contrast Mode */}
        <ToggleButton 
          onClick={handleHighContrastToggle} 
          isToggled={isHighContrast} 
          aria-label="Toggle high contrast mode"
          // ARIA label for the toggle button to describe its function
        />
      </footer>
    </div>
  );
};

// Toggle Button Component for High Contrast Mode
const ToggleButton = ({ onClick, isToggled }) => {
  return (
    <button 
      onClick={onClick} // Handle button click to toggle the contrast mode
      className={`toggle-button ${isToggled ? 'on' : 'off'}`}
      aria-pressed={isToggled} // Indicates the pressed state of the button
    >
      {/* Display button text based on the contrast mode state */}
      {isToggled ? 'High Contrast: ON' : 'High Contrast: OFF'}
    </button>
  );
};

export default HomePage;
