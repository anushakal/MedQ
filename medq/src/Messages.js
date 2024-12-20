import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css"; //Css file for Styling
import patientIcon from "./images/patientIcon.png"; //Patient icon to be displayed on the right

const Messages = () => {
  const navigate = useNavigate();
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); //Chat selection
  const [messages, setMessages] = useState([]); // Chat messages
  const [userInput, setUserInput] = useState(""); // Input for user's message
  const [isMedQEnabled, setIsMedQEnabled] = useState(false); // MedQ toggle state

  const handleHighContrastToggle = () => {
    setIsHighContrast(!isHighContrast);
  };

  if (isHighContrast) {
    document.body.classList.add("high-contrast");
  } else {
    document.body.classList.remove("high-contrast");
  }

  //Sample chats 
  const chats = [
    { name: "Dr. XYZ", specialty: "Physician" },
    { name: "Dr. DEF", specialty: "Ophthalmologist" },
    { name: "Dr. GHI", specialty: "Cardiologist" },
    { name: "Dr. JKL", specialty: "Dermatologist" },
  ];


  //Chat functionality
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, newMessage], 
          userInput: userInput
        }), // Send all messages to the server
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error details
        const errorMessage = errorData.error || 'Network response was not ok';
        throw new Error(errorMessage);
      }
      
      // Parse the response as JSON and access content
      const data = await response.json();
      const messageContent = data.content; 

      const aiMessage = {
        sender: "assistant",
        text: messageContent,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
      const errorMessage = {
        sender: "assistant",
        text: "Sorry, I couldn't process your message. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Summarizing the messages
  const summarizeMessage = async (text, index) => {
    try {
      const response = await fetch('http://localhost:5000/api/summarize_msg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userInput: text
        }), // Send all messages to the server
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error details
        const errorMessage = errorData.error || 'Network response was not ok';
        throw new Error(errorMessage);
      }
      
      // Parse the response as JSON and access content
      const data = await response.json();
      const summary = data.content;

      setMessages((prev) =>
        prev.map((msg, i) =>
          i === index
            ? { ...msg, summary }
            : msg
        )
      );
    } catch (error) {
      console.error("Error summarizing message:", error);
    }
  };

  // Feedback collection for the summary
  const handleFeedback = (index, value) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, feedback: value }
          : msg
      )
    );
  };

  // Summarizing the whole chat
  const summarizeWholeChat = async () => {
    if (!isMedQEnabled) return; // Only works if MedQ is enabled

    try {
      console.log("FULL CHAT", messages);
      const fullChat = messages.map((msg) => msg.sender + ": " + msg.text).join("\n");
      console.log(fullChat);

      const response = await fetch('http://localhost:5000/api/summarize_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullChat: fullChat
        }), // Send all messages to the server
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error details
        const errorMessage = errorData.error || 'Network response was not ok';
        throw new Error(errorMessage);
      }
      
      // Parse the response as JSON and access content
      const data = await response.json();
      const summary = data.content;

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Entire Chat Summary: " + summary
        },
      ]);
    } catch (error) {
      console.error("Error summarizing whole chat:", error);
    }
  };

  return (
    <div className="messages-dashboard">
      {/* Dashboard Header: Contains the hospital name and patient profile */}
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

      {/* Back Button and MedQ Button */}
      <div className="back-button-container">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back to the previous page"
        >
          Back
        </button>
        <button
          onClick={() => setIsMedQEnabled(!isMedQEnabled)}
          className="enable-medq-button"
          aria-label="Toggle MedQ"
        >
          {isMedQEnabled ? "Disable MedQ" : "Enable MedQ"}
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
                    <div
                      key={index}
                      className={`chat-message-container ${
                        msg.sender === "user"
                          ? "user-message-container"
                          : "ai-message-container"
                      }`}
                    >
                      <p
                        className={`chat-message ${
                          msg.sender === "user" ? "user-message" : "ai-message"
                        }`}
                      >
                        {msg.text}
                      </p>

                      {isMedQEnabled && !msg.text.startsWith("Entire Chat Summary:") && (
                        <button
                          className="summarize-button"
                          onClick={() => summarizeMessage(msg.text, index)}
                        >
                          Summarize
                        </button>
                      )}

                      {/* Render feedback smileys if the message is "Entire Chat Summary" */}
                      {msg.text.startsWith("Entire Chat Summary:") && (
                        <div className="feedback-container">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <span
                              key={value}
                              className={`feedback-smiley ${
                                msg.feedback === value ? "selected" : ""
                              }`}
                              onClick={() => handleFeedback(index, value)}
                            >
                              {["😡", "☹️", "😐", "🙂", "😄"][value - 1]}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {msg.summary &&  !msg.text.startsWith("Entire Chat Summary:") && (
                        <div className={`chat-message-container ai-message-container`}>
                          <p className="chat-message ai-message">Summary: {msg.summary}</p>
                          <div className="feedback-container">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <span
                                key={value}
                                className={`feedback-smiley ${
                                  msg.feedback === value ? "selected" : ""
                                }`}
                                onClick={() => handleFeedback(index, value)}
                              >
                                {["😡", "☹️", "😐", "🙂", "😄"][value - 1]}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="chat-input">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                  />
                  
                  <button id = "send" onClick={sendMessage}>Send</button>
                  {isMedQEnabled && (
                    <button id="summarize-chat-button" onClick={summarizeWholeChat}>

                      Summarize Entire Chat
                    </button>
                  )}
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

// ToggleButton component to handle the high contrast toggle feature
const ToggleButton = ({ onClick, isToggled }) => {
  return (
    <button   // Button element that toggles high contrast mode
      onClick={onClick}
      className={`toggle-button ${isToggled ? "on" : "off"}`}
      aria-pressed={isToggled}
    >
      {isToggled ? "High Contrast: ON" : "High Contrast: OFF"}
    </button>
  );
};

export default Messages;
