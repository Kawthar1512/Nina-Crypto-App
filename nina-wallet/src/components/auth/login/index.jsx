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
      <div className="login-container ">
        {userLoggedIn && <Navigate to="/wallet" replace />}

        <div className="right-side ">
          <div className=" font-helvetica px-14 ">
            <div className="flex items-center pr-[200px] ml-[-210px] mt-[30px]   py-2 w-[300px] text-left self-start ">
              <img
                src={nina}
                alt="Nina logo"
                className="w-10 h-10 object-contain  "
              />

              <div className="text-[#5116B9] font-bold text-[20px]">NINA</div>
            </div>
            <div className="top-text mt-[50px] ">
              <h3 className="font-Helvetica text-[30px] font-semibold">
                Welcome Back!
              </h3>
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
                className="submit-btn w-[500px] p-3"
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
        {/* <div className="sidee py-15">
          <div className="w-[450px] h-[450px]  flex justify-center" >

            <img src={screen} alt="" className="w-full h-full object-contain transform  contrast-125 brightness-105" />
          </div>
          <h2>Simple and Secure. Login to your wallet</h2>
          
        </div> */}
        <div className="sidee w-1/2 flex items-center justify-center bg-purple-800 p-6">
          <div className="w-full max-w-md overflow-hidden">
            <Slider {...carouselSettings}>
              <div className="!flex !flex-col items-center justify-center w-[400px] h-[400px] m-14  p-6   ">
                <img
                  src={man}
                  alt="Manage money"
                  className="w-[1300px] h-[1300px] object-contain "
                />
                <h2 className="text-center text-sm font-semibold text-white mt-4 ">
                  You are in control of your Finances, access your wallet
                  anywhere in the world.
                </h2>
              </div>

              <div className="!flex !flex-col items-center justify-center w-full h-[600px] p-4">
                <img
                  src={coin}
                  alt="Access anywhere"
                  className="w-full h-[250px] object-contain"
                />
                <h2 className="text-center text-lg font-semibold text-white mt-4">
                  Access Nina Wallet anywhere
                </h2>
              </div>

              <div className="!flex !flex-col items-center justify-center w-full h-[400px] p-4">
                <img
                  src={nina}
                  alt="Your freedom"
                  className="w-full h-[250px] object-contain"
                />
                <h2 className="text-center text-lg font-semibold text-white mt-4">
                  Your crypto, your freedom
                </h2>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
