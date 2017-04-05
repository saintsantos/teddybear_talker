import db from '../config/db';
function upload(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send('Upload an audio file to the backend');
    });
}

function updateId(req, res, next) {
    db.select().table('test').then(function(result) {
        console.log("Param: " + req.params.id);
        res.send('Update a specific file ID');
    });
}

function getAll(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send('Grab all audio files');
    });
}

function getOne(req, res, next) {
    db.select().table('test').then(function(result) {
        console.log("Param: " + req.params.id);
        res.send("Get information for one audio file");
    });
}

function deleteOne(req, res, next) {
    db.select().table('test').then(function(result) {
        console.log("Param: " + req.params.id);
        res.send("Delete one audio file from the backend");
    });
}

function deleteAll(req, res, next) {
    db.select().table('test').then(function(result) {
        res.send("Delete all audio files from the backend");
    });
}

export default {upload, updateId, getAll, getOne, deleteOne, deleteAll};
