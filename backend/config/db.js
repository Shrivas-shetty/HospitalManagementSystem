
require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.DB_HOST || "zephyr.proxy.rlwy.net",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME || "railway",
  dateStrings: true,
  port: process.env.DB_PORT || 51277
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = db;

