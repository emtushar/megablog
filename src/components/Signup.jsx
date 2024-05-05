import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authService } from "../appwrite/auth.js";
import { login as storeLogin } from "../store/features/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input";
function Signup() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const handleSignUp = async (data) => {
    setError("");
    try {
      if (!data) {
        console.log("Fields can't be empty");
      }
      const userData = await authService.createAccount(data);
      if (!userData) {
        console.log("Failed to create user");
      }
      const currentUser = await authService.getCurrentUser(userData);
      if (!currentUser) {
        console.log("");
        navigate("/");
      }
      dispatch(storeLogin(currentUser));
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Input
          label="Full Name : "
          type="text"
          placeholder="Enter full name here..."
          {...register("name", { required: true })}
        />
        <Input
          label="Email :"
          type="email"
          placeholder="Enter your email here"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
