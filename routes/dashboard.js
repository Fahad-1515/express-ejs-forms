const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Submission = require("../models/Submission");

// Dashboard page
router.get("/", auth.protect, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.render("dashboard", {
      title: "Dashboard",
      user: req.user,
      submissions,
      recentCount: submissions.length,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load dashboard",
    });
  }
});

module.exports = router;
