// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AnimalHumanCounter {
    int256 public animalCounter; // Counter value for animals
    int256 public humanCounter; // Counter value for humans
    string[] public animalNames; // Array of animal names
    string[] public humanNames; // Array of human names

    /// Initialize with 10 animal and 10 human names, and counters set to 0
    constructor() {
        animalNames = [
            "Lion",
            "Tiger",
            "Elephant",
            "Eagle",
            "Dolphin",
            "Panda",
            "Kangaroo",
            "Cheetah",
            "Penguin",
            "Wolf"
        ];

        humanNames = [
            "Alice",
            "Bob",
            "Charlie",
            "Diana",
            "Ethan",
            "Fiona",
            "George",
            "Hannah",
            "Isaac",
            "Julia"
        ];

        // Initialize counters to 0
        animalCounter = 0;
        humanCounter = 0;
    }

    /// Increment the animal counter
    function incrementAnimal() public {
        animalCounter++;
    }

    /// Increment the human counter
    function incrementHuman() public {
        humanCounter++;
    }

    /// Get the current animal counter value
    function getAnimalCounter() public view returns (int256) {
        return animalCounter;
    }

    /// Get the current human counter value
    function getHumanCounter() public view returns (int256) {
        return humanCounter;
    }

    /// Get the current random name (either animal or human)
    function getRandomName() public view returns (string memory name, string memory category) {
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp))) % 20;
        if (randomIndex < 10) {
            return (animalNames[randomIndex], "animal");
        } else {
            return (humanNames[randomIndex - 10], "human");
        }
    }

    /// Reset both counters to 0
    function resetCounters() public {
        animalCounter = 0;
        humanCounter = 0;
    }

    /// Handle wrong guesses and reset counters if necessary
    function wrongGuess(string memory guessCategory) public {
        (, string memory correctCategory) = getRandomName();

        // If the guess is incorrect, reset both counters
        if (keccak256(abi.encodePacked(guessCategory)) != keccak256(abi.encodePacked(correctCategory))) {
            resetCounters();  // Reset counters
        }
    }
}
