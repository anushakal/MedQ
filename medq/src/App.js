// Importing necessary modules and components
import React from "react"; // Core library for building UI components
import { Routes, Route } from "react-router-dom"; // Provides routing functionalities
import HomePage from "./HomePage"; // Component for the home page
import Messages from "./Messages"; // Component for the Messages page

// Main application component that defines the routing structure
const App = () => {
  return (
    <div>
      {/* Define the routing structure using the Routes and Route components */}
      <Routes>
        {/* Route for the home page (default path) */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the Messages page */}
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
};

// Exporting the App component to be used in other parts of the app
export default App;