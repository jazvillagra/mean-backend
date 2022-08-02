const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Response 1');
});

server.listen(process.env.PORT || 3000);