// in case of module not found error
// make sure modules are installed into
// project directory
var transform = require("node-json-transform").transform;
var fs = require("fs");
const { http } = require("http");


let rawdata = fs.readFileSync("/root/first-subnet-dhcpapi.json");
//let rawdata = fs.readFileSync("/root/dhcpapi.json");
let alisson = JSON.parse(rawdata);


var Subnet4Map = {
    item: {
    subnet4: "results",
    },
    defaults: {
        loggers: "/root/logs.log"
    },
    operate: [
        {
         run: function(val) { return  transform(val, SubnetsMap)}, on: "subnet4" 
        },
     ],
    each: function(item){
        return item; 
    } 
}

var SubnetsMap = {
    item: {
        subnet: "id",

        options: "options",
        domain: "domain",
        netmask: "netmask",
        pools: "ip-range",
        reservations: "reserved-address"
    },
    remove: ["domain"],
    operate: [
       {
        run: function(val) { return  transform(val, ReservationsMap)}, on: "reservations" 
       },
       {
        run: function(val) { return  transform(val, OptionsMap)}, on: "options" 
       },
       {
        run: function(val) { return  transform(val, PoolsMap)}, on: "pools" 
       }       

    ],
    each: function(item){
        return item; 
    }
}

var ReservationsMap = {
    item: {
        description: "description",
        "hw-address": "mac",
        "ip-address": "ip"
    },
    each: function(item){
        return item; 
    }
}

var OptionsMap = {
    item: {
        option: "id",
        value: "ip"
    }
}

var PoolsMap = {
    item: {
        pool: {
            startip: "start-ip",
            endip: "end-ip",
        }
    },
    operate: [
        {
            run: function(val) { return val.startip + '-' + val.endip}, on: "pool" 
        }
    ]
}


var result = transform(alisson, Subnet4Map);

//console.log(JSON.stringify(result, null, 2))
console.log(JSON.stringify(result))