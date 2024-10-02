import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase"; // Import your firebase config
import Login from "../modules/Login";
import Register from "../modules/Register";
import "../styles/auth.css"; // Opravený název složky

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
      <h1 className="auth-title">HajimariSubs</h1>
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
              <Login />
            </>
          ) : (
            <div>
              <h2>Registrace</h2>
              <Register />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
