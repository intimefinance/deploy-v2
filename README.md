# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
## Development Environment

Use npm v8.19.2 and node v18.12.1 for develpoment.

## Deploy Contracts

```shell
npx hardhat run scripts/deploy.ts  --network core_test
```

## Verify Contracts

1. Verify Factory
```shell
npx hardhat verify --network core_test `factory_address` "0x0000000000000000000000000000000000000000"
```
2. Verify Router
```shell
npx hardhat verify --network core_test `router_address` `factory_address` `weth9_address`
```
