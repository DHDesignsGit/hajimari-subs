import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase"; // Import your firebase config
import Login from "../modules/Login";
import Register from "../modules/Register";
import "../styles/auth.css"; // Opravený název složky
import logo from "../media/logo-hajimari-subs.svg"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to home if authenticated
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  return (
    <div className="auth-body">
      <img className="auth-logo" src={logo} alt="" />
      <div className="auth-container block radius">
        <div className="switch">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Přihlášení
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Registrace
          </button>
        </div>
        <div>
          {isLogin ? (
            <>
              <h2>Přihlášení</h2>
            </>
          ) : (
            <div>
              <h2>Registrace</h2>
            </div>
          )}
        </div>
        <div>
          {isLogin ? (
            <>
              <Login />
            </>
          ) : (
            <div>
              <Register />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
