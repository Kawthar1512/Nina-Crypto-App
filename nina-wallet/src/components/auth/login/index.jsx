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
      <section className="">
        <div className="login-container ">
          {userLoggedIn && <Navigate to="/wallet" replace />}
          <div className="first-side bg-purple-900 w-[50%] hidden sm:flex">
            <div className="w-1/2 h-[200px]  text-center items-center">
              <img src={man} alt="" className="object-cover object-top  h-[400px] border border-amber-50" />
            </div>
                        <h1 className="text-3xl text-white mt-30">Have access to your finance anywhere in the world on nina wallet</h1>

          </div>
          <div className="ten pt-20 w-[50%] ">
            <div className=" font-helvetica px-14 ">
              <div className="flex items-center pr-[200px] ml-[-210px] mt-[30px]   py-2 w-[300px] text-left self-start ">
                <img
                  src={nina}
                  alt="Nina logo"
                  className="w-10 h-10 object-contain  "
                />

                <div className=" font-bold text-2xl text-[#F3C738]">NINA</div>
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
        </div>
      </section>
    </>
  );
};

export default Login;
