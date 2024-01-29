// in case of module not found error
// make sure modules are installed into
// project directory
var transform = require("node-json-transform").transform;
var fs = require("fs");
var Netmask = require("netmask").Netmask;
var netid = 1;

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
        subnet: {
            net: "id",
            mask: "netmask"
        },
        "client-class": {
            code: "options.0.id",
            data: "options.0.ip",
        },
        domain: "domain",
        pools: "ip-range",
        reservations: "reserved-address"
    },
    remove: ["domain"],
    operate: [
       {
        run: function(val) { return  transform(val, ReservationsMap)}, on: "reservations" 
       },
       {
        run: function(val) { return  transform(val, PoolsMap)}, on: "pools" 
       },
       {
        run: function(val) {
             let block = new Netmask(val.net + '/' + val.mask);
             return block.base + '/' + block.bitmask}, on: "subnet" 
       },
       {
        run: function(val) {
            switch (val.data) {
                case "200.131.199.134":
                    return "sm-aruba-ap";
                case "200.131.199.130":
                    return "um-aruba-ap";
                default:
                    return "";
            }
        }, on: "client-class"
    }

    ],
    each: function(item){
        item.id = netid;
        netid++;
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