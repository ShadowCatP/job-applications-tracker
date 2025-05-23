const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.route("/").get(auth, getAllJobs).post(auth, createJob);

router
  .route("/:id")
  .put(auth, updateJob)
  .delete(auth, deleteJob)
  .get(auth, getJobById);

module.exports = router;
