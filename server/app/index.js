import config from './config/config';
import app from './config/express';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_USER_NAME);
// make bluebird default Promise
Promise = require('bluebird');

const debug = require('debug');

const db = require('./config/db');

app.listen(config.express.port, () => {
    debug(`server started on port ${config.express.port}`)
});
export default app;
