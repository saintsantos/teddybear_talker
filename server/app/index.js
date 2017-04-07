//This will be the central point of the server
var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    app = express(),
    formidable = require('express-formidable');

var morgan = require('morgan');
app.use(morgan('combined'));

var config = require('app/util/config');

var db = require('app/util/db');

app.use(formidable({
    encoding: 'utf-8',
    keepExtensions: true,
    uploadDir: '/home/edwin/',
    multiples: true,
}));

//API endpoints
app.use('/api/voice', require('app/audio/router'));
app.use('/api/calendar', require('app/calendar/router'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.statur = 404;
    next(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errorState: 'error',
        message: err.message,
        error: err
    });
});

//https.createServer(options, app).listen(3000);
console.log("Ready on localhost: 3000");
http.createServer(app).listen(config.express.port);
