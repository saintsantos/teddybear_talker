import db from '../config/db';
function update(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send('Update an event');
    });
}

function getEvent(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send('Grab a single event');
    });
}

function getDay(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send('Grab an entire day');
    });
}

function getWeek(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send('Grab an entire week');
    });
}

export default {update, getEvent, getDay, getWeek};
