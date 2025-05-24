const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DynamicNFT", function () {
  let DynamicNFT, dynamicNFT, owner, addr1;

  beforeEach(async function () {
    DynamicNFT = await ethers.getContractFactory("DynamicNFT");
    [owner, addr1] = await ethers.getSigners();
    dynamicNFT = await DynamicNFT.deploy();
  });

  it("Should start with tokenCounter at 0", async function () {
    expect(await dynamicNFT.tokenCounter()).to.equal(0);
  });

it("Should mint an NFT and increment tokenCounter", async function () {
  await expect(dynamicNFT.mint())
    .to.emit(dynamicNFT, "Transfer")
    .withArgs(
      "0x0000000000000000000000000000000000000000", // AddressZero
      owner.address,
      1
    );

  expect(await dynamicNFT.tokenCounter()).to.equal(1);
  expect(await dynamicNFT.ownerOf(1)).to.equal(owner.address);
});

  it("Should revert when querying tokenURI for a non-existent token", async function () {
    await expect(dynamicNFT.tokenURI(999)).to.be.revertedWith("Token does not exist");
  });

  it("tokenURI should return a valid JSON with an image property", async function () {
    await dynamicNFT.mint();
    const uri = await dynamicNFT.tokenURI(1);

    // Decode base64 JSON
    const base64JSON = uri.split(",")[1];
    const json = Buffer.from(base64JSON, "base64").toString();
    const parsed = JSON.parse(json);

    expect(parsed).to.have.property("image");
    expect(parsed.image).to.contain("data:image/svg+xml;base64,");
  });

  it("SVG should contain the correct UTC hour, minute, and second", async function () {
    await dynamicNFT.mint();
    const uri = await dynamicNFT.tokenURI(1);

    const base64JSON = uri.split(",")[1];
    const json = Buffer.from(base64JSON, "base64").toString();
    const parsed = JSON.parse(json);

    const svgBase64 = parsed.image.split(",")[1];
    const svg = Buffer.from(svgBase64, "base64").toString();

    expect(svg).to.contain("UTC:");
    expect(svg).to.match(/UTC: \d{1,2}:\d{2}:\d{2}/);
  });

  it("Should allow multiple users to mint NFTs", async function () {
    await dynamicNFT.connect(owner).mint();
    await dynamicNFT.connect(addr1).mint();

    expect(await dynamicNFT.tokenCounter()).to.equal(2);
    expect(await dynamicNFT.ownerOf(1)).to.equal(owner.address);
    expect(await dynamicNFT.ownerOf(2)).to.equal(addr1.address);
  });
});