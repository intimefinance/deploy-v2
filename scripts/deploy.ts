import { ethers } from "hardhat";

type ContractJson = { abi: any; bytecode: string };
const artifacts: { [name: string]: ContractJson } = {
  UniswapV2Factory: require("@uniswap/v2-core/build/UniswapV2Factory.json"),
  UniswapV2Router02: require("@uniswap/v2-periphery/build/UniswapV2Router02.json"),
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const weth9Address = "0xeEFc44237354771fEb09Aa0a18A85eD536F15184";

  // deploy factory
  const uniswapV2FactoryContractFactory = new ethers.ContractFactory(
    artifacts.UniswapV2Factory.abi,
    artifacts.UniswapV2Factory.bytecode,
    deployer
  );
  // Param of UniswapV2Factory is address of _feeToSetter, I set it to ZeroAddress for test.
  // More detail, check the code of UniswapV2Factory.sol and UniswapV2Pair.sol
  // https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Factory.sol
  // https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol
  const uniswapV2Factory = await uniswapV2FactoryContractFactory.deploy(
    ethers.ZeroAddress
  );
  const uniswapV2FactoryAddress = await uniswapV2Factory.getAddress();
  console.log(`uniswapV2FactoryAddress: ${uniswapV2FactoryAddress}`);

  // deploy router
  const uniswapV2Router02ContractFactory = new ethers.ContractFactory(
    artifacts.UniswapV2Router02.abi,
    artifacts.UniswapV2Router02.bytecode,
    deployer
  );
  const uniswapV2Router02 = await uniswapV2Router02ContractFactory.deploy(
    uniswapV2FactoryAddress,
    weth9Address
  );
  const uniswapV2Router02Address = await uniswapV2Router02.getAddress();
  console.log(`uniswapV2Router02Address: ${uniswapV2Router02Address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
