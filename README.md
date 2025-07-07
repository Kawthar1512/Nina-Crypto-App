Nina Wallet

Nina Wallet is a simple crypto wallet web application that allows users to create, send and receive cryptocurrency.  
This is the first version and it supports the Binance Smart Chain (BSC) and uses Firebase for authentication.

Features

- User authentication with Firebase (email & password)
- Create a BSC wallet for each user
- Send and receive BNB (testnet)
- View wallet address and transaction status
- Mobile-responsive and clean UI

Screenshots

I'll add screenshots here after v1 is done

Technologies Used

Frontend:

- React.js (used vite)
- Firebase Authentication
- TailwindCSS or CSS Modules (based on your usage)

Backend:

- Node.js + Express
- BSC (Binance Smart Chain) testnet via Web3.js or Ethers.js ( used ethers previously but now I'll be using BSC)
- dotenv for environment variables

Getting Started

- Node.js and npm or pnpm
- Git
- Firebase project set up
- BSC Testnet wallet
- A `.env` file in the backend where i stored private keys(make sure you don't commit this to github)

For the Frontend Setup

cd nina-wallet
pnpm install
pnpm run dev

Warning!
This project is currently under active development.
