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
  const [balance, setBalance] = useState("0.00");
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
    async function createOrFetchWalletAndBalance() {
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
          setBalance(data.balance);

          // // ✅ Immediately fetch balance
          // await fetchBalance(data.address);
        } else {
          console.error("Failed to create/fetch wallet:", data.error);
        }
      } catch (error) {
        console.error("Error creating/fetching wallet:", error);
      }
    }

    // async function fetchBalance(addr) {
    //   try {
    //     const res = await fetch(`http://localhost:5000/api/wallet/balance/${addr}`);
    //     const data = await res.json();
    //     if (data.balance !== undefined) {
    //       setBalance(parseFloat(data.balance).toFixed(4));
    //     }
    //   } catch (error) {
    //     console.error("Error fetching balance:", error);
    //   }
    // }

    if (currentUser?.email) {
      createOrFetchWalletAndBalance();
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
    <>
      <main className="min-h-full bg-gray-900 text-gray-100">
        {/* <!-- NAV --> */}
        <nav className="bg-gray-800/60 backdrop-blur-md border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={nina} alt="logo" className="w-8 h-8 rounded" />
              <span className="font-semibold text-white">Nina Wallet</span>
              <span className="ml-3 px-2 py-1 text-xs bg-yellow-500 text-black rounded">
                BSC
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
                <div className="text-right">
                  <div className="text-xs text-gray-300">Network</div>
                  <div id="network" className="font-medium">
                    BSC Mainnet
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="notifications"
                  className="p-2 rounded hover:bg-gray-700"
                  title="Notifications"
                >
                  <FiBell className="w-4 h-4 text-white- hover:text-black " />
                </button>
                <div className="text-sm text-gray-300 px-3 py-1 rounded-lg bg-gray-800 flex items-center gap-2">
                  <p id="addr-short">
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
                  {/* this is for the qr code but not workinng yet */}
                  {/* <button
                    onclick="showQR()"
                    className="text-gray-300 hover:text-white"
                  >
                    
                  </button> */}
                </div>
                <button
                  onClick={openModal}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded dialog-close-btn"
                >
                  Logout
                </button>
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
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <!-- Left: Balance & Actions (prominent) --> */}
          <section className="lg:col-span-2 space-y-6">
            {/* <!-- Balance Card --> */}
            <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 rounded-2xl p-6 shadow-xl flex items-center justify-between">
              <div>
                <div className="text-sm text-white/80">
                  Total portfolio value
                </div>
                <div className="text-4xl font-bold mt-1">$0.00</div>
                <div className="text-sm text-white/80 mt-1">
                  BNB: <span class="font-semibold">0.0000</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                    📤 Send
                  </button>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                    📥 Receive
                  </button>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                    💱 Swap
                  </button>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                    ➕ Add Token
                  </button>
                </div>
              </div>
              <div className="hidden sm:block">
                <img
                  src="wallet-illustration-light.png"
                  alt="wallet"
                  className="w-36 h-36 object-contain opacity-95"
                />
              </div>
            </div>

            {/* <!-- Assets / Token List --> */}
            <div className="bg-gray-800 rounded-xl p-4 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Assets</h3>
                <div className="text-sm text-gray-400">
                  Total tokens: <span id="token-count">2</span>
                </div>
              </div>

              <div className="divide-y divide-gray-700">
                {/* <!-- token row (repeatable) --> */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
                      BNB
                    </div>
                    <div>
                      <div className="font-medium">Binance Coin</div>
                      <div className="text-xs text-gray-400">
                        BNB • 18 decimals
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">0.0000</div>
                    <div className="text-sm text-gray-400">$0.00</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="token-placeholder.png"
                      alt="token"
                      className="w-10 h-10 rounded-full bg-gray-700"
                    />
                    <div>
                      <div className="font-medium">USDT (BEP-20)</div>
                      <div className="text-xs text-gray-400">
                        USDT • contract
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">0.00</div>
                    <div className="text-sm text-gray-400">$0.00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Transactions --> */}
            <div className="bg-gray-800 rounded-xl p-4 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Recent activity</h3>
                <div className="text-sm text-gray-400">Showing latest 5</div>
              </div>

              <div className="text-center text-gray-500 py-8">
                <div className="text-2xl">🔍</div>
                <p className="mt-3">No transactions yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Once you send or receive BNB or BEP‑20 tokens, they will
                  appear here. You can view details on BscScan.
                </p>
              </div>
            </div>
          </section>

          {/* <!-- Right Column: utilities, referral, settings --> */}
          <aside className="space-y-6">
            {/* <!-- Quick Network / Testnet Switch --> */}
            <div className="bg-gray-800 rounded-xl p-4 shadow">
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
                    <option value="56">BSC Mainnet (56)</option>
                    <option value="97">BSC Testnet (97)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* <!-- Referral --> */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-4 shadow text-white">
              <div className="flex items-center justify-between">
                <div>
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
                    <button
                      onclick="copyCode()"
                      className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <img
                  src="referral-small.png"
                  alt="referral"
                  className="w-14 h-14 rounded-full"
                />
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
                  <button className="bg-yellow-400 text-black px-3 py-2 rounded">
                    Backup
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {/* <script>
    function copyAddress() {
      navigator.clipboard.writeText('0xe74D...eEE7');
      alert('Address copied');
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
    });
  </script> */}
      </main>
    </>
  );
};
export default Wallet;
