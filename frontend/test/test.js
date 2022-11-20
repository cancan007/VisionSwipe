const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Vision Swipe", () => {
  const tokenURI = "https://test.example-nfttoken.com";
  const tokenURI2 = "http://test2.example-nfttoken.com";
  let jpPrice = 30000000;
  let jpUnit = 1;
  let feePercent = 3.5;
  let usdPrice = 40000000;
  let usdUnit = 0;
  let feePercent2 = 5.3;

  const fetchContractsUsers = async () => {
    const VSMarket = await ethers.getContractFactory("VSMarket");
    const market = await VSMarket.deploy(1);
    await market.deployed();
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(market.address);
    await nft.deployed();

    let accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];
    const user3 = accounts[3];
    return { market, nft, deployer, user1, user2, user3 };
  };

  const addItemsToMarket = async () => {
    const { market, nft, deployer, user1, user2, user3 } =
      await fetchContractsUsers();
    let tx = await nft.connect(user1).createToken(tokenURI);
    let event = await tx.wait();

    feePercent = ethers.utils.parseUnits(feePercent.toString(), "ether");
    jpPrice = ethers.utils.parseUnits(jpPrice.toString(), "ether");
    //console.log(event.events[0].args.tokenId);
    let tokenId = event.events[0].args.tokenId;
    tx = await market.addAuthor(user1.address);
    await tx.wait();
    tx = await market
      .connect(user1)
      .createMarketItem(market.address, tokenId, jpPrice, jpUnit, feePercent);
    await tx.wait();
    //let items = await market.fetchMarketItems();
    tx = await market.addAuthor(user2.address);
    await tx.wait();
    tx = await nft.connect(user2).createToken(tokenURI2);
    let event2 = await tx.wait();

    feePercent2 = ethers.utils.parseUnits(feePercent2.toString(), "ether");
    usdPrice = ethers.utils.parseUnits(usdPrice.toString(), "ether");
    //console.log(event.events[0].args.tokenId);
    let tokenId2 = event2.events[0].args.tokenId;
    tx = await market
      .connect(user2)
      .createMarketItem(
        market.address,
        tokenId2,
        usdPrice,
        usdUnit,
        feePercent2
      );
    await tx.wait();
    return { market, nft, deployer, user1, user2, user3 };
  };

  beforeEach(async () => {});

  describe("create nft token and market item", () => {
    it("create nft and item, cancell item", async () => {
      const { market, nft, deployer, user1, user2 } =
        await fetchContractsUsers();
      let tx = await nft.connect(user1).createToken(tokenURI);
      let event = await tx.wait();
      tx = await nft.connect(user1).createToken(tokenURI);
      let event2 = await tx.wait();
      feePercent = ethers.utils.parseUnits(feePercent.toString(), "ether");
      jpPrice = ethers.utils.parseUnits(jpPrice.toString(), "ether");
      //console.log(event.events[0].args.tokenId);
      let tokenId = event.events[0].args.tokenId;
      let tokenId2 = event.events[0].args.tokenId;
      tx = await market.addAuthor(user1.address);
      await tx.wait();
      /*
            tx = await market.removeAuthor(user1.address);
            await tx.wait();*/
      tx = await market
        .connect(user1)
        .createMarketItem(market.address, tokenId, jpPrice, jpUnit, feePercent);
      await tx.wait();

      tx = await market
        .connect(user1)
        .createMarketItem(
          market.address,
          tokenId2,
          jpPrice,
          jpUnit,
          feePercent
        );
      await tx.wait();

      let items = await market.fetchMarketItems();
      console.log(items);
      let itemId = items[0].itemId;
      expect(items[0].seller).to.be.equal(user1.address);
      tx = await market.cancelMarketItem(itemId);
      event = await tx.wait();
      expect(event.events[0].args.cancelled).to.be.equal(true);
      items = await market.fetchCancelledNFTs();
      expect(items[0].itemId).to.be.equal(itemId);
    });

    /*
        it("sell item", async() => {
            const {market, nft, deployer, user1, user2, user3} = await addItemsToMarket();
            const items = await market.fetchMarketItems();
            const item1 = items[0];
            let tx = await market.connect(user3).createMarketSale(nft.address, item1.itemId);
            let event = await tx.wait();
            const myItems = await market.connect(user3).fetchMyNFTs();
            console.log(myItems)
            expect(myItems[0].itemId).to.be.equal(item1.itemId);
        })*/
  });
});
