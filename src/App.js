import { useState } from 'react';
import React from 'react';
import "./App.css"
// import { Console } from 'console';
const ethers = require("ethers")

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");


  //INTERACTION CODE
  async function requestAccount() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      console.log('Connected to account:', accounts[0]);
    } catch (error) {
      console.error('Error requesting accounts:', error.message);
    }
  }

  console.log(contractAddress);


  async function getmessage(){
    if (typeof window.ethereum !== "undefined"){
      console.log("Hello Latha");
      const provider = new ethers.provider.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress,provider) ;

      try{
        const data = await contract.getmessage();
        console.log(data);
        setCurrentMessage(data);
      }
      catch{

      }
    }
  }

  async function setmessage(){
    if(!message) return;
    console.log(" Hello Devisha");

    if (typeof window.ethereum !== "undefined"){
      await requestAccount();

      const provider = new ethers.provider.BrowserProvider(window.ethereum);
      const signer = new provider.getSigner();

      const contract = new ethers.Contract(contractAddress, signer);
      const transaction = await contract.setMessage(message);

      setMessage("");
      await transaction.wait();
      getmessage();
    }
  }


  //HTML CODE
    return (<div className="App">
      <header className="App-header">
        <div className='title'>
          <h1 >Typescript React App</h1>
          <p>Created by my own using ReactJs, Hardhat and ethers </p>
        </div>
        
        <div>
          <button onClick={requestAccount} className='buttons' style={{backgroundColor:'red'}} > connect </button>
        </div>

        <div>
          <button onClick={()=>contractAddress} className='buttons' style={{backgroundColor:'grey'}}>Get Contract Address:</button>
        </div>

        <div className='textbox'>
          <label  placeholder='input message'>Set Message→ </label>
          <input type="text" />
          <button onSubmit={setmessage} className='buttons' style={{backgroundColor:'blueviolet'}} >Set Message</button>
        </div>

        <div>
          <button  onClick={()=>getmessage} className='buttons' style={{backgroundColor:'greenyellow'}}>Get Message : {currentMessage}</button>
        </div>

      </header>
    </div>);
}
export default App;
