const math = require('./math.js');
const saveName = require('./file.js');
const fs = require('fs');
const os = require('os');
const http = require('http');

const myServer = http.createServer((req, res) => {
    console.log('see this');
    res.end('Message from server.');
})
myServer.listen(8000, () => console.log('server is running'))
// console.log(math.add(2, 4));
// console.log(math.subtract(2, 4));
// console.log(math.name);

// saveName.createFile('Matthew');
// let name = fs.readFileSync('./name.txt')
// let welcome = `welcome! ${name}`;
// console.log(welcome);

console.log(os.cpus().length)

