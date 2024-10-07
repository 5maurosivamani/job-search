import React from "react";

function SelectBox(props) {
  return (
    <div>
      <select className="w-full rounded px-4 py-2" {...props}>
        <option value="">Status</option>
        <option value="applied">Applied</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}

export default SelectBox;
