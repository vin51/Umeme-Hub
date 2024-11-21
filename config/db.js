//dependancies
const mysql = require('mysql2')
const path = require('path')
require('dotenv').config()

// connection pool
const pool = mysql.createPool({
    host: process.env. DB_HOST,
    database: process.env. DB_NAME,
    password: process.env. DB_PASSWORD,
    user: process.env. DB_USER,
    port: 3307,
})

//converting pool to promise
const promisePool = pool.promise()


//export pool
module.exports = promisePool