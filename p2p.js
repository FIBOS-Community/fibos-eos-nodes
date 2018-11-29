const http = require("http");
const fs = require("fs");
const ssl = require("ssl");
ssl.ca.loadRootCerts();

let r = http.get("https://api.eosnetworkmonitor.io/api/v1/p2p/addresses").json();

let p2ps = [];

r = r.map((d) => {
	p2ps = p2ps.concat(d.p2p);
});

console.notice("p2ps length:", p2ps.length);

fs.writeFile("./p2p.json", JSON.stringify(p2ps));