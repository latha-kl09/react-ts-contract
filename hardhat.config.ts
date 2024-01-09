import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require ('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks : {
    hardhat: {
    },
    fantom : {
      url: process.env.WALLET_RPC_URL,
      accounts : [ '9612692906034fe651d16daf6da057ca18a29d1c0e1e614b3e56c2cd3f90495c' ],

    },
  },
};

export default config;
