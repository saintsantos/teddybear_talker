var config = require('app/util/config');

var knex = require('knex')({
    client: 'mysql',
    connection: config.dbConnection
});

module.exports = knex;
