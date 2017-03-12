// this will get the S3 credentials and other config from the .env file
require('dotenv').config({ path: 'app/util/config.env'});

var config = module.exports;

config.express = {
    port: process.env.PORT || 3000,
    ip: '127.0.0.1'
}

//mysql stuff
config.dbConnection = {
    host: 'localhost',
    user: process.env.DB_USER_NAME,
    port: 3306,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: 'utf8',
    debug: true
}

//THis will hold the s3 instance configuration
config.s3 = {
}

config.uploadDir = {
    dir: '/home/edwin/Pictures/uploads/'
}

config.secret = {
    secret: 'Driver-watchdog'
}
