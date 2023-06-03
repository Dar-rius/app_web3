
import {useState, useEffect} from 'react'
import TokenABI from './artifacts/contracts/Token.sol/Token.json'
const {ethers} = require('ethers')

function App() {

  const [balance, setBalance] = useState(0)
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" 

  const getSolde = async() => {
    if(typeof window.ethereum !== 'undefined'){
      await window.ethereum.request({method:'eth_requestAccounts'})
      const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')
      const owner =  provider.getSigner()
      const contract =  new ethers.Contract(contractAddress, TokenABI.abi, owner)
      const addressUser = await owner.getAddress()  
      const solde = await contract.getBalance(addressUser)
      setBalance(solde)
      console.log(balance)
    }
  }

  return (
    <div>
      <h3>Objetif voir ce que vous avez dans votre compte</h3> 
      <button onClick={getSolde}>
        get Balance
      </button>
    </div>
  );
}

export default App;
