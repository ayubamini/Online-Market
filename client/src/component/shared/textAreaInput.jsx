import React from "react";

const TextAreaInput = ({ name, label, value, placeholder, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        value={value}
        id={name}
        name={name}
        placeholder={placeholder}
        rows="3"
        className="form-control"
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
