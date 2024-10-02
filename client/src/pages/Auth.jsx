import React, { useState } from "react";
import Login from "../modules/Login";
import Register from "../modules/Register";


const Auth = () => {
  // State for controlling which component to show
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>
      <div>{isLogin ? <Login /> : <Register />}</div>
    </>
  );
};

export default Auth;
