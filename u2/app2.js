const http = require("http");
const fs = require("fs");

http.createServer(function (req, res) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        console.log(body);
        res.write('OK');
        res.end();
    });
})