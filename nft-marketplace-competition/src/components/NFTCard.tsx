import classNames from "classnames";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useNFTMarket from "state/nft-market";
import { NFT } from "state/nft-market/interfaces";
import useSigner from "state/signer";
import { ipfsToHTTPS } from "../helpers";
import AddressAvatar from "./AddressAvatar";
import SellPopup from "./SellPopup";

type NFTMetadata = {
  name: string;
  description: string;
  imageURL: string;
  trait:string;
  trait1:string;
  trait2:string;
  trait3:string;
  trait4:string;
  trait5:string;
  trait6:string;
  trait7:string;
};

type NFTCardProps = {
  nft: NFT;
  className?: string;
};

const NFTCard = (props: NFTCardProps) => {
  const { nft, className } = props;
  const { address } = useSigner();
  const { listNFT, cancelListing, buyNFT } = useNFTMarket();
  const router = useRouter();
  const [meta, setMeta] = useState<NFTMetadata>();
  const [loading, setLoading] = useState(false);
  const [sellPopupOpen, setSellPopupOpen] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadataResponse = await fetch(ipfsToHTTPS(nft.tokenURI));
      if (metadataResponse.status != 200) return;
      const json = await metadataResponse.json();
      setMeta({
        name: json.name,
        description: json.description,
        imageURL: ipfsToHTTPS(json.image),
        trait: json.trait,
        trait1: json.trait1,
        trait2: json.trait2,
        trait3: json.trait3,
        trait4: json.trait4,
        trait5: json.trait5,
        trait6: json.trait6,
        trait7: json.trait7,
        
      });
    };
    void fetchMetadata();
  }, [nft.tokenURI]);

  const showErrorToast = () => toast.warn("Something's wrong!!! It could be a wallet network error, unable to execute listNFT!!! Or it could be the user refusing the transaction!!!");
  

  const onButtonClick = async () => {
    if (owned) {
      if (forSale) onCancelClicked();
      else {setSellPopupOpen(true);
      if (meta) {
        console.log("Description:", meta.description);
        console.log("Trait1 Value:", meta.trait);
        console.log("Trait2 Value:", meta.trait1);
        console.log("Trait3 Value:", meta.trait2);
        console.log("Trait4 Value:", meta.trait3);
        console.log("Trait5 Value:", meta.trait4);
        console.log("Trait6 Value:", meta.trait5);
        console.log("Trait7 Value:", meta.trait6);
        console.log("Trait8 Value:", meta.trait7);
      }

    }
      
    } else {
      if (forSale) onBuyClicked();
      else {
        throw new Error(
          "onButtonClick called when NFT is not owned and is not listed, should never happen"
        );
      }
    }
  };

  const onBuyClicked = async () => {
    setLoading(true);
    try {
      await buyNFT(nft);
      router.push("/owned");
      toast.success(
        "You collection will be updated shortly! Refresh the page."
      );
    } catch (e) {
      showErrorToast();
      console.log(e);
    }
    setLoading(false);
  };

  const onCancelClicked = async () => {
    setLoading(true);
    try {
      await cancelListing(nft.id);
      toast.success(
        "You canceled this listing. Changes will be reflected shortly."
      );
    } catch (e) {
      showErrorToast();
      console.log(e);
    }
    setLoading(false);
  };

  const onSellConfirmed = async (price: BigNumber) => {
    setSellPopupOpen(false);
    setLoading(true);
    try {
      await listNFT(nft.id, price);
      toast.success(
        "You listed this NFT for sale. Changes will be reflected shortly."
      );
    } catch (e) {
      showErrorToast();
      console.log(e);
    }
    setLoading(false);
  };

  const forSale = nft.price != "0";
  const owned = nft.owner == address?.toLowerCase();

  return (
    <div
      className={classNames(
        "flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-xl border font-semibold shadow-sm",
        className
      )}
    >
      {meta ? (
        <img
          src={meta?.imageURL}
          alt={meta?.name}
          className="h-80 w-full object-cover object-center"
        />
      ) : (
        <div className="flex h-80 w-full items-center justify-center">
          loading...
        </div>
      )}
      <div className="flex flex-col p-4">
        <p className="text-lg">{meta?.name ?? "..."}</p>
        <span className="text-sm font-normal">
          {meta?.description ?? "..."}
        </span>
        <AddressAvatar address={nft.owner} />
      </div>
      <button
        className="group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white"
        onClick={onButtonClick}
        disabled={loading}
      >
        {loading && "Busy..."}
        {!loading && (
          <>
            {!forSale && "SELL"}
            {forSale && owned && (
              <>
                <span className="group-hover:hidden">{nft.price} ETH</span>
                <span className="hidden group-hover:inline">CANCEL</span>
              </>
            )}
            {forSale && !owned && (
              <>
                <span className="group-hover:hidden">{nft.price} ETH</span>
                <span className="hidden group-hover:inline">BUY</span>
              </>
            )}
          </>
        )}
      </button>
      <SellPopup
        open={sellPopupOpen}
        onClose={() => setSellPopupOpen(false)}
        onSubmit={onSellConfirmed}
        trait={meta?.trait} // 作为属性传递 meta.trait 值
        trait1={meta?.trait1} // 作为属性传递 meta.trait 值
        trait2={meta?.trait2} // 作为属性传递 meta.trait 值
        trait3={meta?.trait3} // 作为属性传递 meta.trait 值
        trait4={meta?.trait4} // 作为属性传递 meta.trait 值
        trait5={meta?.trait5} // 作为属性传递 meta.trait 值
        trait6={meta?.trait6} // 作为属性传递 meta.trait 值
        trait7={meta?.trait7} // 作为属性传递 meta.trait 值
      />
    </div>
  );
};

export default NFTCard;
