import React from "react";

function Button({
  title,
  link,
  classes = "",
  icon: Icon,
  iconLeft,
  iconRight,
  ...props
}) {
  console.log("props", props);
  return (
    <div className="flex">
      {link ? (
        <a
          href={link}
          target="_blank"
          className={`bg-info text-primary-text px-5 py-2 rounded-md flex items-center ${classes}`}
        >
          {iconLeft ? <Icon size={24} /> : null}
          <span className={iconLeft ? "ms-1" : iconRight ? "me-1" : ""}>
            {title}
          </span>
          {iconRight ? <Icon size={24} /> : null}
        </a>
      ) : (
        <button
          className={`text-primary-text py-2 px-5 rounded-md flex items-center ${classes}`}
          {...props}
        >
          {iconLeft ? <Icon size={24} /> : null}
          <span className={iconLeft ? "ms-1" : iconRight ? "me-1" : ""}>
            {title}
          </span>
          {iconRight ? <Icon size={24} /> : null}
        </button>
      )}
    </div>
  );
}

export default Button;
