const fs = require('fs');
const csv = require('csv-parser');

const dataFilePath = 'database.csv';
const readDataFromCSV = (specificColumn) => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const rows = data.split('\n');
    if (rows.length >= 2) {
      const header = rows[0].split(',');
      const columnIndex = header.indexOf(specificColumn);
      if (columnIndex !== -1) {
        const specificValue = rows[1].split(',')[columnIndex];
        console.log(`从CSV文件读取的${specificColumn}：`, specificValue);
        return specificValue;
      }
    }
    console.log('CSV文件不存在或未找到特定列。');
    return null;
  };

// 保存数据到CSV文件
const saveDataToCSV = (dataToStore) => {
  const data = [{ nftCount_db: dataToStore.nftCount_db, nftCount_dif: dataToStore.nftCount_dif }];
  fs.writeFileSync(dataFilePath, 'nftCount_db,nftCount_dif\n');
  data.forEach((row) => {
    fs.appendFileSync(dataFilePath, `${row.nftCount_db},${row.nftCount_dif}\n`);
  });
  console.log('数据已保存到CSV文件。');
};

// 例子：更新数据并保存到CSV文件
const newDataToStore = {
    nftCount_db: 65,
    nftCount_dif: 85,
  };
