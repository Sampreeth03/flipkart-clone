const express = require("express");
const cors    = require("cors");

const productRoutes  = require("./routes/productRoutes");
const cartRoutes     = require("./routes/cartRoutes");
const orderRoutes    = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler   = require("./middlewares/errorHandler");

const app = express();

// ── Middlewares ──────────────────────────────────────────────
app.use(cors({
    origin: "*",
    origin: true, // This dynamically reflects the requesting origin
//   credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
//   origin: "https://flipkart-clone-peach-six.vercel.app/", 
  credentials: true
}));                   // allow React frontend on different port
app.use(express.json());            // parse JSON request bodies

// ── Routes ──────────────────────────────────────────────────
app.use("/api/products",   productRoutes);
app.use("/api/cart",       cartRoutes);
app.use("/api/orders",     orderRoutes);
app.use("/api/categories", categoryRoutes);

// Health check
app.get("/", (req, res) => res.json({ message: "Flipkart Clone API running 🚀" }));

// ── Global Error Handler (must be last) ──────────────────────
app.use(errorHandler);

module.exports = app;