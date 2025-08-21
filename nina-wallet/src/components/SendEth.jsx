import React, { useState } from "react";

const SendEth = ({ senderAddress, onClose, currentUser }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState("");

  const handleSend = async () => {
    if (!recipient || !amount) {
      alert("Recipient and amount are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.email,
          to: recipient,
          amount: amount.toString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTxStatus(`Transaction sent! Hash: ${data.txHash}`);
      } else {
        setTxStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Send failed:", err);
      setTxStatus("Transaction failed");
    }
  };

  return (
    <div>
      <h2>Send ETH</h2>
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
      <button onClick={handleSend}>Send</button>
      <button onClick={onClose}>Close</button>
      {txStatus && <p>{txStatus}</p>}
    </div>
  );
};

export default SendEth;
