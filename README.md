# TimeShift-NFT
TimeShift-NFT is an advanced dynamic NFT project built with Hardhat and Ignition, designed for modern Web3 developers.

> **Dynamic NFTs, Real-Time Visuals:**  
> Each NFT updates its on-chain SVG color based on the current time, creating a living, interactive asset.

---

## 🏗️ Project Overview

- **Smart Contract:** [`DynamicNFT.sol`](contracts/DynamicNFT.sol)  
    On-chain logic for minting and dynamic SVG generation.
- **Testing:** [`DynamicNFT.test.js`](test/DynamicNFT.test.js)  
    Comprehensive unit tests for contract reliability.
- **Deployment:** [`DynamicNFTModule.js`](ignition/modules/DynamicNFTModule.js)  
    Automated deployment with Hardhat Ignition.

## 📦 Project Structure

- **Smart Contract:** [`DynamicNFT.sol`](contracts/DynamicNFT.sol)  
    On-chain logic for minting and dynamic SVG generation.
- **Testing:** [`DynamicNFT.test.js`](test/DynamicNFT.test.js)  
    Comprehensive unit tests for contract reliability.
- **Deployment:** [`DynamicNFTModule.js`](ignition/modules/DynamicNFTModule.js)  
    Automated deployment with Hardhat Ignition.

---

## 🚀 Live Deployment

- **Contract Address:** [`0xA7FF038011ab80e0837262c9BAe3814352317cF4`](https://sepolia.etherscan.io/address/0xA7FF038011ab80e0837262c9BAe3814352317cF4)
- **Etherscan:** [View Code](https://sepolia.etherscan.io/address/0xA7FF038011ab80e0837262c9BAe3814352317cF4#code)
- **Sourcify:** [Full Match](https://repo.sourcify.dev/contracts/full_match/11155111/0xA7FF038011ab80e0837262c9BAe3814352317cF4/)

---

## ⚡ Quickstart

1. **Install dependencies**
        ```
        npm install
        ```

2. **Configure environment**
```
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

3. **Run tests**
        ```
        npx hardhat test
        ```

4. **Deploy to Sepolia**
        ```
        npx hardhat ignition deploy ./ignition/modules/DynamicNFTModule.js --network sepolia
        ```

5. **Verify on Etherscan**
        npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
        ```

---

## 🌐 Frontend

A dedicated frontend is available to interact with the TimeShift-NFT smart contract. You can mint NFTs, view real-time dynamic SVGs, and explore your collection visually.

- **Live Demo (Vercel):** [https://time-shift-nft-frontend.vercel.app/](https://time-shift-nft-frontend.casaislabs.com/)
- **Source Code (GitHub):** [https://github.com/martinperezcss/TimeShift-NFT-Frontend](https://github.com/casaislabs/TimeShift-NFT-Frontend)

> The frontend is fully integrated with the deployed contract on Sepolia. Connect your wallet and experience dynamic NFTs in real time!

---

## 🧑‍💻 Usage

After deployment, you can interact with the contract using Hardhat Console or scripts.

### Mint a new NFT

```
npx hardhat console --network sepolia
```

```
const [owner] = await ethers.getSigners();
const contract = await ethers.getContractAt(
  "DynamicNFT",
  "0xA7FF038011ab80e0837262c9BAe3814352317cF4" // Replace with your contract address if needed
);
await contract.mint();
```

### Retrieve token metadata

```
const uri = await contract.tokenURI(1);
console.log(uri); // Returns base64-encoded JSON with dynamic SVG
```

### Error handling

If you query a non-existent token, the contract will revert with `"Token does not exist"`.

---

## 📝 Features

- **Unique NFT Minting:**  
    Each token is unique and can be minted by users.

- **Dynamic SVG Metadata:**  
    The `tokenURI` function returns a base64-encoded SVG whose color changes with the time of day.

- **Robust Error Handling:**  
    Querying a non-existent token reverts with `"Token does not exist"`.

---

## 📄 License

[MIT](LICENSE)

---

> **Connect. Build. Shift Time.**  
> _Push the boundaries of dynamic NFTs with TimeShift-NFT._

---

## ⚠️ Note on Dynamic Metadata

Most wallets and NFT marketplaces (including MetaMask and OpenSea) **cache the metadata at the time of minting** and do not update it in real time.  
Although this NFT generates its SVG image dynamically on-chain, you may not see the color change in your wallet or marketplace view.  
To see the current, real-time SVG, you can call the `tokenURI` function directly on the contract (e.g., using Hardhat Console or Etherscan).

## 👀 View Your NFT in Real Time

To see your NFT's current color and time, use the provided script:

```sh
npx hardhat run scripts/mint-and-view-nft.js --network sepolia
```

This script will mint a new NFT and display its real-time SVG (with current UTC hour, minute, and second) decoded directly from the blockchain.
