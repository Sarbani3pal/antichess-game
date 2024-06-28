// components/StatusDisplay.js
import React from "react";

const StatusDisplay = ({ status }) => {
  return (
    <div className="status-display">
      <h2>{status}</h2>
    </div>
  );
};

export default StatusDisplay;
