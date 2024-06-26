import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/features/authSlice.js";
import authService from "./appwrite/auth.js";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className=" min-h-screen flex flex-wrap content-between bg-slate-400 ">
      <div className="text-black w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
