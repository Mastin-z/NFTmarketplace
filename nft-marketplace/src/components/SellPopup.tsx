import { BigNumber, ethers } from "ethers";
import { useState,useEffect } from "react";
import Button from "./Button";
import CustomDialog from "./CustomDialog";
import { Input } from "./Input";
import { fetchNFTCountPeriodically } from './calculation'; // 根据 getdata 文件的实际路径进行导入


type SellPopupProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (price: BigNumber) => void;
  trait: string | undefined; // 添加 trait 属性
  trait1: string | undefined; // 添加 trait 属性
  trait2: string | undefined; // 添加 trait 属性
  trait3: string | undefined; // 添加 trait 属性
  trait4: string | undefined; // 添加 trait 属性
  trait5: string | undefined; // 添加 trait 属性
  trait6: string | undefined; // 添加 trait 属性
  trait7: string | undefined; // 添加 trait 属性
 
};

const SellPopup = (props: SellPopupProps) => {
  const { open, onClose, onSubmit,trait,trait1,trait2,trait3,trait4,trait5,trait6,trait7 } = props;
  const [error, setError] = useState<string>();
  const [market_factor_total, setMarket_factor] = useState<any>();
  //享乐模型权重:
  const Mi =3.638;
  const Ma =0.206;
  const Mb =-1.202;
  const Mc =-0.007;
  const Md =-0.322;
  const Me =0.208;
  const Mf =-2.035;
  const Mg =-0.116;
  const Mh =0.143;
  //x1-x8为发布方自行设计的每个特征的稀有度(取0-1).
  // const x1 = parseFloat(props.trait);  没有默认值
  const x1 = trait ? parseFloat(trait) : 0.01;
  const x2 =trait1 ? parseFloat(trait1) : 0.01;
  const x3 =trait2 ? parseFloat(trait2) : 0.01;
  const x4 =trait3 ? parseFloat(trait3) : 0.01;
  const x5 =trait4 ? parseFloat(trait4) : 0.01;
  const x6 =trait5 ? parseFloat(trait5) : 0.01;
  const x7 =trait6 ? parseFloat(trait6) : 0.01;
  const x8 =trait7 ? parseFloat(trait7) : 0.01;

  
  // ///获取市场因子
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchNFTCountPeriodically();
        setMarket_factor(result);
      } catch (error) {
        // 处理错误
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []); // 使用useEffect来调用异步函数
  // 这里你可以在外部访问解析后的值
  useEffect(() => {
    if (market_factor_total !== undefined) {
      // 这里你可以在外部访问解析后的值
      console.log('market_factor:', market_factor_total);    
      // 更新 defaultPrice 或执行其他操作
    }
  }, [market_factor_total]);


  const originalValue = (0.01*((Mi +Ma*x1+Mb*x2+Mc*x3+Md*x4+Me*x5+Mf*x6+Mg*x7+Mh*x8)+(market_factor_total))).toString(); // 享乐模型加市场因子
  const defaultPrice1 = parseFloat(originalValue).toFixed(18); // 保留18位小数
  const defaultPrice =defaultPrice1.toString();

  const onConfirm = () => {
    // const defaultPrice1 = "0.0000001299";
    const wei = ethers.utils.parseEther(defaultPrice);
    onSubmit(wei);
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="List NFT for Sale"
      description="This will list the NFT for sale, you can cancel anytime."
    >
      <div className="flex items-end">
        <div className="mr-2 flex flex-grow flex-col">
          <label
            htmlFor="price"
            className="ml-2 text-xs font-semibold text-gray-500"
          >
            PRICE (ETH)
          </label>
          <Input
            name="price"
            id="price"
            type="number"
            value={defaultPrice}
            readOnly // 设置输入框为只读
          />
        </div>
        <Button onClick={onConfirm}>CONFIRM</Button>
      </div>
    </CustomDialog>
  );
};

export default SellPopup;

