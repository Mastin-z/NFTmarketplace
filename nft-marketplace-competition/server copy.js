const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const cors = require('cors');
const port = 3000; // 设置服务器端口

const dataFilePath = 'database.csv';

// 添加 CORS 中间件
app.use(cors({
  origin: 'http://localhost:3003', // 允许的源
  methods: ['GET', 'POST'], // 允许的HTTP方法
  allowedHeaders: ['Content-Type'], // 允许的请求头
//   credentials: true, // 允许携带凭据（credentials）
}));

// 读取数据
app.get('/readData/:specificColumn', (req, res) => {
  const specificColumn = req.params.specificColumn;
  const data = fs.readFileSync(dataFilePath, 'utf8');
  const rows = data.split('\n');
  
  if (rows.length >= 2) {
    const header = rows[0].split(',');
    const columnIndex = header.indexOf(specificColumn);

    if (columnIndex !== -1) {
      const specificValue = rows[1].split(',')[columnIndex];
      console.log(`从CSV文件读取的${specificColumn}：`, specificValue);
      res.json({ [specificColumn]: specificValue });
      return;
    }
  }

  console.log('CSV文件不存在或未找到特定列。');
  res.status(404).json({ error: 'CSV文件不存在或未找到特定列。' });
});

// 保存数据
app.use(express.json()); // 添加JSON中间件以解析JSON请求主体

app.post('/saveData', (req, res) => {
  const newDataToStore = req.body; // 获取从前端发送的JSON数据

//   const data = [{ nftCount_db: newDataToStore.nftCount_db, nftCount_dif: newDataToStore.nftCount_dif }];
  const data = [{
    supply: newDataToStore.supply,
    total_transactions: newDataToStore.total_transactions,
    unique_buyers: newDataToStore.unique_buyers,
    unique_sellers: newDataToStore.unique_sellers,
    total_price_usd: newDataToStore.total_price_usd,
    wash_sales_usd: newDataToStore.wash_sales_usd,
    wash_transactions: newDataToStore.wash_transactions,
    wash_sales_percentage: newDataToStore.wash_sales_percentage,
    trade_profit_usd: newDataToStore.trade_profit_usd,
  }];
//   fs.writeFileSync(dataFilePath, 'nftCount_db,nftCount_dif\n');
  fs.writeFileSync(dataFilePath, 'supply,total_transactions,unique_buyers,unique_sellers,total_price_usd,wash_sales_usd,wash_transactions,wash_sales_percentage,trade_profit_usd\n');

  data.forEach((row) => {
    // fs.appendFileSync(dataFilePath, `${row.nftCount_db},${row.nftCount_dif}\n`);
    fs.appendFileSync(dataFilePath, `${row.supply},${row.total_transactions},${row.unique_buyers},${row.unique_sellers},${row.total_price_usd},${row.wash_sales_usd},${row.wash_transactions},${row.wash_sales_percentage},${row.trade_profit_usd}\n`);
  });

  console.log('数据已保存到CSV文件。');
  res.json({ message: '数据已保存到CSV文件。' });
});

app.listen(port, () => {
  console.log(`服务器正在监听端口 ${port}`);
});
