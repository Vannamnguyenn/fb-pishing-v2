import React, { useState } from "react";
import "./SecurityCheck.scss";
import meta from "../../../assets/meta.png";
import ButtonBright from "../../UI/ButtonBright/ButtonBright";
import captchaImage from "../../../assets/captcha.png";
import Captcha from "../../UI/Captcha/Captcha";
import { useNavigate } from "react-router-dom";

const SecurityCheck = () => {
  const [captcha, setCaptcha] = useState(false);
  const router = useNavigate();
  const changePage = () => {
    if (captcha) {
      router("/started");
    }
  };
  return (
    <div className="security col-12">
      <div className="security__block col-md-6 mx-auto">
        <div className="security__block-picture">
          <img src={captchaImage} alt="captcha" />
        </div>
        <div className="security__block-logo">
          <img src={meta} alt="meta" />
        </div>
        <p className="security__block-title">Security Check</p>
        <p className="security__block-text px-3">
          Meta uses security tests to ensure that the people on the site are
          real. Please fill the security check below to continue further.
        </p>
        <Captcha captcha={captcha} setCaptcha={setCaptcha} />
        <div className="security__block-button">
          <ButtonBright fun={changePage} disabled={captcha}>
            Continue
          </ButtonBright>
        </div>
      </div>
    </div>
  );
};

export default SecurityCheck;
