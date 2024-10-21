const http = require('http');
const fs = require('fs');
const url = require('url')
const express = require('express')
const app = express()
const port = 8000

// using express 
app.get('/', (req, res) => {
    const log = `${Date.now()}: ${req.url} sent a ${req.method} request`
    fs.appendFile('log.txt', log, () => {
        if (req.query.name) {
            return res.send(`Welcome ${req.query.name}`)
        } else {
            return res.send('Welcome')
        }
    })
})
app.listen(port, () => {
    console.log('server is running')
})
// //creating a server
// const myServer = http.createServer((req, res) => {
//     if (req.url == '/favicon.ico') return res.end();
//     //log date and url that's requested
//     const log = `${Date.now()}: ${req.method} ${req.url} sent a request\n`;
//     fs.appendFile('log.txt', log, () => {
//         const myUrl = url.parse(req.url, true);
//         console.log(myUrl);
//         switch (myUrl.pathname) {
//             case '/':
//                 if (myUrl.query.name) {
//                     res.end(`welcome ${myUrl.query.name}`);
//                 }
//                 else {
//                     res.end(`welcome`);
//                 }
//                 break;
//             case '/about':
//                 res.end('I am Matthew and I am a developer');
//                 break;
//             case '/contact':
//                 res.end('phone: 08188567280');
//                 break;
//             case '/signup':
//                 if (req.method === 'POST') {
//                     res.end('signup successful')
//                 } else {
//                     res.end('invalid method')
//                 }
//                 break;
//             default:
//                 res.end('404, page not found');
//         }
//     })
//     // res.end('message from server');
// })

// //start server
// myServer.listen(8000, () => {
//     console.log(`server is running`)
// })