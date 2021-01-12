//module is in strict mode by default ;)
/*
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('DB connected successfully');
    } catch (err) {
        console.error('Connection to db failed', err);
    }
})();

module.exports = mongoose.connection;
*/

// DB.js config for your database

const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));
module.exports = {
    sql, poolPromise
};
