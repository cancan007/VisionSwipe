const {ethers} = require('hardhat');
const {expect} = require('chai');

describe("Vision Swipe", ()=>{
    let deployer, user1, user2;

    beforeEach(async()=>{
        const BTTMarket = await ethers.getContractFactory("BTTMarket");
        const market = await BTTMarket.deploy()

        let accounts = ethers.getSigners();
        deployer = accounts[0];
        user1 = accounts[1];
        user2 = accounts[2];
    })
})