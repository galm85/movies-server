const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    // host:"localhost",
    // user:"root",
    // password:"",
    // database:"movies"
    host:procces.env.HOST,
    user:procces.env.USER,
    password:"",
    database:procces.env.DATABASE

})

module.exports = db;