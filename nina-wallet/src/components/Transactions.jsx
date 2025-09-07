import { useEffect, useState } from "react";
import axios from "axios";

function Transactions({ walletAddress }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/transactions/${walletAddress}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress]);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg mt-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Transaction History</h2>

      {loading ? (
        <p className="text-gray-300">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-400">No transactions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-700">
            <thead>
              <tr className="text-gray-400 uppercase text-left">
                <th className="px-4 py-2">Hash</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Value (ETH)</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Gas Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {transactions.map((tx) => {
                const isSent = tx.from.toLowerCase() === walletAddress.toLowerCase();
                return (
                  <tr key={tx.hash} className="hover:bg-gray-700">
                    <td className="px-4 py-2 text-blue-400">{tx.hash.slice(0, 10)}...</td>
                    <td className={`px-4 py-2 font-semibold ${isSent ? 'text-red-400' : 'text-green-400'}`}>
                      {isSent ? "Sent" : "Received"}
                    </td>
                    <td className="px-4 py-2 text-gray-300">{tx.from.slice(0, 10)}...</td>
                    <td className="px-4 py-2 text-gray-300">{tx.to.slice(0, 10)}...</td>
                    <td className="px-4 py-2">{(Number(tx.value) / 1e18).toFixed(4)}</td>
                    <td className="px-4 py-2">{new Date(tx.timeStamp * 1000).toLocaleString()}</td>
                    <td className={`px-4 py-2 font-semibold ${tx.isError === "0" ? "text-green-400" : "text-red-500"}`}>
                      {tx.isError === "0" ? "Success" : "Failed"}
                    </td>
                    <td className="px-4 py-2">{((Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18).toFixed(6)} ETH</td>
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

export default Transactions;
