// src/components/TransactionHistory.jsx
import { useEffect, useState } from "react";
import { fetchAddressTransfers } from "../lib/alchemy";
import { ethers } from "ethers";

function shorten(addr = "", left = 6, right = 4) {
  if (!addr) return "";
  return addr.length <= left + right ? addr : `${addr.slice(0, left)}…${addr.slice(-right)}`;
}

function formatAmount(tx) {
  try {
    // native ETH transfers (external)
    if (tx.category === "external") {
      const raw = tx.value ?? tx.rawContract?.value ?? "0";
      const formatted = ethers.utils.formatEther(raw.toString());
      return `${parseFloat(formatted).toFixed(4)} ETH`;
    }

    // token transfers (ERC20 etc.)
    if (tx.rawContract && tx.rawContract.decimals != null) {
      const raw = tx.rawContract.value ?? tx.value ?? "0";
      const formatted = ethers.utils.formatUnits(raw.toString(), tx.rawContract.decimals);
      const symbol = tx.asset || tx.rawContract.tokenSymbol || "";
      return `${parseFloat(formatted).toFixed(4)} ${symbol}`;
    }

    // fallback
    if (tx.value) {
      const formatted = ethers.utils.formatEther(tx.value.toString());
      return `${parseFloat(formatted).toFixed(4)} ${tx.asset || ""}`;
    }

    return tx.asset || "—";
  } catch (e) {
    return "—";
  }
}

export default function TransactionHistory({ address }) {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!address) return;
      setLoading(true);
      setError("");
      try {
        const transfers = await fetchAddressTransfers(address);
        // Each transfer should have metadata.blockTimestamp (ISO string). Use it if present.
        const arr = transfers.map((t) => ({
          ...t,
          timestamp: t.metadata?.blockTimestamp ? new Date(t.metadata.blockTimestamp).toLocaleString() : "—",
        }));
        if (mounted) setTxs(arr);
      } catch (e) {
        console.error(e);
        if (mounted) setError(e.message || "Failed to load transactions");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [address]);

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-sm w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-purple-400">Transaction History</h3>

      {!address ? (
        <div className="text-gray-400">Connect or create a wallet to see transactions.</div>
      ) : loading ? (
        <div className="text-gray-400">Loading…</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : txs.length === 0 ? (
        <div className="text-gray-500">No transactions found on Sepolia for {shorten(address)}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Type</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">From</th>
                <th className="py-2 px-3 text-left">To</th>
                <th className="py-2 px-3 text-left">Hash</th>
              </tr>
            </thead>
            <tbody>
              {txs.map((tx) => {
                const type = (tx.to?.toLowerCase?.() === address?.toLowerCase?.()) ? "IN" : "OUT";
                return (
                  <tr key={tx.hash} className="border-t">
                    <td className="py-2 px-3">{tx.timestamp}</td>
                    <td className={`py-2 px-3 font-medium ${type === "IN" ? "text-emerald-600" : "text-rose-600"}`}>{type}</td>
                    <td className="py-2 px-3">{formatAmount(tx)}</td>
                    <td className="py-2 px-3">{shorten(tx.from)}</td>
                    <td className="py-2 px-3">{shorten(tx.to)}</td>
                    <td className="py-2 px-3">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-purple-400 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
