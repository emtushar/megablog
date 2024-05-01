import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/features.js/authSlice";
import authService from "./appwrite/auth.js";

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
    <div className=" min-h-screen bg-slate-400 ">
      <div className="text-black">Hello</div>
    </div>
  ) : null;
}

export default App;
