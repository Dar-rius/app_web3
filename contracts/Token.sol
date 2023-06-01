// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Objectif de ce contrat est de permettre a user depuis son adresse de recuperer une certaine somme dans son wallet
// Effectuer des transaction vers une adresse
// Checker la somme total qui lui reste dans son wallet
// Seul le owner de la plateforme pourra lancer le contrat, mais n'importe quel adresse peut utiliser les autres features
contract Token {
    uint256 public totalBalance = 1000000;
    address owner;
    mapping (address => uint) balance;

    event Transaction(address from, uint balance, address to);
    
    constructor(){
        balance[msg.sender] += totalBalance;
        owner = msg.sender;
    }

    function transactionBalance(address _to, uint256 _balanceTransfer) external {
        require(balance[msg.sender] >= _balanceTransfer, "Transaction Impossible");
        balance[msg.sender] -= _balanceTransfer;
        balance[_to] += _balanceTransfer;
        
        emit Transaction(msg.sender, _balanceTransfer, _to);
    }

    function getBalance(address user) external view returns (uint256){
        return balance[user];
    }
}
