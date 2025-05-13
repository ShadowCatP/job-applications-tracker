const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobLink: String,
    status: {
      type: String,
      enum: ["applied", "interview", "declined", "offer"],
      default: "applied",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
    },
    dateApplied: { type: Date },
    interviewDates: [{ date: { type: Date } }],
    notes: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
