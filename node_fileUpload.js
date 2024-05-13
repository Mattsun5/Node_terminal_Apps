// create a form that accepts a file and save on the server
const http = require('node:http');
const fs = require('node:fs');
const formidable = require('formidable');

http.createServer((req, res) => {
    if (req.url == '/receiveForm') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) throw err;

            let oldpath = `${files.fileupload[0].filepath}`;
            let newpath = 'C:/Users/DELL/Downloads/' + files.fileupload[0].originalFilename;
            
            fs.rename(oldpath, newpath, (err) => {
                if (err) throw err;
                res.write('file has been uploaded and saved.');
                res.end();
            })
        });
    } else {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write("<form action = '/receiveForm' method = 'POST' enctype = 'multipart/form-data'>");
        res.write("<input type = 'file' name = 'fileupload'><br />");
        res.write("<input type = 'submit'>");
        res.write("</form >");
        res.end();
    }
}).listen(8000);