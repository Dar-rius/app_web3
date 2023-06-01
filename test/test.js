const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers")
const { ethers } = require("hardhat")
const {expect} = require("chai")

describe("test entier du contrat", function(){
    async function  deployContract(){
    const Token = await ethers.getContractFactory("Token")
    const [owner, addr1] = await ethers.getSigners()
    const tokenDeploy = await Token.deploy()
    await tokenDeploy.deployed()    
    return {Token, tokenDeploy, owner, addr1}
}
    it("test sur les soldes des comptes", async function(){
        const {tokenDeploy, owner, addr1} = await loadFixture(deployContract)

        const balance = await tokenDeploy.getBalance(owner.address)
        expect(await tokenDeploy.totalBalance()).to.equal(balance)
    })

    //it("test sur les transactions", async function(){
        //const {tokenDeploy, owner, addr1} = await loadFixture(deployContract)
        
        //await expect(tokenDeploy.transactionBalance(addr1.address, 50)).to.changeTokenBalance(tokenDeploy, owner, -50)
    //})

    it("test sur les events", async function(){
        const {tokenDeploy, owner, addr1} = await loadFixture(deployContract)
        
        await expect(tokenDeploy.transactionBalance(addr1.address, 50)).to.emit(tokenDeploy, "Transaction")
    })

    it("test sur les echecs", async function(){
        const {tokenDeploy, owner, addr1} = await loadFixture(deployContract)

        await expect(tokenDeploy.transactionBalance(addr1.address, 2000000)).to.be.reverted
    })
}
)