import React from "react";
import "./Header.scss";
import meta from "../../assets/meta.png";
const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={meta}
              alt="meta"
              width="200"
              height="16"
              className="d-inline-block align-text-center"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Переключатель навигации"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="#">
                Get Started
              </a>
              <a className="nav-link" href="#">
                Advertise
              </a>
              <a className="nav-link" href="#">
                Learn
              </a>
              <a className="nav-link" href="#">
                Support
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="main__header-dropdown dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Start Now
        </button>
        <ul className="dropdown-menu"></ul>
      </div>
    </div>
  );
};

export default Header;
