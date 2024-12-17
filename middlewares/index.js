const fs = require('fs');

async function logReqRes(filename) {
    return (req, res, next) => {
        const log = `${Date.now()}: ${req.url} sent a ${req.method} request`
        fs.appendFile(filename, log, (err, data) => {
            next();
            // if (req.query.name) {
            //     return res.send(`Welcome ${req.query.name}`)
            // } else {
            //     return res.send('Welcome')
            // }
        })
    }
}

module.exports = { logReqRes };