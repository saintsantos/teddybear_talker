//express stuff
var express = require('express'),
    router = express.Router(),
    app = express(),
    formidable = require('formidable');

function sayHi(req, res, next) {
    res.send({
        hi: 'hi!'
    });
}
//Testing that the server endpoint is running
router.get('/check/hi', sayHi);

module.exports = router;
