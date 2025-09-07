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
        // Call your backend endpoint
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
    <div>
      <h2>Transaction History</h2>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value (ETH)</th>
              <th>Date</th>
              <th>Status</th>
              <th>Gas Fee</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash}>
                <td>{tx.hash.slice(0, 10)}...</td>
                <td>{tx.from.slice(0, 10)}...</td>
                <td>{tx.to.slice(0, 10)}...</td>
                <td>{Number(tx.value) / 1e18}</td>
                <td>{new Date(tx.timeStamp * 1000).toLocaleString()}</td>
                <td>{tx.isError === "0" ? "Success" : "Failed"}</td>
                <td>{(Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18} ETH</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;
