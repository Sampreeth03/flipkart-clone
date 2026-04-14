require("dotenv").config();       // load .env first
require("./config/db");           // test DB connection on startup

const app  = require("./app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});