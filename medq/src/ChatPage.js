import React, { useState } from "react";
import { OpenAI } from "openai";

// Initialize OpenAI API client using the API key from .env
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // API key from .env
});

const ChatPage = () => {
  // State for user input
  const [inputText, setInputText] = useState(""); 
  const [selectedChat, setSelectedChat] = useState(""); // Selected chat
  const [conversationHistory, setConversationHistory] = useState([]); // Conversation history between user and AI
  const [highContrast, setHighContrast] = useState(false); // High contrast mode
  const [displayText, setDisplayText] = useState(""); // Original text for displaying
  
  // Handle input text change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Handle chat selection from the left pane
  const handleChatSelection = (chatName) => {
    setSelectedChat(chatName); // Update selected chat
    setConversationHistory([]); // Reset history for new chat
  };

  // Toggle High Contrast Mode
  const toggleHighContrast = () => {
    setHighContrast(!highContrast); 
  };

    // Handle sending the message to OpenAI
    const handleSendMessage = async () => {
      if (!inputText) return; // Don't send empty messages
  
      // Add the user's message to the conversation history
      const userMessage = { role: "user", content: inputText };
      setConversationHistory((prevHistory) => [...prevHistory, userMessage]);
  
      // Clear the input box
      setInputText("");
  
      try {
        // Send the conversation history to OpenAI API to get a response
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // Use GPT-4 model for chat
          messages: [
            ...conversationHistory,
            userMessage, // Add user's message to the conversation context
          ],
        });
  
        // Get the AI's response
        const aiMessage = {
          role: "system",
          content: completion.choices[0].message.content,
        };
  
        // Update conversation history with AI response
        setConversationHistory((prevHistory) => [...prevHistory, aiMessage]);
      } catch (error) {
        console.error("Error while getting AI response:", error);
      }
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: highContrast ? "#000" : "#fff",
          color: highContrast ? "#fff" : "#000",
          transition: "all 0.3s ease",
        }}
      >
        {/* Title Bar with High Contrast button */}
        <div
          style={{
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            backgroundColor: highContrast ? "#333" : "#f9f9f9",
            color: highContrast ? "#fff" : "#000",
            borderBottom: highContrast ? "1px solid #fff" : "1px solid #ccc",
          }}
        >
          <h1>Welcome to Chat Page</h1>
          <button
            onClick={toggleHighContrast}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: highContrast ? "#ff6600" : "#007BFF",
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
              width: "250px",
              padding: "20px",
              borderRight: highContrast ? "2px solid #fff" : "1px solid #ccc",
              backgroundColor: highContrast ? "#333" : "#f9f9f9",
              color: highContrast ? "#fff" : "#000",
              overflowY: "auto",
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
  
          {/* Right Pane (Chat Interface) */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: highContrast ? "#000" : "#fff",
              color: highContrast ? "#fff" : "#000",
              overflowY: "auto",
            }}
          >
            <p>
              {selectedChat ? `You are chatting with ${selectedChat}` : "Please select a chat"}
            </p>
  
            {/* Display Conversation History */}
            <div>
              {conversationHistory.map((msg, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <strong>{msg.role}:</strong> {msg.content}
                </div>
              ))}
            </div>
  
            {/* User Input and Send Button */}
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
                  border: highContrast ? "2px solid #fff" : "1px solid #ccc",
                  backgroundColor: highContrast ? "#333" : "#fff",
                  color: highContrast ? "#fff" : "#000",
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor: highContrast ? "#ff6600" : "#007BFF",
                  color: "white",
                  border: "none",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatPage;  