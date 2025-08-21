import { useState, useEffect } from "react";

export default function SendEth({ senderAddress, onClose }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState(null);

  // Reset inputs whenever senderAddress changes (i.e., modal opens)
  useEffect(() => {
    setRecipient("");
    setAmount("");
    setTxStatus(null);
  }, [senderAddress]);

  const handleSend = async () => {
    if (!recipient || !amount) {
      setTxStatus("Recipient and amount are required.");
      return;
    }

    try {
      setTxStatus("Sending transaction...");

      const res = await fetch("http://localhost:5000/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: senderAddress,
          to: recipient,
          amount: amount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTxStatus(`Transaction successful! Hash: ${data.txHash}`);
      } else {
        setTxStatus(`Transaction failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setTxStatus("Error sending transaction.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Send ETH</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      {txStatus && <p className="mt-2">{txStatus}</p>}

      <button
        onClick={onClose}
        className="mt-4 bg-gray-300 px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
