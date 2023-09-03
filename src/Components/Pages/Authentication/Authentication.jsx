import React from "react";
import HeaderAuthentication from "../../HeaderAuthentication/HeaderAuthentication";
import AuthenticationContent from "../../AuthenticationContent/AuthenticationContent";
const Authentication = () => {
  return (
    <div className="auth">
      <HeaderAuthentication />
      <AuthenticationContent />
    </div>
  );
};

export default Authentication;
