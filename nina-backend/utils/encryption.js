const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = process.env.ENCRYPTION_SECRET || "mySuperSecretKey123456";
const iv = crypto.randomBytes(16);

function encryptPrivateKey(privateKey) {
  const cipher = crypto.createCipheriv(algorithm, secretKey.slice(0, 32), iv);
  const encrypted = Buffer.concat([cipher.update(privateKey), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

module.exports = { encryptPrivateKey };
