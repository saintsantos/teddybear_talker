import db from '../config/db';
function update(req, res, next) {
    db(req.params.day).where({'hour': req.params.hour, 'minutes': req.params.minutes}).update({'file_id': req.query.file_id});

}

function addEvent(req, res, next) {
    db(req.params.day).insert({hour: req.params.hour, minutes: req.params.minutes, file_id: req.query.file_id}).then(function() {
        res.status(200).send();
    });
}

function getEvent(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send('Grab a single event');
    });
}

function getDay(req, res, next) {
    db(req.params.day).select().table('test').then(function(result) {
        res.send('Grab an entire day');
    });
}

function getWeek(req, res, next) {
    db
    .select()
    .from('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
    .then(function(monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
        let obj = {};
        obj.monday = monday;
        obj.tuesday = tuesday;
        obj.wednesday = wednesday;
        obj.thursday = thursday;
        obj.friday = friday;
        obj.saturday = saturday;
        obj.sunday = sunday;
        res.send(obj);
        console.log(obj);
    });
}

export default {update, getEvent, getDay, getWeek, addEvent};
