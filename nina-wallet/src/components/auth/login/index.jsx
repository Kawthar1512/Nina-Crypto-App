import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import "../../../styles/login.css";
import coin from "../../../assets/coin.png";
import nina from "../../../assets/nina.png";
import screen from "../../../assets/screen.png";
import man from "../../../assets/man.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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

  if (userLoggedIn) {
    return <Navigate to="/wallet" replace />;
  }

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
      <div className="min-h-screen flex flex-col lg:flex-row">
        {userLoggedIn && <Navigate to="/wallet" replace />}
        {/* left side */}
        <div className="bg-purple-700 text-white flex-1 flex flex-col justify-center items-center p-8">
          <img
            src={man}
            alt="Happy person using phone"
            className="rounded-full mb-6 w-40 h-40 object-cover"
          />

          <h2 className="text-3xl font-bold text-center max-w-md">
            Have access to your finances anywhere in the world on
            <span className="text-yellow-300">Nina Wallet</span>
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center items-center p-8">
         
          <div className="w-full max-w-md">
            <div className=" flex  items-center mb-5">
            <img
              src={nina}
              alt="Nina logo"
              className="w-10 h-10 object-contain"
            />

            <div className=" font-bold text-[15px] text-yellow-300">NINA WALLET</div>
          </div>
            <h3 className="text-2xl font-bold mb-2">Welcome Back!</h3>
            <h2 className="text-gray-500 mb-6">
              Please enter your login details below
            </h2>
          

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email input */}
            <div className="form-group">
              <label
                for="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            {/* for Password input */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[500px] bg-gray-50 p-3"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm text-purple-700 hover:underline">
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
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg p-3 transition"
            >
              {isSigningIn ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-purple-700 hover:underline"
            >
              <strong>Sign up</strong>
            </Link>
          </div>
          <p class="mt-4 text-xs text-gray-500 text-center">
            🔒 Secure login — your information is encrypted
          </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
