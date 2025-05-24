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

- **Contract Address:** [`0x474fad040149CaeFb4a552ab943309dF2689F7f1`](https://sepolia.etherscan.io/address/0x474fad040149CaeFb4a552ab943309dF2689F7f1)
- **Etherscan:** [View Code](https://sepolia.etherscan.io/address/0x474fad040149CaeFb4a552ab943309dF2689F7f1#code)
- **Sourcify:** [Full Match](https://repo.sourcify.dev/contracts/full_match/11155111/0x474fad040149CaeFb4a552ab943309dF2689F7f1/)

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

## 📝 Features

- **Unique NFT Minting:**  
    Each token is unique and can be minted by users.

- **Dynamic SVG Metadata:**  
    The `tokenURI` function returns a base64-encoded SVG whose color changes with the time of day.

- **Robust Error Handling:**  
    Querying a non-existent token reverts with `"Token no existe"`.

---

## 📄 License

[MIT](LICENSE)

---

> **Connect. Build. Shift Time.**  
> _Push the boundaries of dynamic NFTs with TimeShift-NFT._