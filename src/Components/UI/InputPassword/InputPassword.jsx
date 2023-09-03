import React, { useState } from "react";
import "./InputPassword.scss";

const InputPassword = ({ children, name, fun, value, placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="InputText">
      <label htmlFor={children} className="InputText__label">
        {children}
      </label>
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <input
          id={children}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          style={{
            width: "100%",
          }}
          className="InputText__input"
          value={value}
          onChange={(e) => fun(e)}
        />
        <img
          style={{
            position: "absolute",
            top: "50%",
            right: 15,
            transform: "translateY(-50%)",
            width: 20,
            height: 20,
          }}
          width={24}
          height={24}
          onClick={() => setShow(!show)}
          src={!show ? "/eye-close.svg" : "/eye.svg"}
          alt=""
        />
      </div>
    </div>
  );
};

export default InputPassword;
