let liveServer = require('live-server');
let middleware = function(req, res, next) {
    // console.log('current:',req.url);
    next();
}
let config = {
    port: 8080,
    host: "0.0.0.0",
    root: "./public/",
    file: "index.html",
    mount: ['/components'],
    wait: 1000,
    logLevel:2,
    middleware: [middleware]
}
liveServer.start(config);