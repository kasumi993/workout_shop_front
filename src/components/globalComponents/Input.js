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
      value = "",
      required = false,
      ...restProps
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-gray-700 font-medium mb-2 text-sm"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className={`flex items-center rounded px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-20 transition-all duration-300 ${className}`}>
          {prefix && (
            <span className="mr-3 text-gray-500">
              {prefix}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="flex-1 outline-none border-0 bg-transparent text-gray-800 placeholder-gray-400"
            aria-label={label || name}
            {...restProps}
          />
          {suffix && (
            <span className="ml-3 text-gray-500">
              {suffix}
            </span>
          )}
        </div>
      </div>
    );
  };

export default forwardRef(Input);