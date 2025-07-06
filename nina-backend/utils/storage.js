const fs = require("fs");
const path = require("path");

const STORAGE_FILE = path.join(__dirname, "../../data/wallets.json");

function loadWallets() {
  if (!fs.existsSync(STORAGE_FILE)) return {};
  const data = fs.readFileSync(STORAGE_FILE);
  return JSON.parse(data);
}

function saveWallet(userId, address, encryptedPrivateKey) {
  const wallets = loadWallets();
  wallets[userId] = { address, encryptedPrivateKey };
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(wallets, null, 2));
}

function getWallet(userId) {
  const wallets = loadWallets();
  return wallets[userId];
}

module.exports = { saveWallet, getWallet };
