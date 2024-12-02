import { useState, useEffect } from "react";
import { ethers } from "ethers";
import counterAbi from "../artifacts/contracts/Assessment.sol/AnimalHumanCounter.json"; // Update the import path as needed


export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [counterContract, setCounterContract] = useState(undefined);
  const [animalCounter, setAnimalCounter] = useState(0);
  const [humanCounter, setHumanCounter] = useState(0);
  const [randomName, setRandomName] = useState("");
  const [category, setCategory] = useState(""); // "animal" or "human"

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your contract's deployed address
  const counterABI = counterAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getCounterContract();
  };

  const getCounterContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, counterABI, signer);

    setCounterContract(contract);
  };

  const getRandomName = async () => {
    if (counterContract) {
      const [name, nameCategory] = await counterContract.getRandomName();
      setRandomName(name);
      setCategory(nameCategory);
    }
  };

  const updateCounters = async () => {
    if (counterContract) {
      const animalCount = await counterContract.getAnimalCounter();
      const humanCount = await counterContract.getHumanCounter();
      setAnimalCounter(animalCount.toNumber());
      setHumanCounter(humanCount.toNumber());
    }
  };

  const handleAnimalButtonClick = async () => {
    if (counterContract) {
      const [name, correctCategory] = await counterContract.getRandomName();
      if (correctCategory !== "animal") {
        // If the guess is wrong, reset the counters
        const tx = await counterContract.wrongGuess("animal");
        await tx.wait();
      } else {
        // If the guess is correct, increment the animal counter
        const tx = await counterContract.incrementAnimal();
        await tx.wait();
      }
      updateCounters(); // Fetch updated counters after the action
      getRandomName(); // Fetch a new random name
    }
  };

  const handleHumanButtonClick = async () => {
    if (counterContract) {
      const [name, correctCategory] = await counterContract.getRandomName();
      if (correctCategory !== "human") {
        // If the guess is wrong, reset the counters
        const tx = await counterContract.wrongGuess("human");
        await tx.wait();
      } else {
        // If the guess is correct, increment the human counter
        const tx = await counterContract.incrementHuman();
        await tx.wait();
      }
      updateCounters(); // Fetch updated counters after the action
      getRandomName(); // Fetch a new random name
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this app.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}style={{backgroundColor: 'yellow', width:"15vw",borderRadius:"15%", height:"8vh", fontFamily: "Joker", fontSize: "30px"}}>Connect Wallet</button>;
    }

    if (randomName === "") {
      getRandomName(); // Fetch random name on page load
    }

    return (
  
        <div className="buttonstyle1">
          <button className="styled-button" onClick={handleAnimalButtonClick} style={{backgroundColor: 'yellow', width:"10vw",borderRadius:"15%", height:"10vh", fontFamily: "Joker", fontSize: "50px"}}>Animal</button>
          <button className="styled-button" onClick={handleHumanButtonClick}style={{backgroundColor: 'yellow', width:"10vw",borderRadius:"15%", height:"10vh", fontFamily: "Joker", fontSize: "50px"}}>Human</button>
        </div>

    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Animal & Human Name Tracker</h1>
        <div className="div-container">
        <h2>System Description</h2>
        <p><strong>Functions:</strong></p>
        <ul>
          <li><strong>Animal Counter:</strong> Identifies the animals.</li>
          <li><strong>Human Counter:</strong> Identifies the human names.</li>
        </ul>
        <p><strong>Use Case:</strong> Identifying whether it is an Animal or a Human Name.</p>
        </div>
        <div className="user-interface">
        <p>Your Account: {account}</p>
        <p>Animal Counter: {animalCounter}</p>
        <p>Human Counter: {humanCounter}</p>
        <p>Random Category: {randomName}</p>
        </div>
      </header>
      {initUser()}
      <style jsx>{`

        .container {
          text-align: center;
          font-family: 'Roboto', sans-serif;
          padding: 20px;
          background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
          min-height: 100vh;
        }
        header {
          background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,255,239,1) 35%, rgba(0,212,255,1) 100%);
          padding: 20px;
          color: white;
          border-radius: 8px;
        }
        h1 {
          font-size: 2.8rem;
          letter-spacing: 1px;
          color: black;
        }
        
        .div-container {
          background: linear-gradient(to right, #00bcd4, #4caf50);
          padding: 30px;
          border-radius: 12px;
          margin: 30px auto;
          width: 80%;
          max-width: 700px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          color: black;
        }
        h2 {
          font-size: 2.8rem;
          letter-spacing: 1px
          color: black;
        }
        p, ul {
          font-size: 1.3rem;
          color: #333;
          color: black;
        }
        ul {
          list-style-type: circle;
          margin-left: 20px;
          color: black;
        }
        .user-interface {
          background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,164,218,1) 8%, rgba(0,212,255,1) 100%);
          padding: 30px;
          border-radius: 12px;
          width: 80%;
          max-width: 700px;
          margin: 30px auto;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </main>
  );
}
