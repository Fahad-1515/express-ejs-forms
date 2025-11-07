const express = require("express");
const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.render("index", {
    title: "Enhanced Form App",
    errors: [],
    values: {},
  });
});

// Form submission
router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    const errors = [];
    if (!name || name.trim().length < 2)
      errors.push("Name must be at least 2 characters");
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      errors.push("Please enter a valid email");
    if (!message || message.trim().length < 10)
      errors.push("Message must be at least 10 characters");

    if (errors.length > 0) {
      return res.render("index", {
        title: "Enhanced Form App",
        errors,
        values: req.body,
      });
    }

    // If user is logged in, create submission
    if (req.user) {
      const Submission = require("../models/Submission");
      await Submission.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        userId: req.user._id,
      });

      return res.redirect("/dashboard");
    }

    // If not logged in, redirect to login
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Submission error:", error);
    res.render("index", {
      title: "Enhanced Form App",
      errors: ["An error occurred while submitting the form"],
      values: req.body,
    });
  }
});

module.exports = router;
