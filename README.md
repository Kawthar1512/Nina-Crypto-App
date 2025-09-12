Nitra Wallet

Nitra Wallet is a simple crypto wallet web application that allows users to create, send, and receive cryptocurrency.
This is the first version and it supports the Ethereum network and uses Firebase for authentication.

Features

User authentication with Firebase (email & password)

Create an Ethereum wallet for each user

Send and receive ETH (testnet)

View wallet address and transaction status

Mobile-responsive and clean UI

Screenshots

I'll add screenshots here after v1 is done

Technologies Used

Frontend:

React.js (used Vite)

Firebase Authentication

TailwindCSS or CSS Modules (based on your usage)

Backend:

Node.js + Express

Ethereum testnet (Goerli, Sepolia, or Holesky) via Web3.js or Ethers.js

dotenv for environment variables

Getting Started

Node.js and npm or pnpm

Git

Firebase project set up

Ethereum Testnet wallet

A .env file in the backend where I stored private keys (make sure you don't commit this to GitHub)

For the Frontend Setup

cd nitra-wallet
pnpm install
pnpm run dev


 Warning!
This project is currently under active development.
