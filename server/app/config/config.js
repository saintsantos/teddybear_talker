// this will get the S3 credentials and other config from the .env file
var config = {};

config.express = {
    port: process.env.PORT || 3000,
    ip: '127.0.0.1'
}

//mysql stuff
config.dbConnection = {
    host: 'localhost',
    user: '',
    port: 3306,
    password: '',
    database: '',
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

export default config;
