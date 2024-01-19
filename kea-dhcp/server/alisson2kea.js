// in case of module not found error run the command below
// npm install node-json-transform --save
var transform = require("node-json-transform").transform;
var fs = require("fs");


let rawdata = fs.readFileSync("/root/dhcpapi.json");
let alisson = JSON.parse(rawdata);

var map = {
    item: {
        subnet: "id",
        iprange: {
        startip: "ip-range.0.start-ip",
        endip: "ip-range.0.end-ip",
        },
        domain: "domain",
        netmask: "netmask",
        pool: "pool"
        
    },
    remove: ["domain"],
    operate: [
 //       {
 //          run: function() { return startip + '-' + endip}, on: pool 
 //       },
    ],
    each: function(item){
        return item; 
    }
}

//var result = transform({"id": "10.0.0.0", "domain": "ufu.br"}, map);
var result = transform(alisson.results, map);

console.log(result)