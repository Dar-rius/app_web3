const {ethers} = require('hardhat')

const  main = async () => {
    const Token = await ethers.getContractFactory("Token")
    const [owner, addr1] = await ethers.getSigners()
    console.log('adresse owner: ', owner.address)

    const tokenDeploy = await Token.deploy()
    console.log('adresse contrat: ',tokenDeploy.address)
    
    const testFunction = await tokenDeploy.getBalance(owner.address)
    console.log('adresse balance: ',testFunction.toString())
}

main().then(()=>process.exit(0))
    .catch((err)=>{
        process.exit(1);
        console.error(err)
    })