import React from "react";
import { DashboardCard } from "../components";

function Dashboard() {
  const [dashboardData, setDashboardData] = React.useState({});

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

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <DashboardCard
          countColor="text-blue-500"
          title="Total Jobs"
          count={dashboardData?.totalJobs ?? 0}
        />
        <DashboardCard
          countColor="text-green-500"
          title="Applied Jobs"
          count={dashboardData?.appliedJobs ?? 0}
        />
        <DashboardCard
          countColor="text-yellow-500"
          title="Pending Applications"
          count={dashboardData?.pendingJobs ?? 0}
        />
        <DashboardCard
          countColor="text-purple-500"
          title="Interviews Scheduled"
          count={dashboardData?.interviewJobs ?? 0}
        />
        <DashboardCard
          countColor="text-pink-500"
          title="Job Offers"
          count={dashboardData?.offerJobs ?? 0}
        />
        <DashboardCard
          countColor="text-red-500"
          title="Rejected Applications"
          count={dashboardData?.rejectedJobs ?? 0}
        />
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
