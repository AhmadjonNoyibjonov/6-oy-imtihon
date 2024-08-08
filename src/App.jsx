import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Home from "./pages/Home/index";
import ErrorPages from "./pages/ErrorPage/index";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [IsAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function () {
      if (token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
        if (!location.pathname.includes("register")) {
          navigate("/login");
        }
      }
    },
    [token, location.pathname]
  );

  return (
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      IsAuth &&{" "}
      <>
        <Route path="/" element={<Home></Home>}></Route>{" "}
      </>
      <Route path="*" element={<ErrorPages></ErrorPages>}></Route>
    </Routes>
  );
}

export default App;
