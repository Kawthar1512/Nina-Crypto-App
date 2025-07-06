const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { encryptPrivateKey } = require("../utils/encryption");
const { saveWallet, getWallet } = require("../utils/storage");

// this will connect to Sepolia via Infura with my api key
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9629368e25c940d5a997426e859bda01"
);

router.post("/create", async (req, res) => {
  const { userId } = req.body;

  try {
    let walletData = getWallet(userId);

    if (walletData) {
      // if my  Wallet already exists then fetch the balance
      const balanceInWei = await provider.getBalance(walletData.address);
      const balanceInEth = ethers.formatEther(balanceInWei);

      return res.json({
        success: true,
        address: walletData.address,
        balance: balanceInEth,
      });
    }

    //  this function should create a new wallet
    const wallet = ethers.Wallet.createRandom();
    const encryptedKey = encryptPrivateKey(wallet.privateKey);

    saveWallet(userId, wallet.address, encryptedKey);

    // this function will get balance , default is zero (i have a question)
    const balanceInWei = await provider.getBalance(wallet.address); // wei is the smallest unit of ethers, i have a question here
    const balanceInEth = ethers.formatEther(balanceInWei);

    res.json({ success: true, address: wallet.address, balance: balanceInEth });
  } catch (err) {
    console.error("Wallet creation error:", err);
    res.status(500).json({ success: false, error: "Failed to create wallet" });
  }
});

// test my api route
router.get("/", (req, res) => {
  res.send("My Nina Wallet API is live!");
});

module.exports = router;
