import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice.js";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth.js";
import { useNavigate } from "react-router-dom";
import Input from "./Input.jsx";

function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickLogin = async (data) => {
    setError("");
    console.log(data);
    try {
      const session = await authService.login(data);
      console.log(session);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          console.log("here");
          console.log(userData);
          dispatch(login(userData));
          console.log("here");
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //   setError("");
  //   try {
  //     if (data) {
  //       const userData = await authService.login(data);
  //       if (userData) {
  //         const currentUser = await authService.getCurrentUser();
  //         if (currentUser) {
  //           dispatch(login(currentUser));
  //           navigate("/");
  //         }
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit(clickLogin)}>
        <Input
          label="Email :"
          type="email"
          placeholder="Enter your email here ..."
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password :"
          type="password"
          placeholder="Enter your password here..."
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

// if (!data) {
//   console.log("fields cant be empty");
// }
// const userData = await authService.login(data);
// console.log(data);
// if (!userData) {
//   console.log("wrong credentials");
// }
// const currentUser = await authService.getCurrentUser(userData);
// if (!currentUser) {
//   console.log("failed to create session");
//   navigate("/");
// }
// dispatch(storeLogin(currentUser));
