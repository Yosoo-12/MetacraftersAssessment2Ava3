const hre = require("hardhat");

async function main() {
  const AnimalHumanCounter = await hre.ethers.getContractFactory("AnimalHumanCounter");
  const counter = await AnimalHumanCounter.deploy();
  await counter.deployed();

  console.log(`AnimalHumanCounter deployed to ${counter.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
