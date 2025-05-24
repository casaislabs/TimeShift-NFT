const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DynamicNFTModule", (m) => {
  const dynamicNFT = m.contract("DynamicNFT", []);
  return { dynamicNFT };
});
