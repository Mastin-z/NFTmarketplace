import useNFTMarket from "state/nft-market";
import { useEffect } from "react";
import React from 'react';

import CreationForm1, { CreationValues1 } from "../../modules/CreationPage/CreationForm1";


// 添加导出语句以将其变为一个模块

export {};
 function fetchColumnData(columnToFetch:any) {
    return fetch(`http://localhost:3000/readData/${columnToFetch}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json());
  }


    // 前端代码中使用 async/await 来获取数据
async function getData() {
try {
    const supply = await fetchColumnData('supply');
    console.log(supply);
    const total_transactions = await fetchColumnData('total_transactions');
    console.log(total_transactions);
    const unique_buyers = await fetchColumnData('unique_buyers');
    console.log(unique_buyers);
    const unique_sellers = await fetchColumnData('unique_sellers');
    console.log(unique_sellers);
    const total_price_usd = await fetchColumnData('total_price_usd');
    console.log(total_price_usd);
    const wash_sales_usd = await fetchColumnData('wash_sales_usd');
    console.log(wash_sales_usd);
    const wash_transactions = await fetchColumnData('wash_transactions');
    console.log(wash_transactions);
    const wash_sales_percentage = await fetchColumnData('wash_sales_percentage');
    console.log(wash_sales_percentage);
    const trade_profit_usd = await fetchColumnData('trade_profit_usd');
    console.log(trade_profit_usd);
    
    return { supply, total_transactions, unique_buyers,unique_sellers,total_price_usd,wash_sales_usd,wash_transactions,wash_sales_percentage, trade_profit_usd};

} catch (error) {
    console.error(error);
    return {};
}
}





 



  
  
  function saveData(newDataToStore:any) {
    fetch('http://localhost:3000/saveData', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDataToStore),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  export const fetchNFTCountPeriodically = async () => {
    // const intervalInMilliseconds = 24 * 60 * 60 * 1000; // 24小时

      getData();
      const data = await getData();
      console.log("888:",data)
      ///市场因子权重
      const w1 =0.145;
      const w2 =0.134;
      const w3 =0.152;
      const w4 =0.077;
      const w5 =0.047;
      const w6 =0.125;
      const w7 =0.079;
      const w8 =0.143;
      const w9 =0.098;

      ///市场因子各个因子读取():
  
      const supply =parseFloat(data.supply.supply);
      console.log("888supply:",supply)
      const total_transactions =parseFloat(data.total_transactions.total_transactions);
      console.log("total_transactions:",total_transactions)
      const unique_buyers =parseFloat(data.unique_buyers.unique_buyers);
      console.log("unique_buyers:",unique_buyers)
      const unique_sellers =parseFloat(data.unique_sellers.unique_sellers);
      console.log("unique_sellers:",unique_sellers)
      const total_price_usd =parseFloat(data.total_price_usd.total_price_usd);
      console.log("total_price_usd:",total_price_usd)
      const wash_sales_usd =parseFloat(data.wash_sales_usd.wash_sales_usd);
      console.log("888swash_sales_usd:",wash_sales_usd)
      const wash_transactions =parseFloat(data.wash_transactions.wash_transactions);
      console.log("wash_transactions:",wash_transactions)
      const wash_sales_percentage =parseFloat(data.wash_sales_percentage.wash_sales_percentage);
      console.log("wash_sales_percentage:",wash_sales_percentage)
      const trade_profit_usd =parseFloat(data.trade_profit_usd.trade_profit_usd);
      console.log("trade_profit_usd:",trade_profit_usd)

      //计算market_factor
      const market_factor=w1*total_transactions+w2*unique_buyers+w3*unique_sellers+w4*total_price_usd+w5*trade_profit_usd+w6*supply-w7*wash_sales_usd-w8*wash_transactions-w9*wash_sales_percentage
      console.log("market_factor:",market_factor)

      if(market_factor===null){
        const market_factor=0;
        return market_factor;
      }

      return market_factor;

  };
  // const newDataToStore = {
  //   supply:0,
  //   total_transactions:0,
  //   unique_buyers:0,
  //   unique_sellers:0,
  //   total_price_usd:0,
  //   wash_sales_usd:0,
  //   wash_transactions:0,
  //   wash_sales_percentage:0,
  //   trade_profit_usd:0,
  //   };

  // // export const UpgradesData = async (formValues: CreationValues1) => {
  //   const UpgradesData = async ({ formValues }: { formValues: CreationValues1 }) => {
  //     useEffect(() => {
      
  //   // const { getNFTCount} = useNFTMarket();
  //   // newDataToStore.supply = await getNFTCount();
  //   newDataToStore.supply=215;
  //   const { listNFT, cancelListing, buyNFT } = useNFTMarket();

  //   // newDataToStore.total_transactions = await getTransactionCount(); // 从您的函数获取NFT计数值
  //   newDataToStore.total_transactions = 66;
  //   // newDataToStore.unique_buyers = await getBuyerCount(); // 从您的函数获取NFT计数值
  //   newDataToStore.unique_buyers = 7;
  //   // newDataToStore.unique_sellers = await getSellerCount(); // 从您的函数获取NFT计数值
  //   newDataToStore.unique_sellers = 7;
  //   // newDataToStore.total_price_usd = await getTotalAmount(); // 从您的函数获取NFT计数值
  //   newDataToStore.total_price_usd = 9.42397755;
  
  //   // 现在，您可以在函数中使用 formValues，它包含了表单数据
  //   // console.log('Form values from CreationForm1:', formValues);
  //   newDataToStore.wash_sales_usd=parseFloat(formValues.wash_sales_usd);
  //   console.log('Form wash_sales_usd111 from CreationForm1:', newDataToStore.wash_sales_usd);
  //   newDataToStore.wash_transactions=parseFloat(formValues.wash_transactions);
  //   console.log('Form wash_transactions222 from CreationForm1:', newDataToStore.wash_transactions);
  //   newDataToStore.wash_sales_percentage=parseFloat(formValues.wash_sales_percentage);
  //   console.log('Form wash_sales_percentage333 from CreationForm1:', newDataToStore.wash_sales_percentage);
  //   newDataToStore.trade_profit_usd=parseFloat(formValues.trade_profit_usd);
  //   console.log('Form trade_profit_usd444 from CreationForm1:', newDataToStore.trade_profit_usd);


  //   saveData(newDataToStore);
  // }, [formValues]);
  //   // fetchNFTCountPeriodically();
  //   // ... 其余代码 ...
  //   return null;
  // };
  
  // export default UpgradesData;


export const UpgradesData = ({ formValues }: { formValues: CreationValues1 }) => {
  // const { listNFT, cancelListing, buyNFT, getNFTCount, } = useNFTMarket();
  
  useEffect(() => {
    const fetchData = async () => {
      const newDataToStore = {
        supply: 0,
        total_transactions: 0,
        unique_buyers: 0,
        unique_sellers: 0,
        total_price_usd: 0,
        wash_sales_usd: 0,
        wash_transactions: 0,
        wash_sales_percentage: 0,
        trade_profit_usd: 0,
      };

      // newDataToStore.supply = await getNFTCount();
      // newDataToStore.total_transactions = await getTransactionCount();
      // newDataToStore.unique_buyers = await getBuyerCount();
      // newDataToStore.unique_sellers = await getSellerCount();
      // newDataToStore.total_price_usd = await getTotalAmount();

      // 使用 formValues 中的数据
      newDataToStore.wash_sales_usd = parseFloat(formValues.wash_sales_usd);
      newDataToStore.wash_transactions = parseFloat(formValues.wash_transactions);
      newDataToStore.wash_sales_percentage = parseFloat(formValues.wash_sales_percentage);
      newDataToStore.trade_profit_usd = parseFloat(formValues.trade_profit_usd);

      saveData(newDataToStore);
    };

    fetchData(); // 调用异步数据获取函数

    // ... 其余代码 ...

  }, [formValues]);

  return null;
};

export default UpgradesData;

