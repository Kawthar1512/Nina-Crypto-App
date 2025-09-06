// src/lib/alchemy.js
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA, // since we’re on Sepolia testnet
};

const alchemy = new Alchemy(settings);

export async function fetchAddressTransfers(address) {
  const res = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",       // look from the first block
    toBlock: "latest",      // up to now
    fromAddress: address,   // outgoing tx
    toAddress: address,     // incoming tx
    category: ["external", "erc20", "erc721", "erc1155"],
    withMetadata: true,     // this gives us blockTimestamp
    excludeZeroValue: true,
    maxCount: "0x64",       // fetch up to 100 tx
  });

  return res.transfers || [];
}
