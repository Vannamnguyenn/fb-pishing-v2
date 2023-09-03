import React from "react";
import "./Banner.scss";
import BannerIcon from "../../assets/banner.png";

const Banner = () => {
  return (
    <>
      <div className="main__header-info">
        <span>Business Help Center</span>
        <span>Get Support</span>
      </div>
      <div className="main__header-bg col-12">
        <img src={BannerIcon} alt="background" className="img-fluid" />
      </div>
    </>
  );
};

export default Banner;
