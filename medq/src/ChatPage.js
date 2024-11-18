import React, { useState } from "react";
import { OpenAI } from "openai";

// Initialize OpenAI API client using the API key from .env
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // API key from .env
});

const ChatPage = () => {
  const [inputText, setInputText] = useState(""); 
  const [selectedChat, setSelectedChat] = useState(""); 
  const [conversationHistory, setConversationHistory] = useState([]); 
  const [highContrast, setHighContrast] = useState(false); 
  const [enableMedQ, setEnableMedQ] = useState(false); // State for "Enable MedQ"

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleChatSelection = (chatName) => {
    setSelectedChat(chatName); 
    setConversationHistory([]); 
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast); 
  };

  const toggleEnableMedQ = () => {
    setEnableMedQ(!enableMedQ); 
  };

  const handleSendMessage = async () => {
    if (!inputText) return; 
  
    const userMessage = { role: "user", content: inputText };
    setConversationHistory((prevHistory) => [...prevHistory, userMessage]);
  
    setInputText("");
  
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
          ...conversationHistory,
          userMessage,
        ],
      });
  
      const aiMessage = {
        role: "system",
        content: completion.choices[0].message.content,
      };
  
      setConversationHistory((prevHistory) => [...prevHistory, aiMessage]);
    } catch (error) {
      console.error("Error while getting AI response:", error);
    }
  };

  const handleSummarize = async (message, index) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize the following message:" },
          { role: "user", content: message },
        ],
      });

      const summary = completion.choices[0].message.content;

      setConversationHistory((prevHistory) =>
        prevHistory.map((msg, i) =>
          i === index ? { ...msg, summary } : msg
        )
      );
    } catch (error) {
      console.error("Error while summarizing message:", error);
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
        <div>
          <button
            onClick={toggleHighContrast}
            style={{
              marginRight: "10px",
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
          <button
            onClick={toggleEnableMedQ}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: enableMedQ ? "#28a745" : "#6c757d",
              color: "white",
              border: "none",
            }}
          >
            Enable MedQ
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
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

        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: highContrast ? "#000" : "#fff",
            color: highContrast ? "#fff" : "#000",
          }}
        >
          <p>{selectedChat ? `You are chatting with ${selectedChat}` : "Please select a chat"}</p>

          <div>
            {conversationHistory.map((msg, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <strong>{msg.role}:</strong> {msg.content}
                {msg.summary && (
                  <p style={{ fontStyle: "italic", color: "#888" }}>Summary: {msg.summary}</p>
                )}
                {enableMedQ && (
                  <button
                    onClick={() => handleSummarize(msg.content, index)}
                    style={{
                      marginTop: "5px",
                      padding: "5px 10px",
                      fontSize: "14px",
                      borderRadius: "5px",
                      backgroundColor: "#007BFF",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Summarize
                  </button>
                )}
              </div>
            ))}
          </div>

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
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                cursor: "pointer",
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