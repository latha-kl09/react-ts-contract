"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const config = {
    solidity: "0.8.19",
    networks: {
        hardhat: {},
        fantom: {
            url: process.env.WALLET_RPC_URL,
            accounts: ['9612692906034fe651d16daf6da057ca18a29d1c0e1e614b3e56c2cd3f90495c'],
        },
    },
};
exports.default = config;
