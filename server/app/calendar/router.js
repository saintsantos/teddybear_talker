var express = require('express'),
    router = express.Router(),
    app = express(),
    fs = require('fs'),
    config = require('app/util/config'),
    db = require('app/util/db');

function update(req, res, next) {
    db('events').where({hour: req.params.hour, min: req.params.minutes})
    .update({file_id: req.query.file_id}).then(function() {
        res.status(200).send();
    });

}

function addEvent(req, res, next) {
    db.select()
    .where({hour: req.params.hour, min: req.params.minutes, day: req.params.day})
    .from('events')
    .then(function(result) {
        if(result.length == 0) {
           db.insert({hour: req.params.hour, min: req.params.minutes, file_id: req.query.file_id, day: req.params.day, status: 'active'})
            .from('events')
            .then(function(result) {
                res.status(200).send();
            });
            //res.send("Result not found");
        } else {
            db.where({hour: req.params.hour, min: req.params.minutes, day: req.params.day})
            .from('events')
            .update({status: 'active', file_id: req.query.file_id}).then(function(result) {
                res.status(200).send();
            });
            //res.send("Result found");
        }
    });
}

function getEvent(req, res, next) {
    db.select()
    .from('events')
    .where({hour: req.params.hour, min: req.params.minutes, day: req.params.day})
    .then(function(result) {
        res.send(result);
    });
}

function getDay(req, res, next) {
    db.select()
    .from('events')
    .where({day: req.params.day, status: 'active'})
    .then(function(result) {
        res.send(result);
    });
}

function removeEvent(req, res, next) {
    db.where({hour: req.params.hour, min: req.params.minutes, day: req.params.day})
    .from('events')
    .update({status: 'inactive'}).then(function() {
        res.status(200).send();
    });

}

function getWeek(req, res, next) {
    db
    .select()
    .from('events')
    .then(function(result) {
        let monday = []
        let tuesday = []
        let wednesday = []
        let thursday = []
        let friday = []
        let saturday = []
        let sunday = []
        result.forEach(function(element) {
            switch(element.day){
                case 'monday':
                    monday.push(element);
                    break;
                case 'tuesday':
                    tuesday.push(element);
                    break;
                case 'wednesday':
                    wednesday.push(element);
                    break;
                case 'thursday':
                    thursday.push(element);
                    break;
                case 'friday':
                    friday.push(element);
                    break;
                case 'saturday':
                    saturday.push(element);
                    break;
                case 'sunday':
                    sunday.push(element);
                    break;
            }
        });
        console.log(monday);
        console.log(tuesday);
        console.log(wednesday);
        console.log(thursday);
        console.log(friday);
        console.log(saturday);
        console.log(sunday);
        let week = {}
        week.monday = monday;
        week.tuesday = tuesday;
        week.wednesday = wednesday;
        week.thursday = thursday;
        week.friday = friday;
        week.saturday = saturday;
        week.sunday = sunday;
        res.send(week);
    });
}
router.get('/', getWeek);
router.put('/:day/:hour/:minutes', update);
router.post('/:day/:hour/:minutes', addEvent);
router.delete('/:day/:hour/:minutes', removeEvent);
router.get('/:day/:hour/:minutes', getEvent);
router.get('/:day/', getDay);
module.exports = router;
