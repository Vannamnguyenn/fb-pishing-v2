import React from "react";
import "./HeaderAuthentication.scss";
import fb from "../../assets/fb.png";

const HeaderAuthentication = () => {
  return (
    <div className="auth__header d-flex col-12 justify-content-between">
      <div className="auth__header-logo col-md-5">
        <img src={fb} alt="fb" className="img-fluid" width="200" />
      </div>
      <div className="auth__header-search input-group col-md-5 d-flex pe-5 me-5">
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="How can we help?"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
  );
};

export default HeaderAuthentication;
