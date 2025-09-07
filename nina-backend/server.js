import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ETHERSCAN_API_URL = "https://api-sepolia.etherscan.io/api";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// Endpoint to fetch transactions for a specific wallet
app.get("/api/transactions/:wallet", async (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
