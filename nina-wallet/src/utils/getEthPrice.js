export async function getEthPrice() {
  try {
    const res = await fetch("http://localhost:5000/api/eth-price"); // your backend route
    const data = await res.json();
    if (data.ethereum?.usd) {
      return data.ethereum.usd;
    }
    return null;
  } catch (error) {
    console.error("Error fetching ETH price from backend:", error);
    return null;
  }
}
