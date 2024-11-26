const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

// 
mongoose
    .connect("")
    .then(() => {console.log('database connected!')})
    .catch((err) => {
        console.log(`unable to connect to db: ${err}`)
    })
const userSchema = mongoose.Schema({
        "first_name": {
            type: String, 
            required: true
        },
        "last_name": {
            type: String, 
            required: true
        },
        "email": {
            type: String, 
            required: true,
            unique: true
        },
        "gender": {
            type: String, 
            required: true
        },
        "occupation": String
    },
    {timestamps: true}
);
const User = mongoose.model('user', userSchema);

const users = require('./MOCK_DATA.json');
const { stringify } = require('querystring');

// json form format
// app.use(bodyParser.json());

// x-www-form-urlencoded format -> encoded body
app.use(express.urlencoded({ extended: true}))
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
const rewriteUser = () => {
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) return err;
    })
}

// all users json
app.get('/api/users', (req, res) => {
    return res.json(users);
})

// all users using SSR(server side rendering) for HTML
app.get('/users', (req, res) => {
    let html = '<ul>';
    users.map((user) => {
        html += `<li>${user.first_name}</li>`;
    })
    html += '</ul>';
    return res.send(html);
})

// single user json
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user){
        return res.status(400).json({msg: 'user not found'});
    }
    return res.json(user);
})

//single user SSR for html
app.route('/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        let html = '';
        if (user){
            html += `<p>My name is ${user.first_name}, I am a ${user.occupation}.</P>`;
        } else {
            res.status(400);
            html += 'User does not exist';
        }
        res.setHeader("x-name", "Matthew"); //custom header
        return res.send(html);
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        let html = '';
        if (user) {
            const userIndex = users.indexOf(user);
            users.splice(userIndex, 1);
            rewriteUser();
            html += `${userIndex + 1}, ${user.first_name} deleted successfully`;
        } else {
            res.status(400);
            html += `user not found`;
        }
        return res.send(html);
    })

app.post('/register', async (req, res) => {

    // const newUser = {
    //     "id": users.length + 1,
    //     "first_name": req.body.first_name,
    //     "last_name": req.body.last_name,
    //     "email": req.body.email,
    //     "gender": req.body.gender,
    //     "occupation": req.body.occupation
    // }
    const newDoc = new User({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "gender": req.body.gender,
        "occupation": req.body.occupation
    });
    await newDoc.save()
        .then((result) => {
            console.log(result);
            return res.status(201).send(`successful`);
        })
        .catch((err) => {
            return res.status(400).send(err);
        });

    // SINCE FIELD NAMES TALLY, WE CAN ALSO USE
    // get last user ID

    // const lastUser = users.length - 1;
    // new user ID
    // const newUserId = users[lastUser].id + 1;
    // const newUser = { "id": newUserId, ...req.body}
    

    // users.push(newUser);
    // rewriteUser();
    
})
    

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