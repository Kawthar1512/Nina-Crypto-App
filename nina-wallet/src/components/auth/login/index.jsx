import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import "../../../styles/login.css";
import coin from "../../../assets/coin.png";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  // const onGoogleSignIn = async (e) => {
  //   e.preventDefault();
  //   if (!isSigningIn) {
  //     setIsSigningIn(true);
  //     try {
  //       await doSignInWithGoogle();
  //     } catch (err) {
  //       setIsSigningIn(false);
  //     }
  //   }
  // };

  return (
    <>
      <div className="login-container">
        {userLoggedIn && <Navigate to="/wallet" replace />}

        <div className="side">
          <div className="forImg">
            <img src={coin} alt="" />
          </div>
          <h2>Simple and Secure. Login to your wallet</h2>
        </div>

        <div className="right-side">
          <div className="login-header">
            <h3>Welcome Back!</h3>
            <h2>Login to Nina Wallet</h2>
          </div>

          <div className="divForm">
            <form onSubmit={onSubmit} className="login-form">
              {/* Email input */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* for Password input */}
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="" className="forgot">
                  Forgot password
                </a>
              </div>

              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}

              <button
                type="submit"
                disabled={isSigningIn}
                className="submit-btn"
              >
                {isSigningIn ? "Signing In..." : "Login"}
              </button>
            </form>
            <p className="signup-link">
              Don't have an account?{" "}
              <Link to="/register" className="signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
