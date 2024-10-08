// routes/jobs.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the MySQL connection

// GET /jobs - Fetch all jobs
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const search = req.query.search || "";
  const status = req.query.status;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    let replaceData = [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      limit,
      offset,
    ];
    if (status) {
      replaceData = [status].concat(replaceData);
    }

    const jobsQuery = `SELECT * FROM jobs_tb WHERE ${
      status ? `status=? AND` : ""
    } (title LIKE ? OR company LIKE ? or location LIKE ?) ORDER BY created_at DESC LIMIT ? OFFSET ?`;

    const jobs = await pool.query(jobsQuery, replaceData);

    replaceData = [`%${search}%`, `%${search}%`, `%${search}%`];
    if (status) {
      replaceData = [status].concat(replaceData);
    }

    const response = await pool.query(
      `SELECT COUNT(*) as total FROM jobs_tb WHERE ${
        status ? `status=? AND` : ""
      } (title LIKE ? OR company LIKE ? or location LIKE ?)`,
      replaceData
    );

    res.json({ jobs: jobs[0], total: response[0][0].total });
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json({ error: "Error fetching jobs" });
  }
});

// GET /jobs/:id - Fetch a job by id
router.get("/:param", async (req, res) => {
  const { param } = req.params;
  const { type } = req.query;
  let filterBy = "id";

  if (type === "filter-by-status") {
    filterBy = "status";
  }

  try {
    const [results] = await pool.query(
      `SELECT * FROM jobs_tb WHERE ${filterBy} = ? `,
      [param]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(results[0]); // Send the first (and only) result as JSON
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json({ error: "Error fetching job" });
  }
});

// post jobs - Create a new job
router.post("/", async (req, res) => {
  const {
    title,
    description,
    location,
    pay,
    company,
    posted_on,
    skills,
    responsibility,
    contact,
    status,
    link,
  } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO `jobs_tb` (title, description, location, pay, company, posted_on, skills, responsibility, contact, status, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        location,
        pay,
        company,
        posted_on,
        skills,
        responsibility,
        contact,
        status,
        link,
      ]
    );

    res.json({
      message: "Job created successfully",
      jobId: result.insertId,
    });
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json({ error: "Error creating job" });
  }
});

// patch jobs - Update a job
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    pay,
    company,
    posted_on,
    skills,
    responsibility,
    contact,
    status,
    link,
  } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE `jobs_tb` SET title=?, description=?, location=?, pay=?, company=?, posted_on=?, skills=?, responsibility=?, contact=?, status=?, link=? WHERE id=?",
      [
        title,
        description,
        location,
        pay,
        company,
        posted_on,
        skills,
        responsibility,
        contact,
        status,
        link,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json({ error: "Error updating job" });
  }
});

// delete jobs - Delete a job
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM `jobs_tb` WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json({ error: "Error deleting job" });
  }
});

// Export the router to be used in other modules
module.exports = router;
