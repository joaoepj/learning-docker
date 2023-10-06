var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with latency
//
var proxy = httpProxy.createProxyServer();

//
// Create your server that makes an operation that waits a while
// and then proxies the request
//
http.createServer(function (req, res) {
        proxy.web(req, res, {
            target: 'http://200.19.145.141:8000'
        });
        
        
}).listen(7000);

proxy.on('proxyRes', function (req, res, proxyRes) {
    proxyRes.setHeader('Access-Control-Allow-Origin', '*');
});

proxy.on('proxyReq', function (req, res, proxyReq) {
    proxyReq.setHeader('User-Agent', '');
});