import React from "react";

function SelectBox({ options, ...props }) {
  return (
    <div>
      <select className="w-full rounded px-4 py-2" {...props}>
        {options?.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
}

export default SelectBox;
