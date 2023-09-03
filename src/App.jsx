import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./Settings/palette.scss";
import "./Settings/reset.css";
import "./app.scss";
import AppRouter from "./Utils/AppRouter";
import BanContextProvider from "./context/BanContext";
function App() {
  return (
    <div className="App">
      <BanContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </BanContextProvider>
    </div>
  );
}

export default App;
