require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: 'hardhat',
  paths:{
    artifacts:'./app/src/artifacts'
  },
  networks : {  
    localhost:{
      url:'http://127.0.0.1:8545',
      chainId: 31337  
  }
}

};

