const express = require("express");
const router = express.Router();
const axios = require("axios");

let cachedPrice = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 1000; // 60 seconds

router.get("/", async (req, res) => {
  try {
    const now = Date.now();

    if (!cachedPrice || now - lastFetch > CACHE_DURATION) {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: "ethereum",
            vs_currencies: "usd",
          },
        }
      );

      cachedPrice = response.data;
      lastFetch = now;
      console.log("Fetched ETH price from CoinGecko");
    } else {
      console.log("Returned cached ETH price");
    }

    res.json(cachedPrice);
  } catch (error) {
    console.error("Error fetching ETH price:", error.message);
    res.status(500).json({ error: "Failed to fetch ETH price" });
  }
});

module.exports = router;
