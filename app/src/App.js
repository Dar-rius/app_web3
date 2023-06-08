
import {useState, useEffect} from 'react'
import TokenABI from './artifacts/contracts/Token.sol/Token.json'
const {ethers} = require('ethers')

function App() {

  const [balance, setBalance] = useState(0)
  const [count, setCount] = useState(0)
  const [adresse, setAdresse] = useState('test')
  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" 

 
  const getSolde = async() => {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')
      const owner =  provider.getSigner()
      const contract =  new ethers.Contract(contractAddress, TokenABI.abi, owner)
      const addressUser = await owner.getAddress()  
      const solde = await contract.getBalance(addressUser)
      const soldeTrue = Number(solde)
      setBalance(soldeTrue)
    } else {
      await window.ethereum.request({method: 'eth_requestAccounts'})
    }
  }

  const transfertToken = async() =>{
    if (window.ethereum !== 'undefined'){
      const provider =  new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, TokenABI.abi, signer)
      const transaction = await contract.transactionBalance(adresse, count) 
      setAdresse('')
      setCount(0)
      transaction.wait()
    } else {
      await window.ethereum.request({method:'eth_requestAccounts'})
    }
  }

  return (
    <div>
      <div>
        <h3>Objetif tester les fonctions du contrat Token</h3> 
       <h4>solde: {balance} ETH</h4>
        <button onClick={getSolde}>
          get Balance
        </button>
      </div>
      
      <div>
        <h4>Veillez donner l'adresse du destinataire</h4>
        <input onChange={e=>setAdresse(e.target.value)}/> <br/>
        <input onChange={e=>setCount(e.target.value)} /> <br/>
        <button onClick={transfertToken}>Transferer</button>
      </div>
    </div>
  );
}

export default App;
