import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/features/authSlice.js";
import { register, handleSubmit } from "react-hook-form";
import authService from "../appwrite/auth.js";
import { useNavigate } from "react-router-dom";
import Input from "./Input.jsx";

function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    setError("");
    try {
      //   if (data) {
      //     const userData = await authService.login(data);
      //     if (userData) {
      //       const currentUser = await authService.getCurrentUser(userData);
      //       if (currentUser) {
      //         dispatch(storeLogin(currentUser));
      //       }
      //     }
      //   }

      if (!data) {
        console.log("fields cant be empty");
      }
      const userData = await authService.login(data);
      if (!userData) {
        console.log("wrong credentials");
      }
      const currentUser = await authService.getCurrentUser(userData);
      if (!currentUser) {
        console.log("failed to create session");
        navigate("/");
      }
      dispatch(storeLogin(currentUser));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
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
