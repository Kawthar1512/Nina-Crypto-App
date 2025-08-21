const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { saveWallet, getWallet } = require("../utils/storage");
const { encryptPrivateKey, decryptPrivateKey } = require("../utils/encryption");

// this will connect to Sepolia via Infura with my api key; I'm now using ethereum not bsc
//This is the fformer provider code for ethereum
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9629368e25c940d5a997426e859bda01"
);
// const provider = new ethers.JsonRpcProvider(
//   "https://bsc-testnet.public.blastapi.io"
// );




router.post("/create", async (req, res) => {
  const { userId } = req.body;

  try {
    let walletData = getWallet(userId);

    if (!walletData) {
      // Create a new wallet if one doesn't exist
      const wallet = ethers.Wallet.createRandom();
      const encryptedKey = encryptPrivateKey(wallet.privateKey);
      saveWallet(userId, wallet.address, encryptedKey);

      walletData = { address: wallet.address };
    }

    // Fetch balance (works for both old and new wallets)
    const balanceInWei = await provider.getBalance(walletData.address);
    const balanceInEth = ethers.formatEther(balanceInWei);

    res.json({
      success: true,
      address: walletData.address,
      balance: parseFloat(balanceInEth).toFixed(4),
    });
  } catch (err) {
    console.error("Wallet creation error:", err);
    res.status(500).json({ success: false, error: "Failed to create wallet" });
  }
});

router.get("/balance/:address", async (req, res) => {
  try {
    const { address } = req.params;
    if (!address) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    const balanceInWei = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balanceInWei);

    res.json({ balance: balanceInEth });
  } catch (err) {
    console.error("Error fetching balance:", err);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
});

//my send route
router.post("/send", async (req, res) => {
  const { userId, to, amount } = req.body;

  try {
    // 1. Get sender wallet data
    const walletData = getWallet(userId);

    if (!walletData) {
      return res
        .status(404)
        .json({ success: false, error: "Wallet not found" });
    }

    // 2. Decrypt the private key
    const privateKey = decryptPrivateKey(walletData.encryptedKey);

    // 3. Load wallet
    const wallet = new ethers.Wallet(privateKey, provider);

    // 4. Create & send tx
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amount.toString()), // amount in ETH as string
    });

    // 5. Wait for confirmation
    const receipt = await tx.wait();

    res.json({
      success: true,
      txHash: receipt.hash,
    });
  } catch (err) {
    console.error("Send transaction error:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to send transaction" });
  }
});


// test my api route
router.get("/", (req, res) => {
  res.send("My Nina Wallet API is live!");
});

module.exports = router;
