const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const DATA_FILE = path.join(__dirname, "submissions.json");

// Initialize JSON file if missing
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");

// Helper functions
const loadData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
const saveData = (data) =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");

let submissions = loadData();

// ========== RENDER FORM ==========
app.get("/", (req, res) => {
  res.render("index", {
    title: "Advanced Form Validation",
    errors: [],
    values: {},
  });
});

// ========== HANDLE FORM SUBMISSION ==========
app.post("/submit", (req, res) => {
  const { name, email, password, confirmPassword, message } = req.body;
  const errors = [];

  // --- Server-side Validation ---
  if (!name || name.trim().length < 2)
    errors.push("Name must be at least 2 characters long.");
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    errors.push("Please enter a valid email address.");
  if (!password || password.length < 8)
    errors.push("Password must be at least 8 characters.");
  const passwordChecks = [
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  if (passwordChecks.filter(Boolean).length < 3)
    errors.push(
      "Password must include upper/lowercase letters, numbers, and symbols."
    );
  if (password !== confirmPassword) errors.push("Passwords do not match.");
  if (!message || message.trim().length < 5)
    errors.push("Message must be at least 5 characters.");

  // Handle validation errors
  if (errors.length) {
    return res.render("index", {
      title: "Advanced Form Validation",
      errors,
      values: { name, email, message },
    });
  }

  const newEntry = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  submissions.push(newEntry);
  saveData(submissions);

  res.render("result", {
    title: "Form Submitted Successfully",
    data: newEntry,
    submissions,
  });
});

// ========== REST API ENDPOINTS ==========

// Fetch all submissions
app.get("/api/submissions", (req, res) => {
  res.json(loadData());
});

// Create a new submission
app.post("/api/submissions", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields required" });

  const newEntry = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  const data = loadData();
  data.push(newEntry);
  saveData(data);
  res.status(201).json(newEntry);
});

// Update submission
app.put("/api/submissions/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;
  const data = loadData();
  const index = data.findIndex((item) => item.id == id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  data[index] = { ...data[index], name, email, message };
  saveData(data);
  res.json(data[index]);
});

// Delete submission
app.delete("/api/submissions/:id", (req, res) => {
  const { id } = req.params;
  let data = loadData();
  data = data.filter((item) => item.id != id);
  saveData(data);
  res.json({ success: true });
});

// ========== START SERVER ==========
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
