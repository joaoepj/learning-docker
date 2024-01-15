var httpProxy = require('http-proxy');

//
// Create a proxy server
//


var proxy = httpProxy.createProxyServer(
        {
            target: 'http://200.19.145.141:8000'
        }
    ).listen(7000);

    
proxy.on('proxyRes', function (req, res, proxyRes) {
    console.log('Setting Outgoing Response ...')
    proxyRes.setHeader('Access-Control-Allow-Origin', '*');
    //proxyRes.setHeader('Access-Control-Allow-Origin', '*');
    console.log(JSON.stringify(res.headers, true, 2))
});

proxy.on('proxyReq', function (req, res, proxyReq) {
    console.log('Setting Incoming Request ...')
    proxyReq.setHeader('X-Special-Test-Header', '1234');
    console.log(req.headers)
    console.log(JSON.stringify(req.rawBody, true, 2))
});