const mysql = require("mysql2");
require("dotenv").config();

// Database connection pool using mysql2.
// Exports a promise-based pool for asynchronous queries.
const pool = mysql.createPool(process.env.DATABASE_URL);

module.exports = pool.promise();
