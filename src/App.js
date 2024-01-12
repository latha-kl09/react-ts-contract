import { useState } from 'react';
import React from 'react';
import "./App.css"
// import { Console } from 'console';
const ethers = require("ethers")

let add;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const contractAddress = async()=> {
   add = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
console.log("before waiting");
await delay(1000);
console.log("after wait", add)
}

async function displayAddress(){
 await contractAddress();
  document.getElementById("fetch").innerHTML= add;
}

function App() {

  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  const [connButtonText, setConnButtonText] = useState('Connect Wallet');


  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [setProvider] = useState(null);
	const [ setSigner] = useState(null);
	const [defaultContract,setContract] = useState(null);



  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
    console.log("Wallet Connected");
	}

  // console.log(contractAddress);

  const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

  const updateEthers = () => {
		let tempProvider = new ethers.BrowserProvider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, tempSigner);
		setContract(tempContract);	
		
	}


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

  // async function setmessage(){
  //   if(!message) return;
  //   console.log(" Hello Devisha");

  //   if (typeof window.ethereum !== "undefined"){
  //     await connectWalletHandler();

  //     const provider = new ethers.provider.BrowserProvider(window.ethereum);
  //     const signer = new provider.getSigner();

  //     const contract = new ethers.Contract(contractAddress, signer);
  //     const transaction = await contract.setMessage(message);

  //     setMessage("");
  //     await transaction.wait();
  //     getmessage();
  //   }
  // }

  // const setmessage = (event) => {
	// 	event.preventDefault();
	// 	console.log('sending ' + event.target.setText.value + ' to the contract');
	// 	defaultContract.setmsg(event.target.setText.value);
	// }

  const setmessage = async (event) => {
    try {
      event.preventDefault();
  
      console.log('Sending ' + event.target.setText.value + ' to the contract');
  
      // Assuming defaultContract.setmsg returns a promise
      await defaultContract.setmsg(event.target.setText.value);
  
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error while sending message:', error);
    }
  };
  

  //HTML CODE
    return (<div className="App">
      <header className="App-header">
        <div className='title'>
          <h1 >Typescript React App</h1>
          <p>Created by my own using ReactJs, Hardhat and ethers </p>
        </div>
        
        <div color='white'>
          <button onClick={connectWalletHandler} className='buttons' style={{backgroundColor:'red'}} > {connButtonText} </button>
          <h3 style={{fontSize:'2rem'}}>Address: {defaultAccount}</h3>
        </div>

        <div>
          <button onClick={contractAddress} className='buttons' id='fetch' style={{backgroundColor:'grey'}}>Get Contract Address</button>
				    {/* <h3 style={{fontSize:'1.5rem'}}> Contract Address: {contractAddress} </h3> */}
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
