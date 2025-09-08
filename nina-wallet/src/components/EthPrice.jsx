import { useState, useEffect } from "react";

export default function EthPrice({ balance, showBalance }) {
  const [ethPrice, setEthPrice] = useState(null);
  const [usdValue, setUsdValue] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ETH price from backend
  useEffect(() => {
    async function fetchEthPrice() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/eth-price");
        const data = await res.json();

        if (data?.ethereum?.usd) {
          setEthPrice(data.ethereum.usd);
        } else {
          console.error("Unexpected ETH price data:", data);
          setEthPrice(0); // fallback
        }
      } catch (err) {
        console.error("Error fetching ETH price:", err);
        setEthPrice(0); // fallback
      } finally {
        setLoading(false);
      }
    }
    fetchEthPrice();
  }, []);

  // Compute USD value whenever balance or ethPrice changes
  useEffect(() => {
    if (ethPrice !== null && balance) {
      setUsdValue((Number(balance) * ethPrice).toFixed(2));
    }
  }, [balance, ethPrice]);

  if (!showBalance) return <p className="text-white text-center">****</p>;

  return (
    <div className="text-center text-white ">
      {loading || usdValue === null ? "Loading..." : `≈ $${usdValue} USD`}
    </div>
  );
}
