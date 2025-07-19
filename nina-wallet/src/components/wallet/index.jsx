import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import "../../styles/wallet.css";

const Wallet = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState("");

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
    <div className="wallet-page bg-red-500  grid grid-cols-6  h-screen">
       <aside className="col-span-1 bg-gray-900 text-white p-4">
    <h5 className="text-2xl font-bold mb-6">Nina Wallet</h5>
    <nav className="space-y-4">
      <a href="#" className="block hover:text-purple-400">Dashboard</a>
      <a href="#" className="block hover:text-purple-400">Send</a>
      <a href="#" className="block hover:text-purple-400">Receive</a>
      <a href="#" className="block hover:text-purple-400">Transactions</a>
      <a href="#" className="block hover:text-purple-400">Settings</a>
    </nav>
  </aside>
  <main className="col-span-5">
      <div className="welcome-text ">
        Hello {currentUser.displayName || currentUser.email}, you are now logged
        in.
      </div>

      <header className="wallet-header">
        <div className="wallet-info">
          <p>Total Balance</p>
          <h1>$0.00000</h1>
          <p>Wallet Address: {address || "No address in state"}</p>
        </div>
      </header>

      <section className="wallet-actions">
        <button onClick={() => setShowSendModal(true)}>Send</button>
        <button onClick={() => setShowReceiveModal(true)}>Receive</button>
      </section>

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
              <Dialog.Title className="dialog-title">Receive ETH</Dialog.Title>
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

      <button onClick={handleLogout} className="dialog-close-btn">
        Logout
      </button>
      </main>
    </div>
  );
};

export default Wallet;
