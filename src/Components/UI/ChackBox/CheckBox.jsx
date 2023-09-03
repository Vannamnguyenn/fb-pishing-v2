import React from "react";
import "./CheckBox.scss";
const CheckBox = ({ state, fun }) => {
  return (
    <div className="CheckBox">
      <input
        className="CheckBox__input"
        type="checkbox"
        id="gridCheck"
        disabled={state}
        onChange={() => fun()}
      />
      <label className="CheckBox__label" htmlFor="gridCheck">
        I agree to Terms, Data and Cookies Policy.
      </label>
    </div>
  );
};

export default CheckBox;
