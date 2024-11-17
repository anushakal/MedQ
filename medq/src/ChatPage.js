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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Chat Page</h1>
      <p>This is where you can enter and display your summarized messages.</p>
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
            border: "1px solid #ccc",
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
            backgroundColor: "#007BFF",
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
            backgroundColor: "#f9f9f9",
          }}
        >
          <strong>Original Text:</strong> {displayText}
        </div>
      )}

      {/*Display Summary */}
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
            backgroundColor: "#f9f9f9",
          }}
        >
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
