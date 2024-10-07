import React, { useId } from "react";
import searchIcon from "../assets/search.png";

function SearchBox(props) {
  const id = useId();


  return (
    <div className="flex items-center">
      <input
        type="text"
        name=""
        id={"input-" + id}
        className="outline-none border-none px-5 h-10 tracking-wide w-full rounded"
        placeholder="Search..."
        {...props}
     />
      <img className="w-8 ms-4" src={searchIcon} alt="" />
    </div>
  );
}

export default SearchBox;
