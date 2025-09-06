// src/lib/alchemy.js
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

export const alchemy = new Alchemy(settings);

/**
 * Fetch transfers (external + tokens + NFTs) for an address.
 * NOTE: This is a simple fetch (no pagination). Alchemy returns `metadata.blockTimestamp`.
 */
export async function fetchAddressTransfers(address) {
  if (!address) return [];
  const res = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: "latest",
    fromAddress: address,   // optional - we'll use both directions below
    toAddress: address,
    category: ["external", "erc20", "erc721", "erc1155"],
    withMetadata: true,
    excludeZeroValue: true,
    order: "desc",
  });

  return res.transfers || [];
}
