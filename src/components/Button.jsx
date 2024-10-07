import React from "react";

function Button({
  title,
  link,
  classes = "",
  icon: Icon,
  iconLeft,
  iconRight,
  variant="button",
  ...props
}) {
  return (
    <div className="flex">
      {variant === "link" ? (
        <a
          href={link}
          target="_blank"
          className={`text-info rounded-md flex items-center ${classes}`}
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
