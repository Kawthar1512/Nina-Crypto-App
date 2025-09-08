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
      <section className="hello h-screen w-full lg:w-full relative">
        <main className="flex flex-col items-center justify-center relative z-20">
          <div className="bigi p-10 w-[900px] text-white text-center">
            <h2 className="your_wallet font-bold">
              Step Into the Future of Finance
            </h2>
            <p className="text-4xl mb-4"> Seamless, Secure, Yours.</p>
            <div className="hanging-indent w-[600px] mx-auto">
              Built for speed and simplicity. Nitra Wallet lets you create
              Ethereum (ETH) wallets, send and receive ETH, and view your
              transaction history.
            </div>

            <Link
              to="/login"
              className="mt-10 mx-auto inline-flex items-center bg-[#F3C738] text-gray-800 font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:bg-purple-700 hover:scale-105 hover:shadow-xl z-30 relative"
            >
              <FaRocket className="mr-2" />
              Get Started
            </Link>
          </div>
        </main>

        {/* Blurred background + phone */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none top-[600px]">
          <div className="absolute w-[650px] h-[300px] bg-yellow-300 opacity-80 blur-[250px] rounded-full "></div>
          <div className="absolute w-[600px] h-[200px] bg-white opacity-70 blur-[100px] rounded-full  "></div>

          <img
            src={phone}
            alt="phone"
            className="mt-[-50px] w-[65%] object-contain mx-auto relative  z-10"
          />
        </div>
      </section>
    </>
  );
}
