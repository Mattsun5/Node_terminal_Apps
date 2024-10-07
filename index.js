const http = require('http');
const fs = require('fs');

//creating a server
const myServer = http.createServer((req, res) => {
    //log date and url that's requested
    const log = `${Date.now()}: ${req.url} sent a request\n`;
    fs.appendFile('log.txt', log, () => {
        switch (req.url) {
            case '/':
                res.end('welcome Home');
                break;
            case '/about':
                res.end('I am Matthew and I am a developer');
                break;
            case '/contact':
                res.end('phone: 08188567280');
                break;
            default:
                res.end('404, page not found');
        }
    })
    // res.end('message from server');
})

//start server
myServer.listen(8000, () => {
    console.log(`server is running`)
})