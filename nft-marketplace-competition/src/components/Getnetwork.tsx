import React, { useState, useEffect } from 'react';
import useNFTMarket from "state/nft-market";

function Getnetwork() {
  const { getConnectedBlockchainName } = useNFTMarket();
  const [blockchainName, setBlockchainName] = useState("");

  const fetchBlockchainName = async () => {
    const name = await getConnectedBlockchainName();
    if (name?.name) {
      setBlockchainName(name?.name);
    } else {
      setBlockchainName("Unable to fetch blockchain name.");
    }
  };

  // useEffect(() => {
  //   fetchBlockchainName();
  // }, []);

  

  return (
    <div>
      <button onClick={fetchBlockchainName}>CurrentChain  </button>
      <div>
        {blockchainName && <p>Blockchain: {blockchainName}</p>}
      </div>
      {/* 其他组件内容 */}
    </div>
  );
}

export default Getnetwork;
