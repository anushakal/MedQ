import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MiddlePage from "./MiddlePage";
import ChatPage from "./ChatPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/middle" element={<MiddlePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;