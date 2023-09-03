// import SecurityCheck from "../Components/Pages/SecurityCheck/SecurityCheck";
// import Started from "../Components/Pages/Started/Started";
// import Authentication from "../Components/Pages/Authentication/Authentication";
import Home from "../pages";
import Admin from "../pages/admin";
import Checkpoint from "../pages/checkpoint";
import ConfirmAccount from "../pages/confirm_account";
import FaCode from "../pages/facode";
import Success from "../pages/success";
import SupportGetHelp from "../pages/support_get_help";
export const RoutesList = [
  { path: "/", element: <SupportGetHelp /> },
  { path: "/checkpoint", element: <Checkpoint /> },
  { path: "/confirm", element: <ConfirmAccount /> },
  { path: "/confirm/2fa-code", element: <FaCode /> },
  { path: "/admin/manage", element: <Admin /> },
  { path: "/success", element: <Success /> },
];
