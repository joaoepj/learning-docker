// in case of module not found error
// make sure modules are installed into
// project directory
var transform = require("node-json-transform").transform;
var fs = require("fs");
const { http } = require("http");

if (process.argv.length < 3) {
    console.error('Expected at least one argument!');
    process.exit(1);
  }
  

if (fs.existsSync(process.argv[2])) {
    var rawdata = fs.readFileSync(process.argv[2]);
} else {
    console.error(process.argv[2] + '. File not found!');
    process.exit(1);
}

let alisson = JSON.parse(rawdata);


var Subnet4Map = {
    item: {
    subnet4: "results",
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

        "option-data": "options",
        domain: "domain",
        netmask: "netmask",
        pools: "ip-range",
        reservations: "reserved-address"
    },
    remove: ["domain", "netmask"],
    operate: [
       {
        run: function(val) { return  transform(val, ReservationsMap)}, on: "reservations" 
       },
       {
        run: function(val) { return  transform(val, OptionsMap)}, on: "option-data" 
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
        "user-context": {
            description: "description",
        },
        "hw-address": "mac",
        "ip-address": "ip"
    },
    each: function(item){
        return item; 
    }
}

var OptionsMap = {
    item: {
        code: "id",
        data: "ip",
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