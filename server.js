var config = require('./config.js');
var path = require('path');
var express = require('express');
var app = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({maxFilesSize: config.maxFilesSize});
var fs = require('fs');
var uuid = require('node-uuid');


app.use('/static', express.static(path.join(__dirname, 'build/')));

app.use('/upload', multipartMiddleware, function (req, res) {
    var oldName = req.files.file.name;
    var fileName = uuid.v1();
    if (oldName.lastIndexOf('.') >= 0) {
        fileName += oldName.slice(oldName.lastIndexOf('.'), oldName.length);
    }
    fs.readFile(req.files.file.path, function (err, data) {
        var newPath = path.join(__dirname, '/uploads/', fileName);
        fs.writeFile(newPath, data, function (err) {
            res.json({
                url: path.join(config.serverUrl, '/image', fileName)
            });
        });
    });
});

app.use('/image/:img', function (req, res) {
    res.sendFile(path.join(__dirname, '/uploads', req.params.img));
});

app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/html/buildings.html'));
});

app.listen(8090, function () {
    console.log('app listening on port ' + 8090);
});
