const CryptoJS = require('crypto-js');
require('dotenv').config();

const PASSPHRASE = process.env.PASSPHRASE;

function encryptPrivateKey(privateKey) {
  return CryptoJS.AES.encrypt(privateKey, PASSPHRASE).toString();
}

function decryptPrivateKey(encryptedKey) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, PASSPHRASE);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    return null;
  }
}

module.exports = { encryptPrivateKey, decryptPrivateKey };
