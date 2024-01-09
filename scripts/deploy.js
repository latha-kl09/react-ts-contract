"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
// import hre from 'hardhat'
async function main() {
    const LathasOwn = await hardhat_1.ethers.getContractFactory('LathasOwn');
    console.log("before deployment");
    const latha = await LathasOwn.deploy();
    await latha.waitForDeployment();
    // Obtain the contract address from the transaction receipt
    console.log("Contract deployed to:", await latha.getAddress());
    console.log("after deployment");
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
