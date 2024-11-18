import React from "react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>This is the Middle Page</h1>
      <button
        onClick={() => navigate("/chat")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        Go to Chat Page
      </button>
    </div>
  );
};

export default Messages;
