import React from "react";
import Button from "./Button";
import {
  MdDelete,
  MdDone,
  MdEdit,
  MdLink,
  MdLocationCity,
  MdLocationPin,
  MdOutlineCancel,
  MdOutlinePending,
  MdPhone,
} from "react-icons/md";

function JobCard(props) {
  const {
    id,
    title,
    company,
    location,
    description,
    responsibility,
    skills,
    status,
    payscale,
    contact,
    link,
    handleEdit,
    handleDelete,
  } = props;
  return (
    <div className="px-5 py-10 rounded-lg bg-black  border-slate-100 shadow-sm shadow-white">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>

        <div className="flex">
          <Button
            title="Edit"
            icon={MdEdit}
            iconLeft
            classes="bg-transparent px-3 border border-white"
            onClick={() => {
              handleEdit(id);
            }}
          />
          <Button
            title="Delete"
            icon={MdDelete}
            iconLeft
            classes="bg-transparent px-3 border border-white ms-3"
            onClick={() => {
              handleDelete(id);
            }}
          />
        </div>
      </div>
      <p className=" text-sm flex items-center text-sky-400">
        <MdLocationCity />

        <Button
          title={company}
          link={link}
          classes="bg-transparent text-xl font-semibold text-sky-400 px-2 underline underline-offset-4"
        />
      </p>
      {location ? (
        <div className="flex items-center">
          <MdLocationPin />
          <p className="ms-2">{location}</p>
        </div>
      ) : null}
      {payscale ? <p>{payscale}</p> : null}
      {contact ? (
        <div className="flex items-center">
          <MdPhone />
          <p className="ms-2">{contact}</p>
        </div>
      ) : null}

      {responsibility ? (
        <>
          <h3 className="text-lg font-semibold py-2 text-warning-600">
            Responsibilities:{" "}
          </h3>
          <p>{responsibility}</p>
        </>
      ) : null}
      {skills ? (
        <>
          <h3 className="text-lg font-semibold py-2 text-warning-600">
            Skills:{" "}
          </h3>
          <p>{skills}</p>
        </>
      ) : null}

      {description ? (
        <>
          <h3 className="text-lg font-semibold py-2 text-warning-600">
            Description:{" "}
          </h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </>
      ) : null}
      <Button
        title={status}
        classes={`mt-5 ${
          status === "applied"
            ? "bg-green-500"
            : status === "rejected"
            ? "bg-red-500"
            : "bg-blue-500"
        }`}
        icon={
          status === "applied"
            ? MdDone
            : status === "rejected"
            ? MdOutlineCancel
            : MdOutlinePending
        }
        iconLeft
      />
    </div>
  );
}

export default JobCard;
