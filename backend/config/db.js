
require('dotenv').config();

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.DB_HOST,             //host,user,password,name,port are pulled from railway given credentials
  user: process.env.DB_USER,             //its there in .env also locally just for reference
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dateStrings: true
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to Railway MySQL ');
  }
});

module.exports = db;
