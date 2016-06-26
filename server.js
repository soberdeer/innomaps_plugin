var path = require('path');
var express = require('express');
var app = express();


app.use('/static', express.static(path.join(__dirname, 'build/')));

app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/html/buildings.html'));
});

app.listen(8090, function() {
    console.log('app listening on port ' + 8090);
});
