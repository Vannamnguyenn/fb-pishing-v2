import React from "react";
import "./TextArea.scss";
const TextArea = ({ title }) => {
  return (
    <div className="TextArea">
      <label className="TextArea__label">{title}</label>
      <textarea
        className="TextArea__textarea"
        rows="3"
        cols="45"
        name="description"
      ></textarea>
    </div>
  );
};

export default TextArea;
