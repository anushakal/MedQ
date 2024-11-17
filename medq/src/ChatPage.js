import React, { useState } from "react";
import { OpenAI } from "openai";

// Initialize OpenAI API client using the API key from the .env file
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Using the API key from .env
  dangerouslyAllowBrowser: true,
});

const ChatPage = () => {
  const [inputText, setInputText] = useState(""); // State to store user input
  const [displayText, setDisplayText] = useState(""); // State to store displayed text
  const [summary, setSummary] = useState(""); // State to store the summary
  const [highContrast, setHighContrast] = useState(false); // State to toggle high-contrast mode
  const [selectedChat, setSelectedChat] = useState(""); // State to store selected chat name

  const handleInputChange = (event) => {
    setInputText(event.target.value); // Update inputText as the user types
  };

  const handleButtonClick = async () => {
    // Send inputText to OpenAI for summarization
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the appropriate model (e.g., GPT-4)
        messages: [
          {
            role: "user",
            content: `Summarize the following text: "${inputText}"`,
          },
        ],
      });

      const summarizedText = completion.choices[0].message.content;
      setSummary(summarizedText); // Set the summary as the displayed text
      setDisplayText(inputText); // Set the original inputText to displayText

    } catch (error) {
      console.error("Error while summarizing:", error);
      setSummary("Sorry, something went wrong while summarizing.");
    }

    setInputText(""); // Clear the input field after submission
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast); // Toggle the high-contrast mode
  };

  const handleChatSelection = (chatName) => {
    setSelectedChat(chatName); // Update the selected chat when clicked
  };

  return (
    <div
      style={{
        display: "flex", // Flexbox layout for left and right panes
        flexDirection: "column", // Stack title bar above the main content
        height: "100vh", // Full height for the layout
        backgroundColor: highContrast ? "#000" : "#fff", // Background color for the page
        color: highContrast ? "#fff" : "#000", // Text color
        transition: "all 0.3s ease", // Smooth transition for theme change
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          height: "60px", // Set the height for the title bar
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor: highContrast ? "#333" : "#f9f9f9", // Background for title bar
          color: highContrast ? "#fff" : "#000", // Title text color
          borderBottom: highContrast ? "1px solid #fff" : "1px solid #ccc", // Border under title bar
        }}
      >
        <h1>Welcome to Chat Page</h1>
        {/* High Contrast Button */}
        <button
          onClick={toggleHighContrast}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: highContrast ? "#ff6600" : "#007BFF", // Button color change
            color: "white",
            border: "none",
          }}
        >
          High Contrast
        </button>
      </div>

      {/* Main Content: Left and Right Panes */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Pane (Chat List) */}
        <div
          style={{
            width: "250px", // Fixed width for the left pane
            padding: "20px",
            borderRight: highContrast ? "2px solid #fff" : "1px solid #ccc", // Border color change
            backgroundColor: highContrast ? "#333" : "#f9f9f9", // Background change
            color: highContrast ? "#fff" : "#000", // Text color change
            overflowY: "auto", // Enable scrolling if chat list is long
          }}
        >
          <h2>Chats</h2>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li
              onClick={() => handleChatSelection("Mr XYZ")}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              Mr XYZ
            </li>
            <li
              onClick={() => handleChatSelection("Mr ABC")}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              Mr ABC
            </li>
            <li
              onClick={() => handleChatSelection("Ms PQR")}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              Ms PQR
            </li>
          </ul>
        </div>

        {/* Right Pane (Existing code for text input and summarization) */}
        <div
          style={{
            flex: 1, // Take remaining space
            padding: "20px",
            backgroundColor: highContrast ? "#000" : "#fff", // Right pane background
            color: highContrast ? "#fff" : "#000", // Text color for right pane
            overflowY: "auto", // Enable scrolling if content overflows
          }}
        >
          <p>
            {selectedChat ? `You are chatting with ${selectedChat}` : "Please select a chat"}
          </p>

          {/* Input Text Box */}
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your message here"
              style={{
                width: "300px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: highContrast ? "2px solid #fff" : "1px solid #ccc", // Input border color
                backgroundColor: highContrast ? "#333" : "#fff", // Input background change
                color: highContrast ? "#fff" : "#000", // Input text color change
              }}
            />
            <button
              onClick={handleButtonClick}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: highContrast ? "#ff6600" : "#007BFF", // Button color change
                color: "white",
                border: "none",
              }}
            >
              Summarize
            </button>
          </div>

          {/* Display Original Text */}
          {displayText && (
            <div
              style={{
                marginTop: "30px",
                padding: "10px",
                fontSize: "18px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "50%",
                margin: "20px auto",
                backgroundColor: highContrast ? "#333" : "#f9f9f9", // Background change
                color: highContrast ? "#fff" : "#000", // Text color change
              }}
            >
              <strong>Original Text:</strong> {displayText}
            </div>
          )}

          {/* Display Summary */}
          {summary && (
            <div
              style={{
                marginTop: "30px",
                padding: "10px",
                fontSize: "18px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "50%",
                margin: "20px auto",
                backgroundColor: highContrast ? "#333" : "#f9f9f9", // Summary background change
                color: highContrast ? "#fff" : "#000", // Text color change
              }}
            >
              <strong>Summary:</strong> {summary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;