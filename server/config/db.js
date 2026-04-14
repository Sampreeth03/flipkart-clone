const mysql = require("mysql2/promise");

// Create a connection pool (reuses connections — faster than creating new ones each request)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "flipkart_clone",
  waitForConnections: true,
  connectionLimit: 10,      // max 10 simultaneous connections
  queueLimit: 0,            // unlimited queue
});

// Test connection on startup
pool.getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1); // stop server if DB is not reachable
  });

module.exports = pool;