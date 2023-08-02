import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { PrivateKey } from "./secret.json";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      { version: "0.8.19", settings: {} },
      {
        version: "0.6.6", // UniswapV2Router02.sol
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999, // from https://etherscan.io/address/0x7a250d5630b4cf539739df2c5dacb4c659f2488d#code
          },
        },
      },
      {
        version: "0.5.16", // UniswapV2Factory.sol
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999, // from https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#code
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    core_test: {
      url: "https://rpc.test.btcs.network",
      accounts: [PrivateKey],
      chainId: 1115,
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: {
      core_test: "a1c63d213ea84e76addd1819a089a9b9",
    },
    customChains: [
      {
        network: "core_test",
        chainId: 1115,
        urls: {
          apiURL: "https://api.test.btcs.network/api/",
          browserURL: "https://scan.test.btcs.network/",
        },
      },
    ],
  },
};

export default config;
