# 使用 FIBOS 客户端快速做一个 EOS RPC 节点

## 使用镜像快速下载区块数据

[EOS全节点区块数据快速同步服务](https://eoscleaner.com/Project%20Detail.html)

注： 节点部署在 AWS EC2 上使用下载体验更佳!

## 快速安装 FIBOS

```
curl -s https://fibos.io/download/installer.sh | sh
```

## 更新 P2P 节点信息

```
fibos p2p.js
```

EOS 的 p2p-peer-address 可以从这里获取: http://eosnetworkmonitor.io/#

## 同步节点代码

```
const fibos = require("fibos");
const p2p = require("./p2p.json");

if (!p2p.length) {
	console.warn("p2p-peer-address is empty!\nPlease Run: fibos p2p.js");
	process.exit();
}

fibos.pubkey_prefix = "EOS";
fibos.core_symbol = "EOS";
fibos.enableJSContract = false;
fibos.config_dir = "./data";
fibos.data_dir = "./data";
fibos.load("http", {
	"http-server-address": "0.0.0.0:8870",
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true
});

fibos.load("net", {
	"p2p-peer-address": p2p
});

fibos.load("producer");
fibos.load("chain");

fibos.load("chain_api");

fibos.start();
```
## 开始同步

```
fibos index.js
```