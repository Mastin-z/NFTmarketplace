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
    nftCount_db: newDataToStore.nftCount_db,
    nftCount_dif: newDataToStore.nftCount_dif,
    transactionCount_db: newDataToStore.transactionCount_db,
    transactionCount_dif: newDataToStore.transactionCount_dif,
    buyerCount_db: newDataToStore.buyerCount_db,
    buyerCount_dif: newDataToStore.buyerCount_dif,
    SellerCount_db: newDataToStore.SellerCount_db,
    SellerCount_dif: newDataToStore.SellerCount_dif,
  }];
//   fs.writeFileSync(dataFilePath, 'nftCount_db,nftCount_dif\n');
  fs.writeFileSync(dataFilePath, 'nftCount_db,nftCount_dif,transactionCount_db,transactionCount_dif,buyerCount_db,buyerCount_dif,SellerCount_db,SellerCount_dif\n');

  data.forEach((row) => {
    // fs.appendFileSync(dataFilePath, `${row.nftCount_db},${row.nftCount_dif}\n`);
    fs.appendFileSync(dataFilePath, `${row.nftCount_db},${row.nftCount_dif},${row.transactionCount_db},${row.transactionCount_dif},${row.buyerCount_db},${row.buyerCount_dif},${row.SellerCount_db},${row.SellerCount_dif}\n`);
  });

  console.log('数据已保存到CSV文件。');
  res.json({ message: '数据已保存到CSV文件。' });
});

app.listen(port, () => {
  console.log(`服务器正在监听端口 ${port}`);
});
