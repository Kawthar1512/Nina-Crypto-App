const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // this will load the .env file

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: true, credentials: true })); 
app.use(express.json()); // for parsing JSON


const walletRoutes = require("./routes/wallet");
app.use("/api/wallet", walletRoutes);

//  Start  the server
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
