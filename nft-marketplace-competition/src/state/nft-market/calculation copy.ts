import useNFTMarket from "state/nft-market";
const { getNFTCount} = useNFTMarket();

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
    const nftCountDb = await fetchColumnData('nftCount_db');
    const nftCountDif = await fetchColumnData('nftCount_dif');
    console.log(nftCountDif);
    const transactionCountDb = await fetchColumnData('transactionCount_db');
    console.log(transactionCountDb);
    const transactionCountDif = await fetchColumnData('transactionCount_dif');
    console.log(transactionCountDif);
    const buyerCountDb = await fetchColumnData('buyerCount_db');
    console.log(buyerCountDb);
    const buyerCountDif = await fetchColumnData('buyerCount_dif');
    console.log(buyerCountDif);
    const SellerCountDb = await fetchColumnData('SellerCount_db');
    console.log(SellerCountDb);
    const SellerCountDif = await fetchColumnData('SellerCount_dif');
    console.log(SellerCountDif);
    
    return { nftCountDif, nftCountDb, transactionCountDif,transactionCountDb,buyerCountDb,buyerCountDif,SellerCountDb,SellerCountDif };

} catch (error) {
    console.error(error);
    return {};
}
}

// const newDataToStore = {
//     nftCount_db: 0,
//     nftCount_dif: 0,
//     transactionCount_db: 0,
//     transactionCount_dif: 0,
//     buyerCount_db: 0,
//     buyerCount_dif: 0,
//     SellerCount_db: 0,
//     SellerCount_dif: 0,
// };


const newDataToStore = {
  supply:0,
  total_transactions:0,
  unique_buyers:0,
  unique_sellers:0,
  total_price_usd:0,
  wash_sales_usd:0,
  wash_transactions:0,
  wash_sales_percentage:0,
  trade_profit_usd:0,
  };

  export const UpgradesData = async (formValues: CreationValues1) => {

    // newDataToStore.supply = await getNFTCount(); // 从您的函数获取NFT计数值
    newDataToStore.supply = 25;
    // newDataToStore.total_transactions = await getTransactionCount(); // 从您的函数获取NFT计数值
    newDataToStore.total_transactions = 234;
    // newDataToStore.unique_buyers = await getBuyerCount(); // 从您的函数获取NFT计数值
    newDataToStore.unique_buyers = 6;
    // newDataToStore.unique_sellers = await getSellerCount(); // 从您的函数获取NFT计数值
    newDataToStore.unique_sellers = 5;
    // newDataToStore.total_price_usd = await getTotalAmount(); // 从您的函数获取NFT计数值
    newDataToStore.total_price_usd = 9;
  
    // 现在，您可以在函数中使用 formValues，它包含了表单数据
    // console.log('Form values from CreationForm1:', formValues);
    newDataToStore.wash_sales_usd=parseFloat(formValues.wash_sales_usd);
    console.log('Form wash_sales_usd111 from CreationForm1:', newDataToStore.wash_sales_usd);
    newDataToStore.wash_transactions=parseFloat(formValues.wash_transactions);
    console.log('Form wash_transactions222 from CreationForm1:', newDataToStore.wash_transactions);
    newDataToStore.wash_sales_percentage=parseFloat(formValues.wash_sales_percentage);
    console.log('Form wash_sales_percentage333 from CreationForm1:', newDataToStore.wash_sales_percentage);
    newDataToStore.trade_profit_usd=parseFloat(formValues.trade_profit_usd);
    console.log('Form trade_profit_usd444 from CreationForm1:', newDataToStore.trade_profit_usd);


    saveData(newDataToStore);
    // ... 其余代码 ...
  };

  
  
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





  






  // export const fetchNFTCountPeriodically = async () => {
  //   // const intervalInMilliseconds = 24 * 60 * 60 * 1000; // 24小时

  //     getData();
  //     const data = await getData();
  //     // const nftCount = await getNFTCount(); // 从您的函数获取NFT计数值
  //     const nftCount = 215;
  //     const nftCountDb =data.nftCountDb.nftCount_db;
  //     const nftCountDif = parseFloat(data.nftCountDif.nftCount_dif);

  //     if(nftCountDif!==0){
  //     const nftCount_rate = ((nftCount - nftCountDb) - nftCountDif) / (nftCountDif);
      
  //     console.log('NFT今日交易量增长率：', nftCount_rate);
  //     if (nftCount !== null) {
  //       newDataToStore.nftCount_dif = nftCount - nftCountDb;
  //       newDataToStore.nftCount_db = nftCount;
  //       console.log('NFT今日总量已记录：', newDataToStore.nftCount_db);
  //       console.log('NFT今日单日交易量已记录：', newDataToStore.nftCount_dif );
  //     }
  //     saveData(newDataToStore);
  //     return nftCount_rate;
  //     }
  //       else{
  //         console.log('NFT今日交易量增长率不变');
  //         // const values1 = {}; // 这里传入代码1中的values1对象
  //         ///
          

          
          
  //         ///
  //         const nftCount_rate=777;
  //         //const nftCount_rate=data.nftCountRate.nftCount_dif
  //       return nftCount_rate;
  //     }
  
      
  
  //     // return nftCount_rate; // 返回 nftCount_rate

  // };
  

  // // 启动定期更新
  // const intervalInMilliseconds = 5000; // 5秒
  // setInterval(fetchNFTCountPeriodically, intervalInMilliseconds);