import classNames from "classnames";
import EmptyState from "components/EmptyState";
import { toast } from "react-toastify";
import useNFTMarket from "state/nft-market";
import useSigner from "state/signer";
import CreationForm, { CreationValues } from "./CreationForm";
import CreationForm1, { CreationValues1 } from "./CreationForm1";




// CreationPage in code1

const CreationPage = () => {
  const { signer } = useSigner();
  const { createNFT } = useNFTMarket();

  const onSubmit = async (values: CreationValues) => {
    try {
      await createNFT(values);
      console.log('6666:',values)
      toast.success("You'll see your new NFT here shortly. Refresh the page.");
    } catch (e) {
      toast.warn("Something wrong!");
      console.log(e);
    }
  };
  const onSubmit1 = async (values1: CreationValues1) => {
    
  };


  return (
    <div className={classNames("flex h-full w-full flex-col")}>
      {!signer && <EmptyState>Connect your wallet</EmptyState>}
      {signer && (
        <div className="flex justify-between">
          <CreationForm onSubmit={onSubmit} />
          <CreationForm1 onSubmit={onSubmit1}/>
        </div>
      )}
    </div>
  );
};

export default CreationPage;
