const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'html');
    res.end('<h1>The server responded</h1><p>Yes it did</p>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}`);
});