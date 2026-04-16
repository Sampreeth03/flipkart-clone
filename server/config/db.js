const mysql = require("mysql2/promise");
require('dotenv').config(); // Ensure this is at the top

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected successfully to Global DB");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
    // Don't process.exit(1) in production immediately if you want 
    // the server to stay up to show an error page, but it's okay for now.
  });

module.exports = pool;