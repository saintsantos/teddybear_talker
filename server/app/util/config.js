// this will get the S3 credentials and other config from the .env file
var config = module.exports;

config.express = {
    port: process.env.PORT || 3000,
    ip: '127.0.0.1'
}

//mysql stuff
config.dbConnection = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'new-password',
    database: 'dev_teddybear_talker',
    charset: 'utf8',
    debug: false
}

//THis will hold the s3 instance configuration
config.s3 = {
}

config.uploadDir = {
    dir: '/home/edwin/Pictures/uploads/'
}

config.secret = {
    secret: 'teddybear_talker'
}
