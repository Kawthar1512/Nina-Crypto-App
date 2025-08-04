import { useState } from "react";
import phone from "../assets/original.png";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function LandPage() {
  return (
    <>
      <div className="container">
        <div className="textDiv">
          <h1 className="your_wallet">
            Your Wallet. <br />
            Smarter.
          </h1>

          <div className="sendText">
            Built for power and performance. Nina Wallet lets you create
            Ethereum wallets, send and receive ETH & USDT, and track all
            transactions in real-time. Whether you're testing on Sepolia or
            building the future of DeFi, we've got the tools you need.
          </div>

          <Link to="/login" className="started">
            Get Started
          </Link>
        </div>

        <div className="imageDiv">
          <img src={phone} alt="" />
        </div>
      </div>
      {/* <div className="features">
        <h3>Feautures</h3>
      </div> */}
    </>
  );
}
