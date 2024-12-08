import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OpenAI } from "openai"; // Import OpenAI library
import "./Messages.css"; //Css file for Styling
import patientIcon from "./images/patientIcon.png"; //Patient icon to be displayed on the right

// Using the Open AI API
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});


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
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          // System message setting the context for the clinician role
          { role: "system", content: "You are a clinician providing medical assistance and guidance." },
  
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

  // Summarizing the messages
  const summarizeMessage = async (text, index) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize the following text succinctly. Be sure to include all the key medical terms and numbers mentioned in the original message." }, //Prompt for summarization
          { role: "user", content: text },
        ],
      });

      const summary = response.choices[0].message.content;

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

  //Feedback collection for the summary
  const handleFeedback = (index, value) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, feedback: value }
          : msg
      )
    );
  };

  //Summarizing the whole chat
  const summarizeWholeChat = async () => {
    if (!isMedQEnabled) return; // Only works if MedQ is enabled

    try {
      const fullChat = messages.map((msg) => msg.text).join("\n");

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize the entire conversation succinctly." },
          { role: "user", content: fullChat },
        ],
      });

      const summary = response.choices[0].message.content;

      const smileys = ["😄", "🙂", "😐", "🙁", "😢"];

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Chat Summary",
          summary,
          smileys,
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
                      {isMedQEnabled && (
                        <button
                          className="summarize-button"
                          onClick={() => summarizeMessage(msg.text, index)}
                        >
                          Summarize
                        </button>
                      )}
                      
                      {msg.summary && (
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
