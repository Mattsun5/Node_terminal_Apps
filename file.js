const fs = require('fs');

let createFile = (name) => {
    fs.writeFileSync('./name.txt', name, (err) =>err ? console.log(err) : console.log('file created.'))
}

module.exports = { createFile }