import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import SearchBox from "./SearchBox";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/feature/jobSlice";

const navLinks = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Jobs",
    path: "/jobs",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

function Header() {
  const [searchValue, setSearchValue] = React.useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [selectedLink, setSelectedLink] = React.useState(currentPath);
  useEffect(() => {
    console.log("currentPath", currentPath.split("/"));

    if (searchValue && currentPath.split("/")[1] !== "jobs") {
      navigate("/jobs");
    }
  }, [searchValue]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <nav className="bg-gray-950 h-16 flex items-center px-5 gap-5 justify-between shadow-sm shadow-white">
      <div className="flex justify-start items-center">
        <img className="w-12 text-white" src={logo} alt="job search" />
        <ul className="ms-5 flex gap-5">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`hover:text-[#57a460] transition-all ease-in ${
                  selectedLink === link.path && "text-[#57a460]"
                }`}
                onClick={() => {
                  setSelectedLink(link.path);
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-96">
        <SearchBox value={searchValue} onChange={handleChange} />
      </div>
    </nav>
  );
}

export default Header;
