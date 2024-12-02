# AnimalHumanCounter DApp

## Overview

**AnimalHumanCounter** is a decentralized application (DApp) that uses a smart contract to track and identify names of animals and humans. The application allows users to guess whether a randomly generated name is an animal or a human, and increments the relevant counters accordingly. If the guess is incorrect, both counters are reset to zero.

## Features

- **Track Animal Names**: Identifies and counts animal names.
- **Track Human Names**: Identifies and counts human names.
- **Random Name Generation**: Generates a random name from a predefined list of animal and human names.
- **User Interface**: Connect to the application using MetaMask and interact with the contract via a simple UI.

## Technologies Used

- **Solidity**: For writing the smart contract.
- **Hardhat**: For developing, testing, and deploying the smart contract.
- **React**: For building the user interface.
- **Ethers.js**: For interacting with the Ethereum blockchain.

## Getting Started

### Prerequisites

- Node.js
- MetaMask extension for your web browser
- An Ethereum account with some test ETH

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/AnimalHumanCounter.git
    cd AnimalHumanCounter
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Compile the smart contract:**

    ```bash
    npx hardhat compile
    ```

4. **Deploy the smart contract to a local blockchain:**

    ```bash
    npx hardhat node
    npx hardhat run --network localhost scripts/deploy.js
    ```

5. **Update the contract address in the React application:**

    Open `HomePage.js` and update the `contractAddress` variable with the address of your deployed contract.

6. **Start the React application:**

    ```bash
    npm run dev
    ```

### Usage

1. **Connect your wallet:**

    Open the application in your web browser and connect your MetaMask wallet.

2. **Interact with the application:**

    - Click the "Animal" button to guess an animal name.
    - Click the "Human" button to guess a human name.
    - The counters will update accordingly, and a new random name will be generated after each action.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the creators of Hardhat, Ethers.js, and React for their excellent tools.
- Thanks to the Ethereum community for their support and resources.

