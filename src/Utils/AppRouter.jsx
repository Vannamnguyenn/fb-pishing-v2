import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { BanContext } from "../context/BanContext";
const AppRouter = () => {
  const { routers } = useContext(BanContext);
  return (
    <Routes>
      {routers.map((el) => (
        <Route path={el.path} element={el.element} key={el.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
