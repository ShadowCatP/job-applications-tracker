const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user.id }).sort("-createdAt");
  res.json(jobs);
};

exports.createJob = async (req, res) => {
  const {
    company,
    position,
    status,
    jobType,
    dateApplied,
    interviewDates,
    notes,
  } = req.body;

  if (!company || !position)
    return res
      .status(400)
      .json({ msg: "Company and Position must be specified" });

  const job = await Job.create({
    company,
    position,
    status,
    jobType,
    dateApplied: dateApplied ? new Date(dateApplied) : undefined,
    interviewDates: Array.isArray(interviewDates)
      ? interviewDates.map((d) => ({
          date: d?.date ? new Date(d.date) : null,
        }))
      : [],
    notes,
    user: req.user.id,
  });

  res.status(201).json(job);
};

exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) return res.status(404).json({ msg: "Job not found" });

  if (job.user.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  const updated = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) return res.status(404).json({ msg: "Job not found" });

  if (job.user.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  await job.deleteOne({ id });
  res.json({ msg: "Job deleted" });
};
