import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { ethers } from "ethers";
import "../../../styles/register.css";
import nina from "../../../assets/nina.png";
import man from "../../../assets/man.png";
// import "../../../styles/login.css";
import coin from "../../../assets/coin.png";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      setErrorMessage("");

      try {
        // Create Firebase user
        await doCreateUserWithEmailAndPassword(email, password);

        // Create Ethereum wallet
        const wallet = ethers.Wallet.createRandom();

        // Log wallet details to console (for now)
        console.log("Wallet Address:", wallet.address);
        console.log("Private Key:", wallet.privateKey);

        // Redirect to wallet page
        navigate("/wallet");
      } catch (error) {
        console.error("Registration error:", error);
        setErrorMessage(error.message);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {userLoggedIn && <Navigate to={"/wallet"} replace={true} />}

        {/* <div className="register-container"> */}
        <div className="bg-[#0f172a] text-white flex-1 flex flex-col justify-center items-center p-6 lg:p-8">
          <img
            src={man}
            alt="Happy person using phone"
            className="rounded-full mb-4 lg:mb-6 w-30 h-30 lg:w-70 lg:h-70  object-cover"
          />

          <h2 className="text-2xl lg:text-3xl font-bold text-center max-w-md">
            Have access to your finances anywhere in the world on
            <span className="text-[#F3C738] "> Nina Wallet</span>
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            <div className=" flex  items-center mb-5">
              <img
                src={nina}
                alt="Nina logo"
                className="w-10 h-10 object-contain"
              />

              <div className=" font-bold text-[15px] text-[#F3C738] ">
                NINA WALLET
              </div>
            </div>
            <h3>Create a New Account</h3>
            <h2 className="text-gray-500 mb-6">
              Please enter your details below to create your account
            </h2>

            <form onSubmit={onSubmit} className="register-form space-y-5">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 p-3 "
                />
              </div>
              {/* password */}

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  disabled={isRegistering}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 p-3 "
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  required
                  disabled={isRegistering}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 p-3"
                />
              </div>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

    <button
  type="submit"
  disabled={isRegistering}
  className={`submit-btn ${isRegistering ? "disabled" : ""} 
    w-full bg-[#0f172a] text-white font-semibold rounded-lg 
    p-3 relative overflow-hidden border-[5px] cursor-pointer text-[16px]`}
>
  {isRegistering ? (
    <span className="text-white italic">Signing Up...</span>
  ) : (
    <span className="text-white">Sign Up</span>
  )}
</button>


              <div className="redirect-message">
                Already have an account?{" "}
                <Link to="/login" className="redirect-link text-[#0f172a] font-bold">
                  Continue
                </Link>
              </div>
              <div className="absolute top-4 left-4">
                <Link to="/" className="text-white hover:underline text-[12px]">
                  ← Home
                </Link>
              </div>
            </form>
            <p className="mt-4 text-xs text-gray-500 text-center">
              🔒 Secure login — your information is encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
