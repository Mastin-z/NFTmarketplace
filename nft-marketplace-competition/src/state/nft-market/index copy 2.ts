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


const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);

  const ownedNFTs = useOwnedNFTs();
  const ownedListedNFTs = useOwnedListedNFTs();
  const listedNFTs = useListedNFTs();
  const nftchainid = 11155111;
  // console.log("NFT_CHAINID:", process.env.NFT_CHAINID);


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

  const getNFTCount = async () => {
    try {
      const nftCount = await nftMarket.getNFTCount(); // 调用智能合约中获取NFT数量的函数
      return nftCount;
    } catch (error) {
      console.error("获取NFT数量时出错:", error);
      return null;
    }
  };

  const getTransactions = async () => {
    try {
      const nft_transactions = await nftMarket.getTransactions(); // 调用智能合约中获取NFT数量的函数
      return nft_transactions;
    } catch (error) {
      console.error("获取NFT数量时出错:", error);
      return null;
    }
  };

  const createNFT = async (values: CreationValues) => {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("image", values.image!);
      data.append("trait", values.trait);

      const response = await fetch("/api/nft-storage", {
        method: "POST",
        body: data,
      });
      if (response.status == 201) {
        const json = await response.json();
        const transaction: TransactionResponse = await nftMarket.createNFT(
          json.uri
        );
        await transaction.wait();
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
    const transaction: TransactionResponse = await nftMarket.cancelListing(
      tokenID
    );
    await transaction.wait();
  };

  const buyNFT = async (nft: NFT) => {
    const transaction: TransactionResponse = await nftMarket.buyNFT(nft.id, {
      value: ethers.utils.parseEther(nft.price),
    });
    await transaction.wait();
  };

  return {
    createNFT,
    listNFT,
    cancelListing,
    buyNFT,
    getConnectedBlockchainName,
    getNFTCount,
    getTransactions,
    ...ownedNFTs,
    ...ownedListedNFTs,
    ...listedNFTs,
  };
};

export default useNFTMarket;
