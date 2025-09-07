// src/lib/alchemy.js
import { Alchemy, Network } from "alchemy-sdk";

// Make sure your environment variable is loaded
const API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

if (!API_KEY) {
  console.error("⚠️ VITE_ALCHEMY_API_KEY is not defined in .env");
}

// Alchemy settings
const settings = {
  apiKey: API_KEY,
  network: Network.ETH_SEPOLIA,
};

// ✅ Define the Alchemy instance before using it
const alchemy = new Alchemy(settings);

/**
 * Fetch transfers for a given wallet address
 * Returns ETH + ERC20 transactions
 */
export async function fetchAddressTransfers(address) {
  if (!alchemy) {
    console.error("⚠️ Alchemy instance is not initialized");
    return [];
  }

  if (!address) {
    console.warn("⚠️ No address provided to fetchAddressTransfers");
    return [];
  }

  try {
    const response = await alchemy.transfers.getTransfers({
      fromBlock: "0x0",
      toBlock: "latest",
      fromAddress: address,
      toAddress: address,
      category: ["external", "erc20"], // only ETH + ERC20
      excludeZeroValue: false,          // include zero value for now
    });

    console.log(`🔹 Transfers fetched for ${address}:`, response.transfers);
    return response.transfers || [];
  } catch (e) {
    console.error("Failed to fetch transfers:", e);
    return [];
  }
}
