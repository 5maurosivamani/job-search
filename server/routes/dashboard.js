// routes/jobs.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the MySQL connection

// get data's for dashboard
router.get("/", async (req, res) => {
  try {
    const [totalJobs] = await pool.query(
      "SELECT COUNT(*) as count FROM `jobs_tb`"
    );
    const [appliedJobs] = await pool.query(
      "SELECT COUNT(*) as count FROM `jobs_tb` WHERE status = 'applied'"
    );
    const [interviewJobs] = await pool.query(
      "SELECT COUNT(*) as count FROM `jobs_tb` WHERE status = 'interview'"
    );
    const [offerJobs] = await pool.query(
      "SELECT COUNT(*) as count FROM `jobs_tb` WHERE status = 'offer'"
    );
    const [rejectedJobs] = await pool.query(
      "SELECT COUNT(*) as count FROM `jobs_tb` WHERE status = 'rejected'"
    );

    res.json({
      totalJobs: totalJobs[0].count,
      appliedJobs: appliedJobs[0].count,
      interviewJobs: interviewJobs[0].count,
      offerJobs: offerJobs[0].count,
      rejectedJobs: rejectedJobs[0].count,
    });
  } catch (error) {
    console.error("Dashboard Query Error:", error);
    return res.status(500).json({ error: "Error fetching dashboard data" });
  }
});

// Export the router to be used in other modules
module.exports = router;
