
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary feedback storage
let feedbacks = [];

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Feedback Server Running Successfully!");
});

// Get all feedback
app.get("/api/feedback", (req, res) => {
  res.status(200).json(feedbacks);
});

// Submit feedback
app.post("/api/feedback", (req, res) => {
  const feedbackData = req.body;

  if (!feedbackData || Object.keys(feedbackData).length === 0) {
    return res.status(400).json({
      message: "Feedback data is required"
    });
  }

  feedbacks.push(feedbackData);

  res.status(201).json({
    message: "Feedback submitted successfully!",
    feedback: feedbackData
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
