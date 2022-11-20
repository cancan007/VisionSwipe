// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = hre;
const fs = require("fs");
const fse = require("fs-extra");

async function main() {
  let network;
  const { chainId } = await ethers.provider.getNetwork();
  if (chainId === 43114) {
    network = 0; // MAINNET AVALANCHE
  } else if (chainId === 43113) {
    network = 1; // TESTNET AVALANCHE FUJI
  } else if (chainId === 5) {
    network = 2;
  }
  const VSMarket = await ethers.getContractFactory("VSMarket");
  const market = await VSMarket.deploy(network);
  await market.deployed();

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(market.address);
  await nft.deployed();

  let toJson = {
    [chainId.toString()]: {
      VSMarket: [market.address],
      NFT: [nft.address],
    },
  };

  if (fs.existsSync("./src/map.json")) {
    let mapJson = fs.readFileSync("./src/map.json");
    mapJson = JSON.parse(mapJson);
    if (mapJson[chainId.toString()]) {
      mapJson[chainId.toString()]["VSMarket"].push(market.address);
      mapJson[chainId.toString()]["NFT"].push(nft.address);
      mapJson = JSON.stringify(mapJson);
    } else if (!mapJson[chainId.toString()]) {
      mapJson[chainId.toString()] = {};
      mapJson[chainId.toString()]["VSMarket"] = [market.address];
      mapJson[chainId.toString()]["NFT"] = [nft.address];
      mapJson = JSON.stringify(mapJson);
    }

    fs.writeFileSync("./src/map.json", mapJson, (err, c) => {
      if (err) throw err;
      else if (!err) {
        console.log(`Update ${chainId} map.json`);
      }
    });
  } else {
    toJson = JSON.stringify(toJson);
    fs.writeFileSync("./src/map.json", toJson, (err, c) => {
      if (err) throw err;
      else if (!err) {
        console.log(`Created ${chainId} map.json`);
      }
    });
  }

  if (fs.existsSync("./src/artifacts")) {
    await fse
      .remove("./src/artifacts")
      .then(() => console.log("deleted ./src/artifacts"))
      .catch((err) => console.error(err));
    fse.copySync("./artifacts", "./src/artifacts");
    console.log("Updated ./src/artifacts");
    return;
  }

  fse.copySync("./artifacts", "./src/artifacts");
  console.log("Created ./src/artifacts");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
