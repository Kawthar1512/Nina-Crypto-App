const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { encryptPrivateKey } = require("../utils/encryption");
const { saveWallet, getWallet } = require("../utils/storage");

// this will connect to Sepolia via Infura with my api key; I'm now using BSc not ethereum
//This is the fformer provider code for ethereum
// const provider = new ethers.JsonRpcProvider(
//   "https://sepolia.infura.io/v3/9629368e25c940d5a997426e859bda01"
// );
const provider = new ethers.JsonRpcProvider(
  "https://bsc-testnet.public.blastapi.io"
);
router.post("/create", async (req, res) => {
  const { userId } = req.body;

  try {
    let walletData = getWallet(userId);

    if (walletData) {
      // If wallet already exists then fetch the BNB balance
      const balanceInWei = await provider.getBalance(walletData.address);
      const balanceInBnb = ethers.formatEther(balanceInWei); // Correct for BNB

      return res.json({
        success: true,
        address: walletData.address,
        balance: balanceInBnb,
      });
    }

    // Create a new BSC-compatible wallet, since im not using ethereum again
    const wallet = ethers.Wallet.createRandom();
    const encryptedKey = encryptPrivateKey(wallet.privateKey);

    saveWallet(userId, wallet.address, encryptedKey);

    // Fetch balance (usually zero for new wallets)
    const balanceInWei = await provider.getBalance(wallet.address);
    const balanceInBnb = ethers.formatEther(balanceInWei);

    res.json({ success: true, address: wallet.address, balance: balanceInBnb });
  } catch (err) {
    console.error("Wallet creation error:", err);
    res.status(500).json({ success: false, error: "Failed to create wallet" });
  }
});
// test my api route
router.get("/", (req, res) => {
  res.send("My Nina Wallet API is live!");
  res.send("update where possible");
});

module.exports = router;
