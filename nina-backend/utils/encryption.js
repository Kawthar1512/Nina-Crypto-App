const crypto = require("crypto");

const algorithm = "aes-256-ctr";
// const secretKey = process.env.ENCRYPTION_SECRET || "mySuperSecretKey123456";
const secretKey = crypto.scryptSync(
  process.env.ENCRYPTION_SECRET || "mySuperSecretKey123456",
  "salt",
  32
);

// const iv = crypto.randomBytes(16);

function encryptPrivateKey(privateKey) {
  const iv = crypto.randomBytes(16); // new IV for every encryption
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(privateKey), cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

function decryptPrivateKey(encryptedText) {
  const [ivHex, encryptedHex] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey.slice(0, 32),
    iv
  );
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString();
}
module.exports = { encryptPrivateKey, decryptPrivateKey };
