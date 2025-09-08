import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

function Transactions({ walletAddress }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTx, setFilteredTx] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!walletAddress) return;

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/transactions/${walletAddress}`
        );
        setTransactions(response.data);
        setFilteredTx(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [walletAddress]);

  useEffect(() => {
    if (filter === "All") setFilteredTx(transactions);
    else if (filter === "Sent")
      setFilteredTx(
        transactions.filter(
          (tx) => tx.from.toLowerCase() === walletAddress.toLowerCase()
        )
      );
    else if (filter === "Received")
      setFilteredTx(
        transactions.filter(
          (tx) => tx.to.toLowerCase() === walletAddress.toLowerCase()
        )
      );
  }, [filter, transactions, walletAddress]);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Transaction History
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-700 text-white rounded px-2 py-1 text-sm sm:text-base"
        >
          <option value="All">All</option>
          <option value="Sent">Sent</option>
          <option value="Received">Received</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-300 text-sm">Loading transactions...</p>
      ) : filteredTx.length === 0 ? (
        <p className="text-gray-400 text-sm">No transactions found</p>
      ) : (
        <div className="overflow-auto max-h-60 border-t border-gray-700 rounded">
          <table className="min-w-full text-xs sm:text-sm divide-y divide-gray-700">
            <thead>
              <tr className="text-gray-400 uppercase text-left">
                <th className="px-2 py-1">Hash</th>
                <th className="px-2 py-1">Type</th>
                <th className="px-2 py-1">From</th>
                <th className="px-2 py-1">To</th>
                <th className="px-2 py-1">Value (ETH)</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Gas Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTx.map((tx) => {
                const isSent =
                  tx.from.toLowerCase() === walletAddress.toLowerCase();
                return (
                  <tr key={tx.hash} className="hover:bg-gray-700">
                    <td className="px-2 py-1 text-blue-400">
                      {tx.hash.slice(0, 8)}...
                    </td>
                    <td className="px-2 py-1 flex items-center gap-1 font-semibold">
                      {isSent ? (
                        <>
                          <ArrowUpIcon className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">Sent</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownIcon className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Received</span>
                        </>
                      )}
                    </td>
                    <td className="px-2 py-1 text-gray-300">
                      {tx.from.slice(0, 8)}...
                    </td>
                    <td className="px-2 py-1 text-gray-300">
                      {tx.to.slice(0, 8)}...
                    </td>
                    <td className="px-2 py-1">
                      {(Number(tx.value) / 1e18).toFixed(4)}
                    </td>
                    <td className="px-2 py-1">
                      {new Date(tx.timeStamp * 1000).toLocaleString()}
                    </td>
                    <td
                      className={`px-2 py-1 font-semibold ${
                        tx.isError === "0" ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {tx.isError === "0" ? "Success" : "Failed"}
                    </td>
                    <td className="px-2 py-1">
                      {((Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18).toFixed(
                        6
                      )}{" "}
                      ETH
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

export default Transactions;
