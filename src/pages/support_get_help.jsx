import { useState } from "react";
import "./support_get_help.scss";
import Form from "../Components/Form/FormV2";

const SupportGetHelp = () => {
  const [tab, setTab] = useState(1);
  const [activeNext, setActiveNext] = useState(false);
  const onIssueChange = () => {
    setActiveNext(true);
  };
  return (
    <div>
      <div
        className="banner"
        style={{
          backgroundImage: "url('/banner.webp')",
        }}
      >
        <div className="banner-bg"></div>
        <div className="banner-content">
          <h5>Facebook Business Help Center</h5>

          <h1>How can we help you?</h1>
        </div>
      </div>

      <div className="body mb-5">
        <div className="wrap-title">
          <h2>How can we help?</h2>
          <p>
            We need more information to address your issue. This form will only
            take a few minutes.
          </p>

          {tab == 1 && (
            <div className="form-wrapper">
              <h3>Select issue </h3>
              <div className="select-issue">
                <b>Most common issues</b>

                <div className="form-check mb-3 ">
                  <div>
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="issue"
                      onChange={onIssueChange}
                      id="issue"
                    />
                  </div>
                  <label htmlFor="issue">
                    I have been blocked from using a feature
                  </label>
                </div>

                <div className="form-check mb-3 ">
                  <div>
                    {" "}
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="issue"
                      onChange={onIssueChange}
                      id="issue2"
                    />
                  </div>
                  <label htmlFor="issue2">
                    Disapproved ads (not political)
                  </label>
                </div>

                <div className="form-check mb-3 ">
                  <div>
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="issue"
                      onChange={onIssueChange}
                      id="issue3"
                    />
                  </div>
                  <label htmlFor="issue3">My ad account is disabled</label>
                </div>

                <div className="form-check mb-3 ">
                  <div>
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="issue"
                      onChange={onIssueChange}
                      id="issue4"
                    />
                  </div>
                  <label htmlFor="issue4">
                    I need help with a failed payment
                  </label>
                </div>

                <div className="form-check mb-3 ">
                  <div>
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="issue"
                      onChange={onIssueChange}
                      id="issue5"
                    />
                  </div>
                  <label htmlFor="issue5">
                    I think someone accessed my business without my permission
                  </label>
                </div>

                <div className="form-check mb-3 ">
                  <div>
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="issue"
                      onChange={onIssueChange}
                      id="issue6"
                    />
                  </div>
                  <label htmlFor="issue6">Other issues</label>
                </div>

                <div className="d-flex justify-content-end w-full">
                  <button
                    className={`${activeNext && "active"}`}
                    onClick={() => setTab(2)}
                  >
                    Next
                    <img
                      src={activeNext ? "/next-active.svg" : "/next.svg"}
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 2 && (
            <div className="form-send-wrapper">
              <h3>Get help</h3>
              <Form />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportGetHelp;
