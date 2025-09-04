import { useState } from "react";
import phone from "../assets/pp.png";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import blob from "../assets/blob.png";
import circle from "../assets/circle.png";
import circle2 from "../assets/circle2.png";
import { FaRocket } from "react-icons/fa"; 

export default function LandPage() {
  return (
    <>
      <section className="hello min-h-screen lg:w-full ">
        <main className="  flex items-center justify-center">
          <div className="relative"></div>
          <img
            src={circle2}
            alt=""
            className="absolute opacity-90 w-[100px] pointer-events-none "
            style={{ animation: "spin 50s linear infinite" }}
          />

 <div>
      {/* BNB */}
      <div
        className="absolute w-10 h-10 animate-float animate-rotate-slow hover:animate-spin-fast"
        style={{ top: "20%", left: "15%" }}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/bnb.svg"
          alt="BNB"
          className="w-full h-full"
        />
      </div>

      {/* ETH */}
      <div
        className="absolute w-12 h-12 animate-float animate-rotate-slow hover:animate-spin-fast"
        style={{ top: "40%", left: "70%" }}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/eth.svg"
          alt="ETH"
          className="w-full h-full"
        />
      </div>

      {/* USDT */}


      {/* Another ETH */}
      <div
        className="absolute w-12 h-12 animate-float animate-rotate-slow hover:animate-spin-fast"
        style={{ top: "75%", left: "80%" }}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/svg/color/eth.svg"
          alt="ETH"
          className="w-full h-full"
        />
      </div>
    </div>
          
          <div className=" bigi p-10  w-[900px] text-white  text-center">
            <div className=" text-center px-10 lg:p-0  ">
              <h2 className="your_wallet font-bold">
                Step Into the Future of Finance <br />
                Seamless, Secure, Yours.
              </h2>

              <div className="hanging-indent w-[600px] mx-auto">
                Built for speed and simplicity. Nina Wallet lets you create
                Binance Smart Chain (BSC) wallets, send and receive BNB, and
                view your transaction history.
              </div>

              <Link
                to="/login"
                className=" mt-10 mx-auto inline-flex items-center bg-purple-600 text-white font-semibold py-3 
  px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:bg-purple-700 hover:scale-105 hover:shadow-xl"
              >
                <FaRocket className="mr-2" />
                Get Started
              </Link>
            </div>
          </div>
        </main>
    <div className="flex justify-center items-center mx-auto relative">
  {/* Stronger shining blur */}
  <div className="absolute w-[650px] h-[350px] bg-white opacity-80 blur-[250px] rounded-full"></div>
  <div className="absolute w-[600px] h-[250px] bg-white opacity-70 blur-[100px] rounded-full"></div>

  <img
    src={phone}
    alt=""
    className="w-[55%] object-contain mx-auto mt-[-200px] relative z-10"
  />
</div>

      </section>
    </>
  );
}
