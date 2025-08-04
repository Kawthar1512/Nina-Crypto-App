import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import "../../../styles/login.css";
import coin from "../../../assets/coin.png";
import nina from "../../../assets/nina.png";

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
      <div className="login-container ">
        {userLoggedIn && <Navigate to="/wallet" replace />}

        <div className="right-side ">
          <div className="login-header font-helvetica px-14 ">
            <div className="fimage flex justify-around px-14 ">
              <img
                src={nina}
                alt=""
                className="w-15  h-15 object-contain ml-[-500px]"
              />
              <p className="text-[#f3c759] font-bold ml-[-200px] text-[20px]">
                NINA
              </p>
            </div>

            <div className="top-text mt-[50px] ">
              <h3 className="font-helvetica text-[30px]">Welcome Back!</h3>
              <h2 className="text-[14px]  text-gray-700 mt-4">
                Please enter your login details below
              </h2>
            </div>
          </div>

          <div className="divForm px-10 mt-6">
            <form onSubmit={onSubmit} className="login-form px-14">
              {/* Email input */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[500px] bg-gray-50 p-3"
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
                  className="w-[500px] bg-gray-50 p-3"
                />
                <div className=" flex justify-end w-125">
                  <a href="#" className="text-sm  hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}

              <button
                type="submit"
                disabled={isSigningIn}
                className="submit-btn w-[500px] bg-gray-50 p-3"
              >
                {isSigningIn ? "Signing In..." : "Login"}
              </button>
            </form>
            <div className="signup-link text-[12px] text-center mx-auto">
              Don't have an account?{" "}
              <Link to="/register" className="signup text-bold ">
                <strong>Sign up</strong>
              </Link>
            </div>
          </div>
          {/* <div className="absolute top-4 left-4">
            <Link to="/" className="text-purple-600 hover:underline text-4xl">
              ← Home
            </Link>
          </div> */}
        </div>
        <div className="side">
          <div className="forImg">
            <img src={coin} alt="" />
          </div>
          <h2>Simple and Secure. Login to your wallet</h2>
        </div>
      </div>
    </>
  );
};

export default Login;
