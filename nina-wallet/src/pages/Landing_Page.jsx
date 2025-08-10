import { useState } from "react";
import phone from "../assets/original.png";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import blob from "../assets/blob.png";
import circle from "../assets/circle.png";
import circle2 from "../assets/circle2.png";
import { FaRocket } from "react-icons/fa"; // Rocket icon

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
          />{" "}
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
        {/* <div className="flex justify-center items-center mx-auto max-w-lg">}
  <img
    src={phone}
    alt=""
    className="h-72 w-auto object-contain  mx-auto"
  />
</div> */}
      </section>
    </>
  );
}
