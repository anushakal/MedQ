import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OpenAI } from "openai"; // Import OpenAI library
import "./Messages.css";
import patientIcon from "./images/patientIcon.png";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Messages = () => {
  const navigate = useNavigate();
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]); // Chat messages
  const [userInput, setUserInput] = useState(""); // Input for user's message

  const handleHighContrastToggle = () => {
    setIsHighContrast(!isHighContrast);
  };

  if (isHighContrast) {
    document.body.classList.add("high-contrast");
  } else {
    document.body.classList.remove("high-contrast");
  }

  const chats = [
    { name: "Dr. XYZ", specialty: "Physician" },
    { name: "Dr. DEF", specialty: "Ophthalmologist" },
    { name: "Dr. GHI", specialty: "Cardiologist" },
    { name: "Dr. JKL", specialty: "Dermatologist" },
  ];

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          ...messages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: userInput },
        ],
      });

      const aiMessage = {
        sender: "assistant",
        text: response.choices[0].message.content,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      const errorMessage = {
        sender: "assistant",
        text: "Sorry, I couldn't process your message. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="messages-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="title-section">
          <a
            href="/"
            className="hospital-title"
            aria-label="Go to the home page of XYZ Hospital"
          >
            XYZ Hospital
          </a>
        </div>
        <div className="patient-profile">
          <img
            src={patientIcon}
            alt="Patient Profile"
            className="patient-icon"
            aria-label="Patient profile icon"
          />
          <p className="patient-name" aria-live="polite">
            Anusha Kalbande
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="back-button-container">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back to the previous page"
        >
          Back
        </button>
      </div>

      {/* Messages Section */}
      <div className="messages-section">
        <div className="messages-layout">
          <div className="chat-list">
            <h2>Your Chats</h2>
            <ul>
              {chats.map((chat, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedChat(chat);
                    setMessages([]);
                  }}
                >
                  {chat.name} - {chat.specialty}
                </li>
              ))}
            </ul>
          </div>

          <div className="chat-details">
            {selectedChat ? (
              <div>
                <h3>
                  Chat with {selectedChat.name}, {selectedChat.specialty}
                </h3>
                <div className="chat-history">
                  {messages.map((msg, index) => (
                    <p
                      key={index}
                      className={`chat-message ${
                        msg.sender === "user" ? "user-message" : "ai-message"
                      }`}
                    >
                      {msg.text}
                    </p>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            ) : (
              <h3>Select a chat to begin</h3>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <ToggleButton
          onClick={handleHighContrastToggle}
          isToggled={isHighContrast}
          aria-label="Toggle high contrast mode"
        />
      </footer>
    </div>
  );
};

const ToggleButton = ({ onClick, isToggled }) => {
  return (
    <button
      onClick={onClick}
      className={`toggle-button ${isToggled ? "on" : "off"}`}
      aria-pressed={isToggled}
    >
      {isToggled ? "High Contrast: ON" : "High Contrast: OFF"}
    </button>
  );
};

export default Messages;
