// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";



struct NFTListing {
  uint256 price;
  address seller;
}

contract NFTMarket is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  Counters.Counter private _tokenIDs;
  Counters.Counter private _nftCount;
  Counters.Counter private _transactionCount;
  Counters.Counter private _sellerCount;
  mapping(uint256 => NFTListing) private _listings;
  mapping(address => bool) private _sellers;
  mapping(address => uint256) private _sellerNFTCount;

  using EnumerableSet for EnumerableSet.AddressSet; // 使用 EnumerableSet.AddressSet 存储买家地址
  EnumerableSet.AddressSet private _buyers; // 存储买家地址的集合
uint256 private totalAmount; // 用于跟踪总金额

  // if tokenURI is not an empty string => an NFT was created
  // if price is not 0 => an NFT was listed
  // if price is 0 && tokenURI is an empty string => NFT was transferred (either bought, or the listing was canceled)
  event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);

  constructor() ERC721("Abdou's NFTs", "ANFT")  {
		// 初始化 totalAmount 为 0
        totalAmount = 0;
		}

  function createNFT(string calldata tokenURI) public  {
      _tokenIDs.increment();
      _nftCount.increment();
      uint256 currentID = _tokenIDs.current();
      _safeMint(msg.sender, currentID);
      _setTokenURI(currentID, tokenURI);
      emit NFTTransfer(currentID, address(0),msg.sender, tokenURI, 0);
  }

  function listNFT(uint256 tokenID, uint256 price) public {
    require(price > 0, "NFTMarket: price must be greater than 0");
    transferFrom(msg.sender, address(this), tokenID);
    _listings[tokenID] = NFTListing(price, msg.sender);
    emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    // 添加卖家地址到集合中，增加其售卖的NFT数量
    if (!_sellers[msg.sender]) {
      _sellers[msg.sender] = true;
      _sellerCount.increment();
    }
    _sellerNFTCount[msg.sender] = _sellerNFTCount[msg.sender].add(1);

}

  function buyNFT(uint256 tokenID) public payable {
     NFTListing memory listing = _listings[tokenID];
     require(listing.price > 0, "NFTMarket: nft not listed for sale");
     require(msg.value == listing.price, "NFTMarket: incorrect price");
     ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
     clearListing(tokenID);
     payable(listing.seller).transfer(listing.price.mul(95).div(100));
     totalAmount = totalAmount.add(listing.price); // 更新总金额
     emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);

	   // 增加买家数量
     if (!_buyers.contains(msg.sender)) {
       _buyers.add(msg.sender);
     }
		 _transactionCount.increment();
  }

  function cancelListing(uint256 tokenID) public {
     NFTListing memory listing = _listings[tokenID];
     require(listing.price > 0, "NFTMarket: nft not listed for sale");
     require(listing.seller == msg.sender, "NFTMarket: you're not the seller");
     ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
     clearListing(tokenID);
     emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);

     // 从卖家集合中移除卖家的一个NFT
    if (_sellerNFTCount[msg.sender] > 0) {
      _sellerNFTCount[msg.sender] = _sellerNFTCount[msg.sender].sub(1);
      
      // 如果卖家没有在任何NFT上挂牌，减少卖家计数
      if (_sellerNFTCount[msg.sender] == 0) {
        _sellers[msg.sender] = false;
        _sellerCount.decrement();
      }
    }
  }

  function withdrawFunds() public onlyOwner {
    uint256 balance =  address(this).balance;
    require(balance > 0, "NFTMarket: balance is zero");
    payable(msg.sender).transfer(balance); 
  }

  function clearListing(uint256 tokenID) private {
    _listings[tokenID].price = 0;
    _listings[tokenID].seller= address(0);
  }

	function getNFTCount() external view returns (uint256) {
	    return _nftCount.current();
	}

	// 创建一个只读函数以返回交易次数
	function getTransactionCount() external view returns (uint256) {
	        return _transactionCount.current();
		}

  // 获取买家数量
  function getSellerCount() public view returns (uint256) {
    return _sellerCount.current();
  }

	// 创建一个只读函数以返回买家数量
  function getBuyerCount() external view returns (uint256) {
    return _buyers.length();
  }

	// 创建一个只读函数以返回合约中的总金额
  function getTotalAmount() external view returns (uint256) {
    return totalAmount;
  }



}