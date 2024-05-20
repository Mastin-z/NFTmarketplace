import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, Contract, ethers } from "ethers";
import { CreationValues } from "modules/CreationPage/CreationForm";
import useSigner from "state/signer";
import NFT_MARKET from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { NFT_MARKET_ADDRESS } from "./config";
import { NFT } from "./interfaces";
import useListedNFTs from "./useListedNFTs";
import useOwnedListedNFTs from "./useOwnedListedNFTs";
import useOwnedNFTs from "./useOwnedNFTs";
import { number } from "yup";
import { useEffect, useState } from 'react';
// import "dotenv/config";
// import Web3 from 'web3';


const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);

  const ownedNFTs = useOwnedNFTs();
  const ownedListedNFTs = useOwnedListedNFTs();
  const listedNFTs = useListedNFTs();
  const nftchainid = 11155111;
  const [nftCount, setNFTCount] = useState(null);
  // const SEPOLIA_URL = process.env.SEPOLIA_URL as string;
  // const NFT_MARKET_ABI = process.env.NFT_MARKET_ABI as string;
  // const web3 = new Web3(SEPOLIA_URL); // 替换为你的以太坊节点URL
  // const abi = NFT_MARKET_ABI; // 替换为你的合约ABI
  



  ///网络判断部分
  const getConnectedBlockchainName = async () => {
    try {
      if (!signer) {
        console.error("Signer Undefined");
        return null;
      }
      // console.log("This code will execute.");

      await signer.provider.send("eth_requestAccounts", []);
      const network = await signer.provider.getNetwork();
      // console.log(network.chainId);
      // console.log(network.name);
      return { chainId: network.chainId, name: network.name }; // BlockchainID

    } catch (error) {
      console.error("Unable to get blockchain name wuwuwuuwuw!:", error);
      return null; 
    }
  };


  ///获取数据部分:

  const getNFTCount = async () => {
    try {
      const nftCount1 = await nftMarket.getNFTCount(); // 调用智能合约中获取NFT数量的函数
      const nftCount =nftCount1.toNumber();
      // const nftCount =2151;
      return nftCount;
    } catch (error) {
      console.error("获取NFT数量时出错:", error);
      return 666;
    }
  };

  const getTransactionCount = async () => {
    try {
      const transactionCount1 = await nftMarket.getTransactionCount(); // 调用智能合约中获取NFT数量的函数
      const transactionCount =transactionCount1.toNumber();
      // const transactionCount =2152;
      return transactionCount;
    } catch (error) {
      console.error("获取NFT交易量时出错:", error);
      return 666;
    }
  };

  const getBuyerCount = async () => {
    try {
      const buyerCount1 = await nftMarket.getBuyerCount(); // 调用智能合约中获取NFT数量的函数
      const buyerCount =buyerCount1.toNumber();
      // const buyerCount =2153;
      return buyerCount;
    } catch (error) {
      console.error("获取NFT买家数量时出错:", error);
      return 666;
    }
  };

  const getSellerCount = async () => {
    try {
      
      const SellerCount1 = await nftMarket.getSellerCount(); // 调用智能合约中获取NFT数量的函数
      const SellerCount =SellerCount1.toNumber();
      // const SellerCount =2154
      return SellerCount;
    } catch (error) {
      console.error("获取NFT买家数量时出错:", error);
      return 666;
    }
  };


  const getTotalAmount = async () => {
    try {
      const TotalAmount2 = await nftMarket.getTotalAmount(); // 调用智能合约中获取NFT数量的函数
      const totalAmountInWei =parseInt(TotalAmount2._hex, 16)
      const totalAmountInEth = totalAmountInWei / 1e18;
      // const TotalAmount =parseFloat(TotalAmount1); 

      return totalAmountInEth;
    } catch (error) {
      console.error("获取NFT买家数量时出错:", error);
      return 666;
    }
  };


  ///市场交易部分:

  const createNFT = async (values: CreationValues) => {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("image", values.image!);
      data.append("trait", values.trait);
      data.append("trait1", values.trait1);
      data.append("trait2", values.trait2);
      data.append("trait3", values.trait3);
      data.append("trait4", values.trait4);
      data.append("trait5", values.trait5);
      data.append("trait6", values.trait6);
      data.append("trait7", values.trait7);

      const response = await fetch("/api/nft-storage", {
        method: "POST",
        body: data,
      });
      if (response.status == 201) {
        const json = await response.json();
        // Get BlockchainID
    const blockchainID = await getConnectedBlockchainName(); 

      if(blockchainID?.chainId === nftchainid){
        const transaction: TransactionResponse = await nftMarket.createNFT(
          json.uri
        );
        await transaction.wait();
      }else {
        throw new Error("Wallet network error, unable to execute listNFT");
        // console.log("网络ID不匹配,无法执行 cancelListing");
      }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const listNFT = async (tokenID: string, price: BigNumber) => {
    // Get BlockchainID
    const blockchainID = await getConnectedBlockchainName(); 

    if(blockchainID?.chainId === nftchainid){
    const transaction: TransactionResponse = await nftMarket.listNFT(
      tokenID,
      price
    );
    
    await transaction.wait();
    
  }else {
    throw new Error("Wallet network error, unable to execute listNFT");
    // console.log("网络ID不匹配,无法执行 cancelListing");
  }};

  const cancelListing = async (tokenID: string) => {
    // Get BlockchainID
    const blockchainID = await getConnectedBlockchainName(); 

    if(blockchainID?.chainId === nftchainid){
    const transaction: TransactionResponse = await nftMarket.cancelListing(
      tokenID
    );
    await transaction.wait();

  }else {
    throw new Error("Wallet network error, unable to execute listNFT");
    // console.log("网络ID不匹配,无法执行 cancelListing");
  }
  };

  const buyNFT = async (nft: NFT) => {
     // Get BlockchainID
     const blockchainID = await getConnectedBlockchainName(); 

     if(blockchainID?.chainId === nftchainid){
    const transaction: TransactionResponse = await nftMarket.buyNFT(nft.id, {
      value: ethers.utils.parseEther(nft.price),
    });
    await transaction.wait();
  }else {
    throw new Error("Wallet network error, unable to execute listNFT");
    // console.log("网络ID不匹配,无法执行 cancelListing");
  }
  };

  return {
    createNFT,
    listNFT,
    cancelListing,
    buyNFT,
    getConnectedBlockchainName,
    getNFTCount,
    getTransactionCount,
    getBuyerCount,
    getSellerCount,
    getTotalAmount,
    ...ownedNFTs,
    ...ownedListedNFTs,
    ...listedNFTs,
  };
};

export default useNFTMarket;
