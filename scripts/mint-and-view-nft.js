const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt(
    "DynamicNFT",
    "0xA7FF038011ab80e0837262c9BAe3814352317cF4" // Replace with your contract address
  );

  // Mint a new NFT
  const tx = await contract.mint();
  await tx.wait();

  // Get the latest tokenCounter value
  const count = await contract.tokenCounter();
  let tokenId = Number(count);

  let uri;
  try {
    uri = await contract.tokenURI(tokenId);
  } catch (err) {
    // If token does not exist, try tokenId - 1
    if (
      err.message &&
      (err.message.includes("Token does not exist") || err.message.includes("Token no existe"))
    ) {
      tokenId = tokenId - 1;
      try {
        uri = await contract.tokenURI(tokenId);
      } catch (err2) {
        console.error(`Error: Token with id ${tokenId} does not exist.`);
        return;
      }
    } else {
      console.error("Unexpected error:", err);
      return;
    }
  }

  // Decode base64 JSON
  try {
    const base64JSON = uri.split(",")[1];
    const json = Buffer.from(base64JSON, "base64").toString();
    const parsed = JSON.parse(json);

    // Decode SVG base64
    const svgBase64 = parsed.image.split(",")[1];
    const svg = Buffer.from(svgBase64, "base64").toString();

    console.log(`SVG for tokenId ${tokenId}:\n`, svg);
  } catch (decodeErr) {
    console.error("Error decoding SVG:", decodeErr);
  }
}

main().catch(console.error);