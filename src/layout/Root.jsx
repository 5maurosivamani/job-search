import React from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="flex flex-col">
      <Header />
      {/* Your app content goes here */}
      <div className="h-[calc(100vh-64px)] px-5 py-3">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
