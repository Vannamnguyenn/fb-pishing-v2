import React from "react";
import "./Progress.scss";
const Progress = () => {
  return (
    <div className="Progress">
      <div className="Progress__bar" />
      <div className="Progress__nav">
        <p className="Progress__point Progress__point--left">Select Asset</p>
        <p className="Progress__point">Select The Issue</p>
        <p className="Progress__point">Get Help</p>
      </div>
    </div>
  );
};

export default Progress;
