import { ethers } from "hardhat";
async function main() {
    // 部署合约
    const MyContract = await ethers.getContractFactory('NFTMarket');
    const contractAddress = '0x06A9aC3C2d3983F20135C641551980CFa0E3A541'; // 用您的合约地址替换这里
    const myContract = MyContract.attach(contractAddress);
  
    // 获取合约部署的网络ID
    const networkId = await ethers.provider.getNetwork().chainId;
  
    console.log(`Contract deployed on network with ID: ${networkId}`);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  