const mysql = require("mysql2/promise");
require('dotenv').config(); // Ensure this is at the top

const pool = mysql.createPool({
  // Use Railway's default names OR your custom ones
  host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
  user: process.env.MYSQLUSER || process.env.DB_USER || "root",
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "",
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || "flipkart_clone",
  port: process.env.MYSQLPORT || 3306, // Always include the port for global DBs
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