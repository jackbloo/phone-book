import * as React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "react-toastify/dist/ReactToastify.css";

const Home = React.lazy(() => import("./pages/Home"));
const Landing = React.lazy(() => import("./pages/Landing"));
const DefaultRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state: RootState) => state.phoneBook.isLogin);
  React.useEffect(() => {
    if (!isLogin && location?.pathname !== "/") {
      return navigate("/");
    } else if (isLogin && location?.pathname === "/") {
      return navigate("/home");
    }
  }, [isLogin]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<>...</>}>
            <Landing />
          </React.Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default DefaultRoutes;
