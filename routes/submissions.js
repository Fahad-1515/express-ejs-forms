const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Submission = require("../models/Submission");

// Get all submissions for logged-in user
router.get("/", auth.protect, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// Delete a submission
router.delete("/:id", auth.protect, async (req, res) => {
  try {
    const submission = await Submission.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ error: "Failed to delete submission" });
  }
});

module.exports = router;
