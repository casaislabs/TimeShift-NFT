const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DynamicNFT", function () {
  let DynamicNFT, dynamicNFT, owner, addr1;

  beforeEach(async function () {
    DynamicNFT = await ethers.getContractFactory("DynamicNFT");
    [owner, addr1] = await ethers.getSigners();

    dynamicNFT = await DynamicNFT.deploy();
    // await dynamicNFT.deployed(); // Eliminada, no es necesaria en ethers v6+
  });

  it("Debería comenzar con tokenCounter en 0", async function () {
    expect(await dynamicNFT.tokenCounter()).to.equal(0);
  });

  it("Debería permitir mintear un NFT y aumentar tokenCounter", async function () {
    await dynamicNFT.mint();

    expect(await dynamicNFT.tokenCounter()).to.equal(1);

    expect(await dynamicNFT.ownerOf(1)).to.equal(owner.address);
  });

  it("Debería revertir si se consulta tokenURI de un token no existente", async function () {
    await expect(dynamicNFT.tokenURI(999)).to.be.revertedWith("Token no existe");
  });

  it("tokenURI debería devolver un JSON con la propiedad image", async function () {
    await dynamicNFT.mint();
    const uri = await dynamicNFT.tokenURI(1);

    // El tokenURI es un base64 de JSON, decodificamos para verificar
    const base64JSON = uri.split(",")[1];
    const json = Buffer.from(base64JSON, 'base64').toString();
    const parsed = JSON.parse(json);

    expect(parsed).to.have.property("image");
    expect(parsed.image).to.contain("data:image/svg+xml;base64,");
  });
});