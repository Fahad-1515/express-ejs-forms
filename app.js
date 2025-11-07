const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// Basic Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/form-app")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/api/submissions", require("./routes/submissions"));
app.use("/dashboard", require("./routes/dashboard"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    title: "Error",
    message: "Something went wrong!",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    message: "The page you are looking for does not exist.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});
