import React, { useState } from "react";
import axios from "axios";
import { Base_Uri } from "../src/utils/uri";

const Signup = () => {
  const [signupUser, setSignupUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signupHandler = () => {
    console.log(signupUser);
    axios
      .post(`${Base_Uri}signup`, signupUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) =>
          setSignupUser({
            ...signupUser,
            name: e.target.value,
          })
        }
      />
      <br />
      <br />
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) =>
          setSignupUser({
            ...signupUser,
            email: e.target.value,
          })
        }
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) =>
          setSignupUser({
            ...signupUser,
            password: e.target.value,
          })
        }
      />
      <br />
      <br />
      <button onClick={signupHandler}>Signup</button>
    </>
  );
};

export default Signup;
