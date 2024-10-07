// server.js
const express = require("express");
const cors = require("cors");
const jobsRouter = require("./routes/jobs"); // Import the jobs routes
const dashboardRouter = require("./routes/dashboard");

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use the jobs router for any routes starting with /jobs
app.use("/jobs", jobsRouter);
app.use("/dashboard", dashboardRouter);

// Start the server
app
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error(`Error starting server: ${err.message}`);
  });
