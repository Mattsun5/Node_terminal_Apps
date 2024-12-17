const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const connection = require('./connection');
const { logReqRes } = require('./middlewares')
const userRouter = require('./routes/user');

const app = express();
const port = 8000;

// 


// DB connection 
connection("************")
    .then(() => {console.log('database connected!')})
    .catch((err) => {
        console.log(`unable to connect to db: ${err}`)
    });

// mock json file
// const users = require('./MOCK_DATA.json');
// const { stringify } = require('querystring');

// json form format
// app.use(bodyParser.json());

// x-www-form-urlencoded format -> encoded body
app.use(express.urlencoded({ extended: true}))

// logging request 
// app.use(logReqRes('log.txt'));

// user router
app.use('/api/users', userRouter);


// To do 
/**
 * Get all users in html and json *
 * Get a user's record *
 * post new user
 * update user data
 * delete user data
 * put data using multer
 */

// rewrite user
// const rewriteUser = () => {
//     fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err) => {
//         if (err) return err;
//     })
// }




app.listen(port, () => {
    console.log(`server is running at PORT: ${port}`)
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