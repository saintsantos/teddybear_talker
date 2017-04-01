import db from '../config/db';
function update(req, res, next) {
    //db(req.params.day).where({'hour': req.params.hour, 'minutes': req.params.minutes}).update({'file_id': req.query.file_id});
    let obj = {};
    obj.day = req.params.day;
    obj.hour = req.params.hour;
    obj.minutes = req.params.minutes;
    obj.file = req.query.file_id;

    res.send(obj);
}

function addEvent(req, res, next) {
    db('monday').insert({hour: req.params.hour, minutes: req.params.minutes, file_id: req.query.file_id}).then(function() {
        res.status(200).send();
    });
    /*let obj = {};
    obj.day = req.params.day;
    obj.hour = req.params.hour;
    obj.minutes = req.params.minutes;
    obj.file = req.query.file_id;

    res.send(obj);*/
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

export default {update, getEvent, getDay, getWeek, addEvent};
