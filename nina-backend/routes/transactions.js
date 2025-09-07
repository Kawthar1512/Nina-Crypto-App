const express = require("express");
const axios = require("axios");
const router = express.Router();

const ETHERSCAN_API_URL = "https://api-sepolia.etherscan.io/api";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

router.get("/:wallet", async (req, res) => {
  const walletAddress = req.params.wallet;

  try {
    const response = await axios.get(ETHERSCAN_API_URL, {
      params: {
        module: "account",
        action: "txlist",
        address: walletAddress,
        startblock: 0,
        endblock: 99999999,
        sort: "desc",
        apikey: ETHERSCAN_API_KEY,
      },
    });

    if (response.data.status === "1") {
      res.json(response.data.result);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

module.exports = router;
