import React, { useId } from "react";

function TextInput({
  type = "text",
  placeHolder = "Job Title",
  textarea,
  label,
  error,
  ...props
}) {
  const inputId = useId();
  return (
    <div className="">
      {label ? (
        <label htmlFor="jobTitle" className="block mb-2">
          {label}
        </label>
      ) : null}
      {textarea ? (
        <textarea
          className="w-full h-24 p-4"
          placeholder={placeHolder}
          value={props?.datavalue}
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          id={`input-${inputId}`}
          placeholder={placeHolder}
          className="w-full px-3 py-2 border rounded"
          {...props}
        />
      )}

      {error ? <p className="text-red-400 mt-2">{error}</p> : null}
    </div>
  );
}

export default TextInput;
