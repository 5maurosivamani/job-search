import React, { useEffect } from "react";
import { Button, JobCard } from "../components";
import { getId } from "../utils";
import { useSelector } from "react-redux";
import { MdPersonSearch } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const uniqueId = getId();

function Jobs() {
  const [jobs, setJobs] = React.useState([]);
  const [filteredJobs, setFilteredJobs] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const searchQuery = useSelector((state) => state.jobs.searchQuery);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    let args = [page, searchQuery];
    if (status) {
      args.push(status);
    }

    fetchJobs(...args)
      .then((data) => {
        setJobs(data[0].jobs);
        setFilteredJobs(data[0].jobs);
        setTotal(data[0].total);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [page, searchQuery]);

  // useEffect(() => {
  //   // debounce(function () {
  //   const filteredJobs = jobs.filter(
  //     (job) =>
  //       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.company.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   setFilteredJobs(filteredJobs);
  //   // }, 500);
  // }, [searchQuery]);

  console.log({ jobs, searchQuery });

  const handleAddJob = () => {
    console.log("add-job");
    navigate("new-job");
  };

  const handleEditJob = (id) => {
    console.log("edit-job", id);
    navigate(`edit-job/${id}`);
  };

  const handleDeleteJob = async (id) => {
    console.log("delete-job", id);
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete job");
        }
        // Remove the deleted job from the state
        setJobs(jobs.filter((job) => job.id !== id));
        setFilteredJobs(filteredJobs.filter((job) => job.id !== id));
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleNextPage = () => {
    if (Math.ceil(total / 10) > page) {
      setPage((pre) => pre + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((pre) => pre - 1);
    }
  };

  console.log({ page, total });

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold">Jobs</h1>
      <div className="flex flex-col lg:flex-row items-end justify-between lg:items-center mb-3">
        <span></span>
        <div className="flex justify-center items-center mb-4 lg:mb-0">
          <p className="me-5">
            {(page - 1) * 10} -{" "}
            {Math.ceil(total / 10) === page ? total : page * 10} Records
            Displayed
          </p>
          <div className="join">
            <button className="join-item btn" onClick={handlePreviousPage}>
              «
            </button>
            <button className="join-item btn">Page {page}</button>
            <button className="join-item btn" onClick={handleNextPage}>
              »
            </button>
          </div>
          <span className="ms-5">Total {total}</span>
        </div>
        <Button
          title="Add Job"
          onClick={handleAddJob}
          iconLeft
          icon={MdPersonSearch}
          classes="bg-secondary-bg"
        />
      </div>

      <div className="flex-1 flex flex-col gap-3  overflow-auto">
        {filteredJobs.map((job) => {
          const id = uniqueId.next().value;
          return (
            <JobCard
              key={id}
              {...job}
              handleEdit={handleEditJob}
              handleDelete={handleDeleteJob}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;

// fetch data from the server
async function fetchJobs(page, searchQuery, status) {
  const res = [];
  try {
    const apiUrl = `http://localhost:5000/jobs?page=${page}&search=${searchQuery}${
      status && status !== "total" ? `&status=${status}` : ""
    }`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.push(data);
  } catch (error) {
    console.log("Error is occured:", error);
  } finally {
    return res;
  }
}
