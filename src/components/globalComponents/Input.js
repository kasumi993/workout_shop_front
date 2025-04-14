import React, { forwardRef } from "react";

const Input = (
    {
      id,
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix = null,
      suffix = null,
      onChange = () => {},
      ...restProps
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <label
        htmlFor={inputId}
        className={`flex flex-col gap-2 w-full`}
      >
        {label && <span className="text-sm font-medium">{label}</span>}
        <div className={`flex items-center rounded px-3 py-1 focus-within:ring-1 focus-within:ring-blue-300 ${className}`}>
          {prefix && <span className="mr-2 text-gray-500">{prefix}</span>}
          <input
            id={inputId}
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className="flex-1 outline-0 border-0 bg-transparent"
            aria-label={label || name}
            {...restProps}
          />
          {suffix && <span className="ml-2 text-gray-500">{suffix}</span>}
        </div>
      </label>
    );
  };

export default forwardRef(Input);
