import { useState } from "react";
import phone from "../assets/original.png";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import blob from "../assets/blob.png";
import circle from "../assets/circle.png";
import circle2 from "../assets/circle2.png";

export default function LandPage() {
  return (
    <>
      {/* <main className="bg-[#9266E3]  min-h-screen overflow-hidden w-full ">
        <div className="container">
         

          <div className="imageDiv">
            <img src={phone} alt="" />
          </div>
        </div>
      </main> */}
      <main className=" hello h-screen w-full bg-black flex items-center justify-center">
        <img src={circle2} alt="" className="absolute" />
        <div className=" bigi p-10  w-[900px] text-white  text-center">
          <div className=" text-center ">
            <h2 className="your_wallet font-bold">
              Step Into the Future of Finance <br />
              Seamless, Secure, Yours.
            </h2>

            <div className="hanging-indent w-[300px] mx-auto">
              Built for speed and simplicity. Nina Wallet lets you create
              Binance Smart Chain (BSC) wallets, send and receive BNB, and view
              your transaction history.
            </div>

            <Link to="/login" className="started">
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
