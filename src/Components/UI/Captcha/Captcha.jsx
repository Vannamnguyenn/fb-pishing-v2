import React from "react";
import "./Captcha.scss";
import hCaptchaIcon from "../../../assets/hcapcha2.png";

const Captcha = ({ captcha, setCaptcha }) => {
  return (
    <div className="security__block-check">
      <div className="form-check ms-3 my-auto">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="invalidCheck"
          disabled={captcha}
          onChange={() => (!captcha ? setCaptcha((state) => !state) : null)}
        />
        <label className="form-check-label" htmlFor="invalidCheck">
          I am human
        </label>
      </div>
      <div className="form__check-picture">
        <img src={hCaptchaIcon} alt="hcaptcha" />
      </div>
    </div>
  );
};

export default Captcha;
