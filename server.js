var path = require('path');
var express = require('express');
var app = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');


app.use('/static', express.static(path.join(__dirname, 'build/')));

app.use('/upload', multipartMiddleware, function (req, res) {
    console.log(req.files);
    fs.readFile(req.files.file.path, function (err, data) {
        var newPath = __dirname + '/uploads/' + req.files.file.originalFilename;
        fs.writeFile(newPath, data, function (err) {
            res.json({
                success: 1
            });
        });
    });
});

app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/html/buildings.html'));
});

app.listen(8090, function () {
    console.log('app listening on port ' + 8090);
});
