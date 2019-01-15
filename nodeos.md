# 使用 nodeos 快速做一个 EOS RPC 节点

## 1.下载 nodeos
* EOS 提供 Release 下载,下载地址 [https://github.com/EOSIO/eos/releases](https://github.com/EOSIO/eos/releases);选择适当的版本下载。

* 下载: 

```
wget https://github.com/EOSIO/eos/releases/download/v1.5.3/eosio_1.5.3-1-ubuntu-18.04_amd64.deb
```

* 安装:

```
sudo apt install ./eosio_1.5.3-1-ubuntu-18.04_amd64.deb
```

* 验证

```
nodeos -v
```
查看当前 nodeos 版本

## 2.下载logs文件
* 地址:
日志备份地址:[BLOCKS ARCHIVE](https://eosnode.tools/blocks);
* 下载:

```
wget $(wget --quiet "https://eosnode.tools/api/blocks?limit=1" -O- | jq -r '.data[0].s3') -O blocks_backup.tar.gz
```

* 解压

```
tar xvzf blocks_backup.tar.gz
```

## 3.配置文件
* config.ini

```
agent-name = D3JEOSNODE3

chain-state-db-size-mb = 10240
reversible-blocks-db-size-mb = 340

http-server-address = 0.0.0.0:8870

http-validate-host = false
verbose-http-errors = true
abi-serializer-max-time-ms = 2000

access-control-allow-origin = *
allowed-connection = any

max-clients = 2
connection-cleanup-period = 30
network-version-match = 1
sync-fetch-span = 2000
enable-stale-production = true

max-implicit-request = 1500
pause-on-startup = false
max-transaction-time = 30
max-irreversible-block-age = -1
txn-reference-block-lag = 0

plugin = eosio::chain_api_plugin
plugin = eosio::chain_plugin
```

* p2p 地址

```
p2p-peer-address = 185.253.188.1:19876
p2p-peer-address = bp.cryptolions.io:9876
p2p-peer-address = p2p.mainnet.eospace.io:88
p2p-peer-address = eu-west-nl.eosamsterdam.net:9876
p2p-peer-address = p2p.mainnet.eosgermany.online:9876
p2p-peer-address = 35.197.190.234:19878
p2p-peer-address = mainnet.genereos.io:9876
p2p-peer-address = mainnet.eospay.host:19876
p2p-peer-address = 130.211.59.178:9876
p2p-peer-address = 54.153.59.31:9999
p2p-peer-address = 94.130.250.22:9806
p2p-peer-address = peer.main.alohaeos.com:9876
p2p-peer-address = peer.eosn.io:9876
p2p-peer-address = prod.mainnet.eos.cybex.io:9888
p2p-peer-address = p2p-1.eosnetwork.io:9876
p2p-peer-address = p.jeda.one:3322
p2p-peer-address = eosbattles.com:9877
p2p-peer-address = 34.226.76.22:9876
p2p-peer-address = mainnet.eosoasis.io:9876
p2p-peer-address = node.eosflare.io:1883
p2p-peer-address = mainnet.eoscalgary.io:5222
p2p-peer-address = eos-p2p.worbli.io:33981
p2p-peer-address = 18.188.38.175:9876
p2p-peer-address = 18.221.255.38:9876
p2p-peer-address = eos.staked.us:9870
p2p-peer-address = peering.dutcheos.io:9876
p2p-peer-address = 18.188.4.97:9876
p2p-peer-address = 18.191.125.105:9876
p2p-peer-address = boot.eostitan.com:9876
p2p-peer-address = eosboot.chainrift.com:9876
p2p-peer-address = dc1.eosemerge.io:9876
p2p-peer-address = m.eosvibes.io:9876
p2p-peer-address = node1.eosphere.io:9876
p2p-peer-address = node2.eosphere.io:9876
p2p-peer-address = 45.33.60.65:9820
p2p-peer-address = peering.eosio.cr:1976
p2p-peer-address = peering.eosio.cr:5418
p2p-peer-address = 54.203.121.17:19866
p2p-peer-address = eosnode.fi:9888
p2p-peer-address = api.eosuk.io:12000
p2p-peer-address = fullnode.eoslaomao.com:443
p2p-peer-address = new.eoshenzhen.io:10034
p2p-peer-address = peer.eosio.sg:9876
p2p-peer-address = eos.nodepacific.com:9876
p2p-peer-address = 18.234.6.119:80
p2p-peer-address = eu1.eosdac.io:49876
p2p-peer-address = br.eosrio.io:9876
p2p-peer-address = p2p-public.hkeos.com:19875
p2p-peer-address = node.eosmeso.io:9876
p2p-peer-address = pub1.eostheworld.io:9876
p2p-peer-address = 807534da.eosnodeone.io:19872
p2p-peer-address = mainnet.eoseco.com:10010
```

## 4.启动
执行以下命令,进行 EOS 同步:

```
nodeos --data-dir /blockData/blocks --config-dir /blockData --hard-replay --wasm-runtime wabt
```

执行完命令后,数据将进行replay。replay 结束后,节点将正常进行同步。

后期启动节点时,只需要执行:

```
nodeos --data-dir /blockData/blocks --config-dir /blockData 
```