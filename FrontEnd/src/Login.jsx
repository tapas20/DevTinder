import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error in login", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-auto p-4 sm:p-6 lg:p-12">
      <div className="card card-border bg-base-300 w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title justify-center h-10 font-bold">Login</h2>
          <div className="">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input w-full"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset mt-4">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input w-full"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-left">
            <button
              className="btn btn-primary mt-10 w-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
