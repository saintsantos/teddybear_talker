import db from '../config/db';
function upload(req, res, next) {
    let path = '/home/pi/audio/' + req.params.name;
    db.insert({audio_name: req.params.name, filepath: path, status: 'active'})
    .from('audio')
    .then(function(result) {
      console.log("Request: %0", req);
      res.status(200).send();
    });
}

function updateId(req, res, next) {
    db('audio')
    .where({id: req.params.id})
    .update({audio_name: req.query.name})
    .then(function(result) {
        res.status(200).send();
    });
}

function getAll(req, res, next) {
    db.select()
    .where({status: 'active'})
    .from('audio')
    .then(function(result) {
        res.send(result);
    });
}

function deleteOne(req, res, next) {
    db('audio')
    .where({id: req.params.id})
    .update({status: 'inactive'})
    .then(function(result) {
        res.send(result);
    });
}

function deleteAll(req, res, next) {
    db('audio')
    .from('test')
    .update({status: 'inactive'})
    .then(function(result) {
        res.send("Delete all audio files from the backend");
    });
}

export default {upload, updateId, getAll, deleteOne, deleteAll};
