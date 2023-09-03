import React from "react";
import "./ButtonSecondary.scss";
const ButtonSecondary = ({ fun, children, BackColor, disable }) => {
  return (
    <button
      style={{ backgroundColor: BackColor }}
      type="button"
      disabled={disable}
      className="ButtonSecondary btn-secondary"
      onClick={() => fun()}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
