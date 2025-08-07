import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import "../../styles/wallet.css";
import winner from "../../assets/win.png";
import empty from "../../assets/empty.png";
import nina from "../../assets/nina.png";

import {
  FiCopy,
  FiSend,
  FiDownload,
  FiBell,
  FiEye,
  FiEyeOff,
  FiLogOut,
} from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Wallet = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3000, 
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [address, setAddress] = useState(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState("");
  const [showBalance, setShowBalance] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [copied, setCopied] = useState(false);

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  useEffect(() => {
    async function createOrFetchWallet() {
      try {
        const res = await fetch("http://localhost:5000/api/wallet/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser.email }),
        });

        const data = await res.json();
        console.log("Wallet API response:", data);

        if (data.address) {
          setAddress(data.address);
        } else {
          console.error("Failed to create/fetch wallet:", data.error);
        }
      } catch (error) {
        console.error("Error creating/fetching wallet:", error);
      }
    }

    if (currentUser?.email) {
      createOrFetchWallet();
    }
  }, [currentUser]);

  const handleSend = async () => {
    setTxStatus("");
    if (!recipient) {
      setTxStatus("Please enter a recipient address.");
      return;
    }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setTxStatus("Please enter a valid amount.");
      return;
    }

    try {
      setTxStatus("Sending transaction...");
      const res = await fetch("http://localhost:5000/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: recipient, amount }),
      });

      const data = await res.json();

      if (data.success) {
        setTxStatus("Transaction successful! TxHash: " + data.txHash);
        setRecipient("");
        setAmount("");
      } else {
        setTxStatus("Transaction failed: " + data.error);
      }
    } catch (error) {
      setTxStatus("Transaction failed: " + error.message);
    }
  };

  return (
    <div className="wallet-page bg-[#5A178B]  h-screen">
      <div className="flex flex-row items-center text-center ml-[-350px]">
        <img
          src={nina}
          alt="NINA logo"
          className="w-[100px] h-[100px] object-contain  "
        />
        <h2 className=" ml-[-850px] font-bold text-2xl text-[#F3C738]">NINA</h2>
      </div>
      <main className=" bg-gray-50 w-[1000px] h-[694px] mx-auto p-10">
        <div className="top flex justify-between">
          <div className="welcome-text  text-xs  text-left">
            Welcome! {currentUser.displayName || currentUser.email}
          </div>
          <button
            title="Notifications"
            className="border border-gray-300 p-2 rounded-full"
          >
            <FiBell className="w-4 h-4 text-gray-900 hover:text-black " />
          </button>
        </div>

        <header className="wallet-header p-6 ">
          <div className="wallet-info  ">
            <div className="flex justify-center items-center gap-2 py-2 mt-[-30px]">
              <p className="font-mono text-sm">
                {shortenAddress(address) || "No address in state"}
              </p>
              {address && (
                <button
                  onClick={copyToClipboard}
                  className="text-gray-700 hover:text-black"
                  title="Copy to clipboard"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              )}
              {copied && (
                <span className="text-green-600 text-xs ml-2">Copied!</span>
              )}
            </div>
            <div className="balance bg-[#f3eff8] rounded-3xl w-full max-w-2xl mx-auto text-black p-4">
              <div className="flex justify-between items-center py-3 px-5">
                <p className="text-sm font-medium">Current Balance</p>
              </div>
              <div className="balance-show relative flex justify-center items-center">
                <h1 className="text-black-400 text-5xl font-semibold font-mono">
                  {showBalance ? "$00.00" : "****"}
                </h1>

                <button
                  onClick={() => setShowBalance((prev) => !prev)}
                  className="absolute right-4 bg-white flex items-center justify-center text-gray-600 hover:text-black border border-gray-300 w-8 h-8 rounded-full"
                  title={showBalance ? "Hide Balance" : "Show Balance"}
                >
                  {showBalance ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="wallet-actions flex justify-center mt-[15px] ">
          <button
            className=" mx-4 flex items-center gap-2 bg-red-700 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            onClick={() => setShowSendModal(true)}
          >
            Send
            <FiSend className="text-lg" />
          </button>
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setShowReceiveModal(true)}
          >
            Receive
            <FiDownload className="text-lg" />
          </button>
        </div>

        {/* Send Modal */}
        <Transition appear show={showSendModal} as={Fragment}>
          <Dialog
            as="div"
            className="dialog-root"
            onClose={() => setShowSendModal(false)}
          >
            <div className="dialog-container">
              <Dialog.Panel>
                <Dialog.Title className="dialog-title">Send ETH</Dialog.Title>
                <div className="dialog-content">
                  <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Amount in ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button className="dialog-action-btn" onClick={handleSend}>
                    Send
                  </button>
                  {txStatus && <p>{txStatus}</p>}
                </div>
                <button
                  className="dialog-close-btn"
                  onClick={() => setShowSendModal(false)}
                >
                  Close
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>

        {/* Receive Modal */}
        <Transition appear show={showReceiveModal} as={Fragment}>
          <Dialog
            as="div"
            className="dialog-root"
            onClose={() => setShowReceiveModal(false)}
          >
            <div className="dialog-container">
              <Dialog.Panel>
                <Dialog.Title className="dialog-title">
                  Receive ETH
                </Dialog.Title>
                <div className="dialog-content">
                  <p>Your Wallet Address:</p>
                  <p>{address}</p>
                </div>
                <button
                  className="dialog-close-btn"
                  onClick={() => setShowReceiveModal(false)}
                >
                  Close
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>

        <div className="referral mt-9 bg-gradient-to-r from-[#6e30e9] to-[#be90ed] rounded-3xl w-full max-w-2xl mx-auto text-white px-6 py-4 ">
          <div className="flex  justify-between gap-4">
            {/* Text Block */}
            <div className="w-2/3 leading-relaxed text-white text-left">
              <h1 className="text-1xl font-bold text-left">Get $100</h1>
              <p className="text-sm">
                Share your unique referral code and invite your friends to
                download the Nina App. Once they sign up and start using the
                app, you’ll both get rewarded!
              </p>
            </div>

            {/* Image Block */}
            <div className="w-[300px] h-[100px]  flex items-center justify-center">
              <img
                src={winner}
                alt="Referral Promo"
                className="max-w-full max-h-full object-contain mr-[70px]"
              />
            </div>
          </div>
        </div>
        <div className="transactions rounded w-full max-w-2xl mx-auto text-black px-6 py-4 text-center  ">
          <h1 className="text-left text-[18px]">Recent Transactions</h1>
          <div className="text-center text-gray-600 text-[12px] font-bold">
            No transactions found
            <div className="flex justify-center mt-2   mr-[200px]">
              <img
                src={empty}
                alt=""
                className="w-12 h-12 object-contain opacity-70"
              />
            </div>
          </div>
          <p className="text-gray-600 text-[10px]">
            {" "}
            To see your transactions, <br /> begin by sending or receiving
            funds.
          </p>
        </div>
        <button onClick={openModal} className="dialog-close-btn">
          Logout
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/5 " />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-sm transform overflow-hidden  rounded-xl bg-white p-6 text-center shadow-xl transition-all">
                    <Dialog.Title className="text-lg font-semibold text-gray-800">
                      Are you sure you want to log out?
                    </Dialog.Title>
                    <div className="mt-4 flex justify-center gap-4">
                      <button
                        onClick={async () => {
                          await handleLogout(); // logout + redirect
                          closeModal(); // close modal after
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Yes, Logout
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </div>
  );
};

export default Wallet;
