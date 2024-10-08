import React from "react";
import { DashboardCard } from "../components";
import { getId } from "../utils";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dashboardData, setDashboardData] = React.useState({});

  const getUniqueId = getId();

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (status) => {
    // let apiUrl = `http://localhost:5000/jobs/${status}?type=filter-by-status`;

    // if (status === "total") {
    //   apiUrl = "http://localhost:5000/jobs/";
    // }

    navigate(`jobs?status=${status}`);
  };

  const {
    totalJobs,
    appliedJobs,
    pendingJobs,
    interviewJobs,
    offerJobs,
    rejectedJobs,
  } = dashboardData;

  const DASHBOARD_CARD_DATA = [
    {
      color: "text-blue-500",
      title: "Total Jobs",
      count: totalJobs ?? 0,
      status: "total",
    },
    {
      color: "text-green-500",
      title: "Applied Jobs",
      count: appliedJobs ?? 0,
      status: "applied",
    },
    {
      color: "text-yellow-500",
      title: "Pending Applications",
      count: pendingJobs ?? 0,
      status: "pending",
    },
    {
      color: "text-purple-500",
      title: "Interviews Scheduled",
      count: interviewJobs ?? 0,
      status: "interview",
    },
    {
      color: "text-pink-500",
      title: "Job Offers",
      count: offerJobs ?? 0,
      status: "offer",
    },
    {
      color: "text-red-500",
      title: "Rejected Applications",
      count: rejectedJobs ?? 0,
      status: "rejected",
    },
  ];

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {DASHBOARD_CARD_DATA?.map((card) => (
          <DashboardCard
            key={getUniqueId.next().value}
            handleClick={handleClick}
            {...card}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

async function fetchDashboardData() {
  try {
    const response = await fetch("http://localhost:5000/dashboard");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
