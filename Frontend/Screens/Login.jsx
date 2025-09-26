import axios from "axios";
import React, { useState } from "react";
import { Base_Uri } from "../src/utils/uri";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const loginHandler = () => {
    console.log(loginUser);

    axios
      .post(`${Base_Uri}login`, loginUser)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
      />
      <br />
      <br />
      <button onClick={loginHandler}>Login</button>
    </>
  );
};

export default Login;
