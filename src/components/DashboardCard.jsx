import React from "react";

function DashboardCard({
  title,
  count,
  color = "text-blue-500",
  status,
  handleClick,
}) {
  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer"
      onClick={() => {
        handleClick(status);
      }}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className={`text-3xl font-bold ${color}`}>{count}</p>
    </div>
  );
}

export default DashboardCard;
