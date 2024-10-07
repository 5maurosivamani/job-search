import React from "react";

function DashboardCard({ title, count, countColor = "text-blue-500" }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className={`text-3xl font-bold ${countColor}`}>{count}</p>
    </div>
  );
}

export default DashboardCard;
