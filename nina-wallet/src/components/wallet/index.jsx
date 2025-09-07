import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import "../../styles/wallet.css";
import winner from "../../assets/win.png";
import nina from "../../assets/nina.png";
import logo from "../../assets/wallet-logo2.png";
import EthPrice from "../EthPrice";
import SendEth from "../SendEth";
import Transactions from "../Transactions";
// import TransactionHistory from "../TransactionHistory";

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
  const [balance, setBalance] = useState("0.00");
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [ethPrice, setEthPrice] = useState(null);
  const [usdValue, setUsdValue] = useState(null);

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
    async function createOrFetchWalletAndBalance() {
      try {
        const res = await fetch("http://localhost:5000/api/wallet/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.email,
          }),
        });

        const data = await res.json();
        console.log("Wallet API response:", data);

        if (data.address) {
          setAddress(data.address);
          setBalance(data.balance);

          // // Immediately fetch my balance
        } else {
          console.error("Failed to create/fetch wallet:", data.error);
        }
      } catch (error) {
        console.error("Error creating/fetching wallet:", error);
      }
    }

    if (currentUser?.email) {
      createOrFetchWalletAndBalance();
    }
  }, [currentUser]);

  return (
    <>
      <main className="min-h-screen bg-gray-700 text-gray-100">
        {/* <!-- My NAV --> */}
        <nav className="bg-gray-800/60 backdrop-blur-md border-b border-gray-700 ">
          <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-3 items-center ">
            {/* left side */}

            <div className="flex items-center gap-3">
              <img
                src={nina}
                alt="logo"
                className="w-12 h-12 rounded object-contain"
              />
              <span className="font-semibold  text-[#F3C738] ml-[-10px] mr-[20px]  nins">
                NINA WALLET
              </span>
            </div>
            {/* center */}
            <div className="flex justify-center items-center gap-3 text-sm">
              <div className="flex items-center gap-2 bg-gray-800 px-3  rounded-lg py-[10px]">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>

                <div className="text-right">
                  {/* <div className="text-xs text-gray-300">Network</div> */}
                  <div id="network" className="font-medium">
                    Ethereum ~ Connected
                  </div>
                </div>
              </div>

              {/* gshds */}

              <div className=" text-white px-3 rounded-lg py-[10px] bg-gray-800 flex items-center gap-2">
                <p id="addr-short">
                  {shortenAddress(address) || "No address in state"}
                </p>
                {address && (
                  <button
                    onClick={copyToClipboard}
                    className="text-white cursor-pointer"
                    title="Copy to clipboard"
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                )}
                {copied && (
                  <span className="text-green-600 text-xs ml-2">Copied!</span>
                )}
                
              </div>
            </div>
            {/* right side */}
            <div className="flex justify-end items-center gap-3">
              <button
                id="notifications"
                className="p-2 rounded hover:bg-gray-700"
                title="Notifications"
              >
                {/* <FiBell className="w-4 h-4 text-white- hover:text-black fill-white" /> */}
              </button>
              <button
                onClick={openModal}
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded dialog-close-btn"
              >
                Logout
              </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-[9999]"
                onClose={closeModal}
              >
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
          </div>
        </nav>
        {/* main section starts here */}
        <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            {/* <!-- Balance Card --> */}
            <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-400 rounded-2xl p-6 shadow-xl flex items-center justify-between">
              <div>
                <div className="welcome-text text-xs text-left">
                  Welcome!{" "}
                  {currentUser
                    ? String(currentUser.displayName || currentUser.email)
                    : "Guest"}
                </div>
                <div className="text-sm text-white">Total portfolio value</div>
                <div className="balance-show relative flex justify-center items-center">
                  <h1 className="text-black-400 text-3xl lg:text-4xl font-semibold font-mono mt-[30px] text-center">
                    {showBalance
                      ? balance
                        ? `${balance} ETH`
                        : "Loading..."
                      : "****"}
                  </h1>

                  <button
                    onClick={() => setShowBalance((prev) => !prev)}
                    className="absolute left-[250px] lg:left-[600px] bg-white flex items-center justify-center text-gray-600 hover:text-black border border-gray-300 w-8 h-8 mt-[30px] rounded-full"
                    title={showBalance ? "Hide Balance" : "Show Balance"}
                  >
                    {showBalance ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {/* convert  the eth value to usd */}
                <div className="text-[14px] text-[#F3C738]font-bold text-center lg:ml-[-98px]">
                  <EthPrice balance={balance} showBalance={showBalance} />
                </div>

                <div className="mt-4  mx-auto flex justify-center gap-4  w-full">
                  <button
                    onClick={() => setShowSendModal(true)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
                  >
                    <FiSend className="text-lg" />
                    Send
                  </button>
                  <button
                    onClick={() => setShowReceiveModal(true)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
                  >
                    <FiDownload className="text-lg" />
                    Receive
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
                        <SendEth
                          senderAddress={address}
                          onClose={() => setShowSendModal(false)}
                        />
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
                          {/* <p>{address}</p> */}
                          <p>{typeof address === "string" ? address : ""}</p>
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
              </div>
            
            </div>

            {/* <!-- Transactions --> */}
            <div className="bg-gray-800 rounded-xl p-4 shadow">
              {/* <div className="flex items-center justify-between mb-1">
                <h3 className="text-[1.25rem] font-semibold">Activity</h3>
                <div className="text-sm text-gray-400"> All v</div>
              </div> */}

              <Transactions walletAddress={address} />
            </div>
          </section>

          {/* <!-- Right Column: utilities, referral, settings -> */}
          <aside className="space-y-6">
            {/* <!-- Quick Network / Testnet Switch --> */}
            {/* <div className="bg-gray-800 rounded-xl p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Network</div>
                  <div className="font-medium">BSC Mainnet</div>
                </div>
                <div>
                  <select
                    id="network-select"
                    className="bg-gray-700 px-3 py-1 rounded text-sm"
                  >
                    <option value="97">BSC Testnet (97)</option>
                  </select>
                </div>
              </div>
            </div> */}

            {/* <!-- Referral --> */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-4 shadow text-white">
              <div className="flex items-center justify-between">
                <div className="max-w-[70%]">
                  <div className="text-sm opacity-90">Invite friends</div>
                  <div className="font-semibold mt-1">Get $100</div>
                  <div className="text-xs mt-2 text-white/80">
                    Share your code and earn rewards when friends sign up and
                    transact.
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="bg-white text-purple-700 px-3 py-1 rounded font-semibold text-sm">
                      REF12345
                    </span>
                    <button className="bg-white/10 px-3 py-1 rounded hover:bg-white/20">
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <img
                    src={winner}
                    alt="referral"
                    className="mt-[-70px] w-32 h-32 ml-[60px] rounded-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* <!-- Security / Backup --> */}
            <div className="bg-gray-800 rounded-xl p-4 shadow">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="text-sm text-gray-400">Security</div>
                  <div className="font-medium">Backup your seed phrase</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Make sure you have your recovery phrase stored safely. Never
                    share it.
                  </div>
                </div>
                <div>
                  <button className="bg-[#F3C738] text-black px-3 py-2 rounded">
                    Backup
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {/* 
    }
    function showQR() {
      alert('Show QR modal (implement)');
    }
    function copyCode() {
      navigator.clipboard.writeText('REF12345');
      alert('Referral code copied');
    }
    function logout() { alert('Logged out'); }

  Example: network select handler (placeholder)
    document.getElementById('network-select').addEventListener('change', function(e){
      const opt = e.target.options[e.target.selectedIndex].text;
      document.getElementById('network').innerText = opt;
    }); */}
      </main>
    </>
  );
};
export default Wallet;
