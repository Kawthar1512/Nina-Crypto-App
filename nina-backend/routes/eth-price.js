// routes/ethPrice.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    res.json(response.data); // send JSON
  } catch (error) {
    console.error("Error fetching ETH price:", error.message);
    res.status(500).json({ error: "Failed to fetch ETH price" });
  }
});

module.exports = router;
