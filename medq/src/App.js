// Importing necessary modules and components
import React from "react"; // Core library for building UI components
import { Routes, Route } from "react-router-dom"; // Provides routing functionalities
import HomePage from "./HomePage"; // Component for the home page
import MiddlePage from "./MiddlePage"; // Component for the middle page
import ChatPage from "./ChatPage"; // Component for the chat page

// Main application component that defines the routing structure
const App = () => {
  return (
    <div>
      {/* Define the routing structure using the Routes and Route components */}
      <Routes>
        {/* Route for the home page (default path) */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the middle page */}
        <Route path="/middle" element={<MiddlePage />} />
        {/* Route for the chat page */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

// Exporting the App component to be used in other parts of the application
export default App;