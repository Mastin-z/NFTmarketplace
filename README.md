# NFTMarket-Competition
NFTMarket-Competition Code File<br>
1.用VS Code打开文件夹并输入一下命令配置环境:<br>
```npm install```<br>
2.打开终端输入以下命令运行后端:<br>
```node server.js```<br>
3.在终端内依次输入以下命令构建并运行程序:<br>
```npm run build```<br>
```npm start ```<br>
4.在包含MetaMask插件的浏览器内输入如下地址打开程序:<br>
```http://localhost:3005```<br>
5.如图1.点击```Create```进入市场因子更新页面:<br>
<img src="./image1.png" alt="CreatePage" style="width: 30%; height: auto;"><br>
6.如图2,点击```Get Marketfactor```获取此NFT市场内的5个市场因子:<br>
```supply,total_transactions,unique_buyers,unique_sellers,total_price_usd```<br>
<img src="./image2.png" alt="Get_Marketfactor" style="width: 30%; height: auto;"><br>
7.如图3,输入4个模拟的剩余市场因子:<br>
```wash_sales_usd,wash_transactions,wash_sales_percentage,trade_profit_usd```<br>
<img src="./image3.png" alt="Get_Marketfactor" style="width: 30%; height: auto;"><br>
再点击```Upgrades```更新所有的市场因子到数据库<br>

# 测试钱包在文件Wallet内:<br>
钱包内已内置1.8个Sepolia测试币,因资源有限,测试中所有的价格均为模型自动定价的0.01倍.<br>
以下水龙头可以免费领取Sepolia测试币:<br>
```https://www.infura.io/faucet/sepolia```<br>
```https://sepoliafaucet.com/```<br>
