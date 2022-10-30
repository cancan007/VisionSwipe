require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


const privateKey = process.env.PRIVATE_KEY;
const projectId = process.env.PROJECT_ID;
const avalancheFujiURL = process.env.AVALANCHE_FUJI_NODE_C;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    avalancheTestnet: {
      chainId: 43113,
      url: avalancheFujiURL,
      accounts: [privateKey]
    },
    polygonMainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  },
};
