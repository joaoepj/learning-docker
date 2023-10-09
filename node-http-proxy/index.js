var httpProxy = require('http-proxy');

//
// Create a proxy server with latency
//
var proxy = httpProxy.createProxyServer(
        {
            target: 'http://200.19.145.141:8000'
        }
    ).listen(7000);

proxy.on('proxyRes', function (req, res, proxyRes) {
    console.log('Setting Outgoing Respose Access-Control-Allow-Origin Header...')
    proxyRes.setHeader('Access-Control-Allow-Origin', '*');
    console.log(JSON.stringify(res.headers, true, 2))
});

proxy.on('proxyReq', function (req, res, proxyReq) {
    console.log('Setting Incoming Request Content-Type Header...')
    proxyReq.setHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(req.headers, null, 2))
    console.log(JSON.stringify(req.rawBody, null, 2))
});