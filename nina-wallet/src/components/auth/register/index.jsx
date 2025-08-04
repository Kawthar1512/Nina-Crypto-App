import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { ethers } from "ethers";
import "../../../styles/register.css";
// import "../../../styles/login.css";
import coin from "../../../assets/coin.png";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
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
      {userLoggedIn && <Navigate to={"/wallet"} replace={true} />}

      <div className="register-container">
        <div className="side">
          <div className="forImg">
            <img src={coin} alt="" />
          </div>
          <h2>Simple and Secure. Login to your wallet</h2>
        </div>

        <div className="right-side">
          <div className="register-header">
            <h3>Create a New Account</h3>
          </div>

          <form onSubmit={onSubmit} className="register-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                autoComplete="new-password"
                required
                disabled={isRegistering}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                autoComplete="off"
                required
                disabled={isRegistering}
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`submit-btn ${isRegistering ? "disabled" : ""}`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="redirect-message">
              Already have an account?{" "}
              <Link to="/login" className="redirect-link">
                Continue
              </Link>
            </div>
             <div className="absolute top-4 left-4">
          <Link to="/" className="text-red-600 hover:underline text-4xl">
            ← Home
          </Link>
        </div>
          </form>
        </div>
       
      </div>
    </>
  );
};

export default Register;
