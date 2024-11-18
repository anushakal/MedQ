// Importing necessary modules and components from external libraries and local files
import React from "react"; // Core library for building UI components
import ReactDOM from "react-dom/client"; // Library for rendering React components to the DOM
import { BrowserRouter } from "react-router-dom"; // Provides routing capabilities for React applications
import App from "./App"; // Main application component

// Creating a root DOM element for the React application
const root = ReactDOM.createRoot(document.getElementById("root")); // Targeting the HTML element with id 'root'

// Rendering the main React component, wrapped with BrowserRouter to enable routing
root.render(
  <BrowserRouter>
    {/* BrowserRouter enables navigation and URL handling for the app */}
    <App />
    {/* App component contains the structure and logic of the application */}
  </BrowserRouter>
);
