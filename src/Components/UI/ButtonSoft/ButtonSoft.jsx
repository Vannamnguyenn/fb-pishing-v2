import React from "react";
import "./ButtonSoft.scss";
const ButtonSoft = ({ children, disabled, fun }) => {
  return (
    <button onClick={() => fun()} className="ButtonSoft" disabled={!disabled}>
      {children}
    </button>
  );
};

export default ButtonSoft;
