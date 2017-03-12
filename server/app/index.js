//This will be the central point of the server
var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    app = express();

var morgan = require('morgan');
app.use(morgan('combined'));

var config = require('app/util/config');

var db = require('app/util/db');

app.set('superSecret', config.sercret);

//API endpoints
app.use('/api/test', require('./test/router'));
app.use('/api/voice', require('./voice/router'));

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
